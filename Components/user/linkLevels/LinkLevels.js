import { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import { fetchWrapper } from "../../../helpers";
import { BASE_URL } from "../../../config";
import NetworkError from "../../NetworkError";

function LinkLevels({ state, setLimit, getLinks }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  async function handleAdd(e, linkLevelId) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    const link = document.getElementById(`link${linkLevelId}`).value;

    const body = {
      link: link,
      userId: user._id,
    };

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}/link-level/add-link/${linkLevelId}`,
        body
      );
      const resJson = await res.json();
      setLoading(true);

      if (res.status === 200) {
        getLinks();
        setMessage({ sc: resJson.message, er: "" });
      }
    } catch (error) {
      console.log(error.message);
      setMessage({ sc: "", er: error.message });
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 4000);
  }

  async function handleUpdate(e, linkLevelId) {
    e.preventDefault();

    const link = document.getElementById(`link${linkLevelId}`).value;
    const linkId = state?.linkLevels.find((item) => item._id === linkLevelId)
      .link[0]._id;

    const body = {
      link: link,
      linkId: linkId,
    };

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}/link-level/edit-link/${linkLevelId}`,
        body
      );
      const resJson = await res.json();
      setLoading(true);

      if (res.status === 200) {
        getLinks();
        setMessage({ sc: resJson.message, er: "" });
      }
    } catch (error) {
      console.log(error.message);
      setMessage({ sc: "", er: error.message });
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 4000);
  }

  if (error) return <NetworkError error={error} />;

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 lg:py-10">
        <h3 className="text-center text-xl font-bold mb-6">Link Levels</h3>
        {state?.linkLevels?.length > 0 ? (
          <>
            {state?.linkLevels?.map((item) => (
              <div className="card mb-6" key={item._id}>
                <div className="card-body">
                  <form className="lg:flex items-center">
                    <div className="input-group">
                      <label htmlFor="linkName">Link name:</label>
                      <input
                        type="text"
                        name="linkName"
                        className="field"
                        defaultValue={item.linkName}
                        readOnly
                        disabled
                        placeholder="Link 1"
                      />
                    </div>
                    <div className="input-group ml-6">
                      <label htmlFor="slug">Slug:</label>
                      <input
                        type="text"
                        name="slug"
                        className="field"
                        defaultValue={item.slug}
                        readOnly
                        disabled
                        placeholder="link-name"
                      />
                    </div>
                    <div className="input-group ml-6 flex-1">
                      <label htmlFor="links">link:</label>
                      <input
                        type="text"
                        name="redirectLink"
                        id={`link${item?._id}`}
                        defaultValue={item?.link[0]?.link}
                        className="field"
                        placeholder="/url"
                      />
                    </div>

                    <div className="actions flex items-center ml-8">
                      {item?.link[0]?.link ? (
                        <button
                          className="btn userBtn bg-green-500 hover:bg-green-400 focus:bg-green-800 py-2"
                          title="Save"
                          onClick={(e) => handleUpdate(e, item._id)}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          className="btn userBtn py-2"
                          title="Add"
                          onClick={(e) => handleAdd(e, item._id)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </>
        ) : (
          "No data found"
        )}

        <button
          className="userBtn py-2 mx-auto"
          onClick={() => setLimit((prevState) => prevState + 5)}
        >
          Load more
        </button>
      </div>
    </>
  );
}

export default LinkLevels;
