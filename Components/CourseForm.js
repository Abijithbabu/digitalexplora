import { useState } from "react";

function CourseForm({ onAddCourse, isLoading }) {
  const [input, setInput] = useState({
    courseName: "",
    url: "",
    embedUrl: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const courseData = {
      courseName: input.courseName,
      price: input.price,
      description: input.description,
    };

    onAddCourse(courseData);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="courseName">Course Name*</label>
          <input
            type="text"
            name="courseName"
            onChange={handleChange}
            placeholder="Course Name..."
            className="field"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description*</label>
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="Add course description..."
            className="field w-full"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="courseUrl">Course URL*</label>
          <input
            type="text"
            name="url"
            onChange={handleChange}
            placeholder="Enter course url..."
            className="field"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="embedUrl">Embed Url*</label>
          <input
            type="text"
            name="embedUrl"
            onChange={handleChange}
            placeholder="Enter embed url..."
            className="field"
          />
        </div>

        <button
          className="userBtn w-full font-semibold"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Adding..." : "Add course"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
