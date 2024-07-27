import { useState } from "react";
import { courseService } from "../../../../../services/course.service";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../../store/index";

const options = [
  { value: "lesson1", label: "lesson1" },
  { value: "lesson2", label: "lesson2" },
];

function ModuleForm({ setShowModal, getCourse }) {
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      indexNumber: Number(e.target.indexNumber.value),
      moduleName: e.target.moduleName.value,
      description: e.target.moduleDescription.value,
      embedUrl: e.target.embedUrl.value,
    };

    setIsLoading(true);

    try {
      const res = await courseService.addModule(course.courseDetails._id, data);
      const resJson = await res.json();

      if (res.ok) {
        setMessage({ sc: resJson.message, er: "" });
        setIsLoading(false);
        getCourse(resJson.data._id);
        setShowModal({ lesson: false, module: false });
      } else {
        setMessage({ sc: "", er: resJson.message });
        setIsLoading(false);
        setShowModal({ lesson: false, module: false });
      }
    } catch (error) {
      console.log(error.message);
      setMessage({ sc: "", er: error.message });
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
        <label htmlFor="indexNumber">Index number:</label>
        <input
          type="number"
          className="field"
          placeholder="Enter index number..."
          name="indexNumber"
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
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="moduleDescription">Module description:</label>
        <textarea
          rows="6"
          className="field"
          placeholder="Enter module description..."
          name="moduleDescription"
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
      <div className="mb-4">
        <button
          type="submit"
          className={`userBtn w-full ${isLoading && "animate-pulse"}`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add module"}
        </button>
      </div>
    </form>
  );
}

export default ModuleForm;
