import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import { adminRequests } from "../../../config/requests";
import Modal from "../../Modal";
import LinkLevelForm from "./LinkLevelForm";

import { fetchWrapper } from "../../../helpers";
import { BASE_URL } from "../../../config";
import SearchInput from "../../SearchInput";
import ELoading from "../../ELoading";

function LinkLevels() {
  const { linkLevels, fetchError, addError, success, totalLinkLevels } =
    useSelector((state) => state.linkLevel);

  const [isOpen, setIsOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({
    linkName: "",
    slug: "",
    defaultLink: "",
  });

  const dispatch = useDispatch();
  const {
    setMessage,
    clearErrors,
    addLinkLevels,
    fetchLinkLevels,
    searchLinkLevels,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (!searchTerm) {
      fetchLinkLevels(skip, limit);
    } else {
      searchLinkLevels(skip, limit, searchTerm);
    }

    if (success) {
      setMessage({ sc: success, er: "" });
      setIsOpen(false);
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }, [skip, limit, searchTerm, success]);

  useEffect(() => {
    if (fetchError) {
      setMessage({ sc: "", er: fetchError });
    }

    if (success) {
      setMessage({ sc: success, er: "" });
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
      clearErrors();
    }, 4000);
  }, [fetchError, addError, success]);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSearch(e) {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm.toLowerCase());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    addLinkLevels(data);
  }

  async function handleUpdate(e, linkId) {
    e.preventDefault();

    const body = {
      linkName: e.target.linkName.value,
      slug: e.target.slug.value,
      defaultLink: e.target.defaultLink.value,
    };

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}${adminRequests.editLinkLevel}${linkId}`,
        body
      );
      const resJson = await res.json();
      setLoading(true);

      if (res.status === 200) {
        fetchData(`${adminRequests.getLinkLevels}${skip}/${limit}`);
        setMessage({ sc: resJson.message, er: "" });
      }
    } catch (error) {
      // setMessage({ sc: "", er: error.response.data.response });
      console.log(error.response);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 4000);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Link Levels</h3>

        <div className="ml-auto">
          <SearchInput
            placeholder="Search linklevels..."
            onChange={handleSearch}
          />
        </div>
        <button className="userBtn py-2 ml-5" onClick={openModal}>
          Add new link
        </button>
      </div>

      <div className="linkLevels">
        {linkLevels?.length > 0 ? (
          <>
            {linkLevels?.map((item) => (
              <div className="card mb-6" key={item?._id}>
                <div className="card-body">
                  <form
                    onSubmit={(e) => handleUpdate(e, item?._id)}
                    className="lg:flex items-end"
                  >
                    <div className="input-group">
                      <label htmlFor="linkName">Link name:</label>
                      <input
                        type="text"
                        name="linkName"
                        className="field"
                        defaultValue={item?.linkName}
                        placeholder="Link 1"
                      />
                    </div>
                    <div className="input-group ml-6">
                      <label htmlFor="slug">Slug:</label>
                      <input
                        type="text"
                        name="slug"
                        className="field"
                        defaultValue={item?.slug}
                        placeholder="link-name"
                      />
                    </div>
                    <div className="input-group ml-6 flex-1">
                      <label htmlFor="defaultLink">Default link:</label>
                      <input
                        type="text"
                        name="defaultLink"
                        className="field"
                        defaultValue={item?.defaultLink}
                        placeholder="/url"
                      />
                    </div>
                    <div className="actions flex items-center ml-8">
                      <button className="btn userBtn py-2" title="Save">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </>
        ) : (
          <ELoading />
        )}

        <button
          className="userBtn mx-auto lg:px-28 mt-10"
          onClick={() => setLimit((prevState) => prevState + 5)}
        >
          Load more
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        modalTitle="Create New Link"
      >
        <LinkLevelForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          data={data}
        />
      </Modal>
    </div>
  );
}

export default LinkLevels;
