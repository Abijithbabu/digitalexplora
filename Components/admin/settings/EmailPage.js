import Eloading from "../../ELoading";
import NoData from "../../NoData";

function EmailPage({ emailTypes, data, handleSubmit, handleChange }) {
  return (
    <>
      {emailTypes?.length > 0 ? (
        <div className="max-w-md p-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="mb-6">
                <label htmlFor="emailType">Choose email type:</label>
                <select
                  name="emailType"
                  className="field capitalize"
                  onChange={handleChange}
                  value={data._id}
                >
                  {emailTypes.map((type, index) => (
                    <option value={type._id} key={index}>
                      {type.emailType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  onChange={handleChange}
                  value={data.subject}
                  placeholder="Enter the subject..."
                  className="field"
                />
              </div>

              <div className="mb-6">
                <label>Body:</label>
                <textarea
                  rows="6"
                  name="body"
                  onChange={handleChange}
                  value={data.body}
                  placeholder="Enter the body content..."
                  className="field"
                ></textarea>
              </div>

              <button className="userBtn py-2 w-full mt-6">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="max-w-md p-6 mx-auto">
          <NoData />
        </div>
      )}
    </>
  );
}

export default EmailPage;
