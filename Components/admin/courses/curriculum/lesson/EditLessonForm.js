import { useEffect, useState } from "react";
import { courseService } from "../../../../../services/course.service";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../../store/index";
import { CloudUploadIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import ProgressBar from "../../../../ProgressBar";
import { BUCKET_URL } from "../../../../../config";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function EditLessonForm({ setShowModal, moduleId, getCourse, lessonData }) {
  const { course } = useSelector((state) => state.courses);
  const { linkLevels } = useSelector((state) => state.linkLevel);
  const dispatch = useDispatch();
  const { setMessage, fetchLinkLevels } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({
    currentFile: lessonData.lessonImage ?? "",
    progress: 0,
  });
  const [data, setData] = useState({
    _id: lessonData._id,
    indexNumber: lessonData.indexNumber ?? "",
    lessonName: lessonData.lessonName ?? "",
    description: lessonData.description ?? "",
    embedUrl: lessonData.embedUrl ?? "",
  });

  const [selectedLinks, setSelectedLinks] = useState(lessonData?.linkLevels);

  function handleSelect(values) {
    setSelectedLinks(values);
  }

  useEffect(() => {
    fetchLinkLevels();
  }, []);

  async function onSelectFile(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    } else {
      let data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/lessonS3", {
        method: "POST",
        body: JSON.stringify({
          courseId: course.courseDetails._id,
          moduleId: moduleId,
          lessonId: lessonData._id,
          type: file.type,
          name: file.name,
        }),
      });
      const { url } = await response.json();

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);

          if (percent < 100) {
            setImage({ progress: percent });
          }
        },
      };

      await axios
        .put(url, file, options)
        .then((res) => {
          setImage({
            currentFile: `${BUCKET_URL}/courses/${course.courseDetails._id}/modules/${moduleId}/lessons/${lessonData._id}/image/${file.name}`,
            progress: 0,
          });

          setMessage({ sc: "Uploaded successfully", er: "" });
        })
        .catch((err) => {
          setMessage({ sc: "", er: "Something went wrong! Try again" });
          console.log(err);
        });

      setTimeout(() => {
        setMessage({ sc: "", er: "" });
      }, 2000);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const body = {
      _id: data._id,
      indexNumber: data.indexNumber,
      lessonName: data.lessonName,
      description: data.description,
      embedUrl: data.embedUrl,
      linkLevels: selectedLinks.map((item) => item.value),
    };

    try {
      const res = await courseService.updateLesson(
        course.courseDetails._id,
        moduleId,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson);
        setMessage({ sc: resJson.message, er: "" });
        setIsLoading(false);
        getCourse(course.courseDetails._id);
        setShowModal({ module: false, lesson: false });
      } else {
        console.log(resJson.message);
        setMessage({ sc: "", er: resJson.message });
        setIsLoading(false);
        setShowModal({ module: false, lesson: false });
      }
    } catch (error) {
      console.log(error);
      setMessage({ sc: "", er: "Something went wrong!" });
      setIsLoading(false);
      setShowModal({ module: false, lesson: false });
    }
    setTimeout(() => {
      setMessage({
        sc: "",
        er: "",
      });
    }, 2000);
  }

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="mb-4">
          <img
            src={image.currentFile ? image.currentFile : "/img/no_image.jpg"}
            alt="Lesson Image"
            className="rounded-xl w-full h-44 object-cover"
          />
          {image.progress > 0 && <ProgressBar value={image.progress} />}
        </div>
        <div className="mb-4">
          <div className="flex w-full items-center justify-center">
            <label
              className="text-blue-600 cursor-pointer flex items-center"
              htmlFor="moduleImg"
            >
              <CloudUploadIcon className="w-5 h-5 mr-2" />
              <span> Add new image</span>
              <input
                type="file"
                accept="image/*"
                hidden
                id="moduleImg"
                onChange={onSelectFile}
              />
            </label>

            <button
              className="text-red-600 cursor-pointer flex items-center ml-4 focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                setImage({ currentFile: "" });
              }}
            >
              <TrashIcon className="w-5 h-5 mr-2" /> Remove
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="indexNumber">Index number:</label>
        <input
          type="text"
          className="field"
          value={data.indexNumber}
          onChange={handleChange}
          placeholder="Enter index number..."
          name="indexNumber"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lessonName">Lesson name:</label>
        <input
          type="text"
          className="field"
          value={data.lessonName}
          onChange={handleChange}
          placeholder="Enter lesson name..."
          name="lessonName"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description">Lesson description:</label>
        <textarea
          rows="6"
          className="field"
          value={data.description}
          onChange={handleChange}
          placeholder="Enter lesson description..."
          name="description"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="embedUrl">Embed url:</label>
        <input
          type="text"
          className="field"
          value={data.embedUrl}
          onChange={handleChange}
          placeholder="Enter embed url..."
          name="embedUrl"
          required
        />
      </div>

      <div className="mb-8">
        <label htmlFor="linkLevel">Select Link level</label>
        {linkLevels?.length > 0 ? (
          <Select
            name="linkLevel"
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={lessonData?.linkLevels?.map((item) => ({
              label: item.linkName,
              value: item._id,
            }))}
            options={linkLevels.map((item) => ({
              label: item.linkName,
              value: item._id,
            }))}
            isMulti
            onChange={handleSelect}
          />
        ) : (
          "No link levels found"
        )}
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className={`userBtn w-full ${isLoading && "animate-pulse"}`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}

export default EditLessonForm;
