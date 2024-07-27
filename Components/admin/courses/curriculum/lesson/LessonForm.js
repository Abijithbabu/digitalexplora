import { useEffect, useState } from "react";
import { courseService } from "../../../../../services/course.service";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../../store/index";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function LessonForm({ setShowModal, moduleId, getCourse }) {
  const { courseDetails } = useSelector((state) => state.courses.course);
  const { linkLevels } = useSelector((state) => state.linkLevel);
  const dispatch = useDispatch();
  const { setMessage, fetchLinkLevels } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLink, setSelectedLinks] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      indexNumber: e.target.indexNumber.value,
      lessonName: e.target.lessonName.value,
      description: e.target.lessonDescription.value,
      embedUrl: e.target.embedUrl.value,
      linkLevels: selectedLink,
    };

    setIsLoading(true);

    try {
      const res = await courseService.addLesson(
        moduleId,
        courseDetails._id,
        data
      );
      const resJson = await res.json();

      if (res.status === 200) {
        setMessage({ sc: "Lesson added successfully", er: "" });
        setIsLoading(false);
        getCourse(courseDetails._id);
        setShowModal({ module: false, lesson: false });
      } else {
        setIsLoading(false);
        setMessage({ sc: "", er: resJson.message });
      }
    } catch (error) {
      setMessage({ sc: "", er: error.message });
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

  const handleSelect = (values) => {
    const links = values.map((item) => item.value);
    setSelectedLinks(links);
  };

  useEffect(() => {
    fetchLinkLevels();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="indexNumber">Index number:</label>
        <input
          type="text"
          className="field"
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
          placeholder="Enter lesson name..."
          name="lessonName"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="moduleDescription">Lesson description:</label>
        <textarea
          rows="6"
          className="field"
          placeholder="Enter lesson description..."
          name="lessonDescription"
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
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="linkLevel">Select Link level</label>
        {linkLevels ? (
          <>
            {linkLevels?.length > 0 ? (
              <Select
                name="linkLevel"
                closeMenuOnSelect={false}
                components={animatedComponents}
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
          </>
        ) : (
          "Loading"
        )}
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className={`userBtn w-full ${isLoading && "animate-pulse"}`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add lesson"}
        </button>
      </div>
    </form>
  );
}

export default LessonForm;
