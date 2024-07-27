import Breadcrump from "../../Breadcrump";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import { BASE_URL, BUCKET_URL } from "../../../config";
import { useState } from "react";
import { courseService } from "../../../services";
import axios from "axios";
import ELoading from "../../ELoading";
import { fetchWrapper } from "../../../helpers";
import { courseRequests } from "../../../config/requests";

function CourseDetail({ course, fetchCourse }) {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const { aside } = useSelector((state) => state.utils);
  const dispatch = useDispatch();
  const { setAside, setMessage } = bindActionCreators(actionCreators, dispatch);

  const [image, setImage] = useState({
    currentFile: course.courseImage ?? "",
    progress: 0,
  });

  const [data, setData] = useState({
    courseName: course.courseDetails.courseName ?? "",
    description: course.courseDetails.description ?? "",
    url: course.url ?? "",
    embedUrl: course.embedUrl ?? "",
  });

  function handleChange(e) {
    if (e.target.type === "file") {
      uploadToAws(e.target.files[0]);
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function onSelectFile(event) {
    const file = event.target.files[0];
    let data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/courseS3", {
      method: "POST",
      body: JSON.stringify({
        id: id,
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
          currentFile: `${BUCKET_URL}/courses/${id}/courseImage/${file.name}`,
          progress: 0,
        });
        setMessage({ sc: "Uploaded successfully", er: "" });

        setTimeout(() => {
          setMessage({ sc: "", er: "" });
        }, 2000);
      })
      .catch((err) => {
        setMessage({ sc: "", er: "Something went wrong! Try again" });
        console.log(err);
      });
  }

  async function onUpdate(e) {
    e.preventDefault();

    setIsLoading(true);

    if (data) {
      Object.assign(data, {
        courseImage: image.currentFile,
      });
    }

    try {
      const res = await courseService.update(id, data);
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        fetchCourse(id);
        setMessage({ sc: resJson.message, er: "" });
        setIsLoading(false);
      } else {
        console.log(resJson.message);
        setMessage({ sc: "", er: resJson.message });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setMessage({ sc: "", er: "Something went wrong!" });
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  }

  // delete course
  async function handleCourseDelete(courseId) {
    const confirmMsg = window.confirm(
      "Do you want to delete the product permanently?"
    );

    if (!confirmMsg) return;

    try {
      const res = await fetchWrapper.patch(
        `${BASE_URL}${courseRequests.delete}${courseId}`
      );
      const resJson = await res.json();

      if (res.ok) {
        setMessage({ sc: resJson.message, er: "" });
        router.push("/admin/courses");
      } else {
        console.log(resJson.message);
        setMessage({ sc: "", er: resJson.message });
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-between items-center mb-8">
        <Breadcrump
          baseLink="/admin/courses"
          baseTitle="Courses"
          id={id}
          edit={false}
          item="Course"
          itemName={course.courseDetails.courseName}
        />

        <button
          className="userBtn ml-auto py-2 font-medium"
          onClick={() =>
            router.push(`/admin/courses/${course.courseDetails._id}/curriculum`)
          }
        >
          View Curriculum
        </button>
      </div>

      {course ? (
        <div className="w-full">
          <h2 className="font-semibold tracking-wider">Information</h2>
          <hr className="my-4" />
          {/* course details */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-6 my-6">
            <div className="leftCol">
              <h3 className="text-gray-900 text-base font-semibold tracking-wider">
                Details
              </h3>
              <p className="text-sm">Change information about your course.</p>
            </div>
            <div className="rightCol col-span-2 bg-white rounded-md p-8">
              <form onSubmit={onUpdate}>
                <div className="mb-6">
                  <label htmlFor="courseName">Course Name:</label>
                  <input
                    type="text"
                    className="field"
                    placeholder="Enter your course name..."
                    name="courseName"
                    value={data.courseName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    rows="8"
                    className="field"
                    placeholder="Enter your description..."
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="leftCol">
                      <label htmlFor="courseImage">Course image</label>
                      <img
                        src={
                          image.currentFile
                            ? image.currentFile
                            : "/img/no_image.jpg"
                        }
                        className="w-full h-44 object-cover rounded"
                        alt={data.courseName}
                      />
                      <p>
                        {image.progress > 0 && `${image.progress}% uploaded`}
                      </p>
                    </div>
                    <div className="rightCol p-8">
                      <label
                        htmlFor="productImage"
                        className="userBtn py-2 mb-4 cursor-pointer"
                      >
                        Add image
                        <input
                          type="file"
                          className="hidden"
                          id="productImage"
                          onChange={onSelectFile}
                        />
                      </label>
                      <h5 className="font-semibold">Recommended format</h5>
                      <ul className="list-disc list-outside ml-4 text-sm mt-2 leading-6">
                        <li>Image format: JPG/PNG</li>
                        <li>Aspect Ratio: 16:9</li>
                        <li>Recommended size: 3840x2160 or 1920x1080 pixels</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="url">Course url:</label>
                  <div className="flex rounded-lg overflow-hidden field p-0">
                    <input
                      type="text"
                      defaultValue="
                  https://www.digitalexplora.com/course/"
                      title="https://www.digitalexplora.com/course/"
                      className="bg-gray-900 px-4 text-xs text-gray-300 w-72 focus:outline-none"
                      readOnly
                    />
                    <input
                      type="text"
                      placeholder="Enter url path..."
                      value={data.url}
                      name="url"
                      onChange={handleChange}
                      className="field flex-1"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="courseName">Featured video embed url:</label>
                  <input
                    type="text"
                    placeholder="Enter your featured video embed url..."
                    className="field"
                    name="embedUrl"
                    value={data.embedUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <button
                    className="userBtn py-2 mb-4 w-full"
                    disabled={isLoading}
                    type="submit"
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* course details */}
          <hr className="my-4" />
          {/* course action */}

          <div className="lg:grid lg:grid-cols-3 lg:gap-6 my-6">
            <div className="leftCol">
              <h3 className="text-gray-900 text-base font-semibold tracking-wider">
                Actions
              </h3>
              <p className="text-sm">Take action to delete</p>
            </div>
            <div className="rightCol col-span-2 bg-white rounded-md p-8 flex items-center">
              <button
                className="btn bg-white border-red-500 text-red-600 ml-4"
                onClick={() => handleCourseDelete(id)}
              >
                Delete Course Permanently
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <ELoading />
        </div>
      )}
    </>
  );
}

export default CourseDetail;
