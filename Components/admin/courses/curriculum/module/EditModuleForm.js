import { useState } from "react";
import { courseService } from "../../../../../services/course.service";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../../store/index";
import { CloudUploadIcon, TrashIcon } from "@heroicons/react/24/solid";
import ProgressBar from "../../../../ProgressBar";
import { BUCKET_URL } from "../../../../../config";
import axios from "axios";
import MultiSelect from "../../../../MultiSelect";

function EditModuleForm({ setShowModal, moduleData, getCourse }) {
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { setcourse, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({
    currentFile: moduleData.moduleImage ?? "",
    progress: 0,
  });
  const [data, setData] = useState({
    _id: moduleData._id,
    indexNumber: moduleData.indexNumber ?? "",
    moduleName: moduleData.moduleName ?? "",
    description: moduleData.description ?? "",
    embedUrl: moduleData.embedUrl ?? "",
    lessons: moduleData.lessons ?? [],
  });

  async function onSelectFile(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    } else {
      let data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/moduleS3", {
        method: "POST",
        body: JSON.stringify({
          courseId: course.courseDetails._id,
          moduleId: moduleData._id,
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
            currentFile: `${BUCKET_URL}/courses/${course.courseDetails._id}/modules/${moduleData._id}/image/${file.name}`,
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

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const defaultValues = data.lessons.map((item) => ({
    value: item._id,
    label: item.lessonName,
  }));

  const options = moduleData.lessons.map((item) => ({
    value: item._id,
    label: item.lessonName,
  }));

  const handleSelect = (values) => {
    setData({
      ...data,
      lessons: values,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (data) {
      Object.assign(data, {
        moduleImage: image.currentFile,
      });
    }

    setIsLoading(true);

    try {
      const res = await courseService.updateModule(
        course.courseDetails._id,
        data
      );
      const resJson = await res.json();

      if (res.status === 200) {
        setMessage({ sc: "Module updated succssfully", er: "" });
        setIsLoading(false);
        getCourse(course.courseDetails._id);
        setShowModal({ lesson: false, module: false });
      }
    } catch (error) {
      console.log(error);
      setMessage({ sc: "", er: error.response.data.message });
      setIsLoading(false);
      setShowModal({ lesson: false, module: false });
    }
    setTimeout(() => {
      setMessage({
        sc: "",
        er: "",
      });
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="mb-4">
          <img
            src={image.currentFile ? image.currentFile : "/img/no_image.jpg"}
            alt="Module Image"
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
          placeholder="Enter index number..."
          name="indexNumber"
          value={data.indexNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="moduleName">Module name:</label>
        <input
          type="text"
          className="field"
          placeholder="Enter module name..."
          name="moduleName"
          value={data.moduleName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="moduleDescription">Module description:</label>
        <textarea
          rows="6"
          className="field"
          placeholder="Enter module description..."
          name="description"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="embedUrl">Embed url:</label>
        <input
          type="text"
          className="field"
          placeholder="Enter embed url..."
          name="embedUrl"
          value={data.embedUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="selectLessons">Select lessons:</label>
        <MultiSelect
          options={options}
          defaultValue={defaultValues}
          handleSelect={handleSelect}
        />
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

export default EditModuleForm;
