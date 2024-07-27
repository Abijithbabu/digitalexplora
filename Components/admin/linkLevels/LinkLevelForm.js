import { useSelector } from "react-redux";
import NetworkError from "../../NetworkError";

function LinkLevelForm({ handleSubmit, handleChange, data }) {
  const { addError } = useSelector((state) => state.linkLevel);
  return (
    <form onSubmit={handleSubmit} className="mt-10">
      {addError && <NetworkError error={addError} />}
      <div className="mb-6">
        <label htmlFor="name">Link Name:</label>
        <input
          type="text"
          name="linkName"
          placeholder="Link name"
          className="field"
          value={data.linkName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          className="field"
          value={data.slug}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-10">
        <label htmlFor="defaultLink">Default Link:</label>
        <input
          type="url"
          name="defaultLink"
          placeholder="Default Link"
          className="field"
          value={data.defaultLink}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="userBtn py-3 w-full">
        Add link
      </button>
    </form>
  );
}

export default LinkLevelForm;
