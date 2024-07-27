import { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import Modal from "../../Modal";
import SearchInput from "../../SearchInput";
import CollapsibleItem from "../../Collapsible";
import { affiliateRequests } from "../../../config/requests";
import { fetchWrapper } from "../../../helpers";
import { BASE_URL } from "../../../config";
import LinkView from "./LinkView";
import useLinks from "../../../hooks/useLinks";
import ELoading from "../../ELoading";

function AffiliateLinksPage() {
  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);
  const { generalLinks, products, fetchGeneralLinks, fetchProducts } =
    useLinks();
  const [isGeneral, setIsGeneral] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [productId, setProductId] = useState();

  // Modal open/close functions
  function closeModal() {
    setIsGeneral(false);
    setIsProduct(false);
  }

  function openGeneralModal() {
    setIsGeneral(true);
  }

  function openProductModal(id) {
    setProductId(id);
    setIsProduct(true);
  }

  // Creating a new link function
  async function addLink(body, url) {
    try {
      setFetching(true);
      const res = await fetchWrapper.post(`${BASE_URL}/${url}`, body);
      const resJson = await res.json();

      if (res.ok) {
        setMessage({ sc: resJson.message, er: "" });
        console.log(resJson.message);
        fetchGeneralLinks();
        setFetching(false);
      } else {
        setMessage({ sc: "", er: resJson.message });
        console.log(resJson.message);
        setFetching(false);
      }
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
    closeModal();
  }

  // Add general link function
  function addGeneralLink(e) {
    e.preventDefault();

    //Collecting form data
    const body = {
      affiliateName: e.target.affiliateName.value,
      affiliateLink: e.target.affiliateLink.value,
      description: e.target.description.value,
    };

    addLink(body, affiliateRequests.addGeneralLink);
  }

  // Update general link function
  async function handleUpdate(linkId, body) {
    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}/${affiliateRequests.editGeneralLink}/${linkId}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        setMessage({ sc: resJson.message, er: "" });
        console.log(resJson.message);
        fetchGeneralLinks();
      } else {
        setMessage({ sc: "", er: resJson.message });
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  }

  // Add product link function
  async function addProductLink(e) {
    e.preventDefault();

    //Collecting form data
    const body = {
      affiliateName: e.target.affiliateName.value,
      affiliateLinks: e.target.affiliateLink.value,
      description: e.target.description.value,
    };

    try {
      setFetching(true);
      const res = await fetchWrapper.post(
        `${BASE_URL}/${affiliateRequests.addProductLink}/${productId}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        setMessage({ sc: resJson.message, er: "" });
        console.log(resJson.message);
        fetchProducts();
        setFetching(false);
      } else {
        setMessage({ sc: "", er: resJson.message });
        console.log(resJson.message);
        setFetching(false);
      }
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
    closeModal();
  }

  // Update product link function
  async function updateProduct(productId, linkData) {
    //Collecting form data
    const body = linkData;

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}/${affiliateRequests.editProduct}/${productId}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        setMessage({ sc: resJson.message, er: "" });
        console.log(resJson.message);
        fetchProducts();
      } else {
        setMessage({ sc: "", er: resJson.message });
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Affiliate Links</h3>

        <div className="ml-auto">
          <SearchInput placeholder="Search links..." />
        </div>
      </div>

      <div className="affiliateLinks">
        {isFetching ? (
          <ELoading />
        ) : (
          <>
            {/* general links */}
            <CollapsibleItem bgColor="blue" title="General Links">
              <div className="collapseBody p-6">
                {/* affiliate link details */}
                {generalLinks.length > 0 ? (
                  <>
                    {generalLinks.map((general) => (
                      <LinkView
                        name={general.affiliateName}
                        url={general.affiliateLink}
                        id={general._id}
                        fetchGeneralLinks={fetchGeneralLinks}
                        isEnable={general.isEnable}
                        description={general.description}
                        handleUpdate={handleUpdate}
                        key={general._id}
                      />
                    ))}
                  </>
                ) : (
                  <p className="text-center mb-2">
                    No Links found. Add new link
                  </p>
                )}

                <button
                  onClick={openGeneralModal}
                  className="addNewLink mb-6 focus:outline-none bg-white hover:bg-blue-200 transition-colors ease-in-out duration-300 w-full p-4 rounded-md text-center font-bold"
                >
                  Add new link
                </button>
              </div>
            </CollapsibleItem>

            {/* product links */}

            <div>
              <h3 className="text-gray-500 text-xs uppercase font-bold mb-2 mt-4">
                Product Affiliate links
              </h3>
            </div>

            {products.length > 0 ? (
              <>
                {products.map((item) => (
                  <div key={item._id}>
                    <CollapsibleItem bgColor="gray" title={item.productName}>
                      <div className="collapseBody p-6">
                        {/* affiliate link details */}
                        {item.affiliateLinks.length > 0 ? (
                          <>
                            {item.affiliateLinks.map((affiliate) => {
                              if (!affiliate.deletedStatus) {
                                return (
                                  <LinkView
                                    key={affiliate._id}
                                    id={affiliate._id}
                                    name={affiliate.affiliateName}
                                    url={affiliate.affiliateLinks}
                                    productId={item._id}
                                    fetchProducts={fetchProducts}
                                    isEnable={affiliate.isEnable}
                                    isProductLink
                                    description={affiliate.description}
                                    updateProduct={updateProduct}
                                  />
                                );
                              }
                            })}
                          </>
                        ) : (
                          <p className="text-center mb-2">
                            No Links found. Add new link
                          </p>
                        )}

                        <button
                          className="addNewLink bg-white hover:bg-blue-200 transition-colors ease-in-out duration-300 w-full p-4 rounded-md text-center font-bold"
                          onClick={() => openProductModal(item._id)}
                        >
                          Add new link
                        </button>
                      </div>
                    </CollapsibleItem>
                  </div>
                ))}
              </>
            ) : (
              <p className="bg-yellow-50 text-yellow-500 border border-yellow-500 p-2 rounded text-center">
                No products found... Add new link
              </p>
            )}
          </>
        )}
      </div>

      {/* create general-link modal */}
      <Modal
        isOpen={isGeneral}
        closeModal={closeModal}
        modalTitle="Add general link"
      >
        <form onSubmit={addGeneralLink}>
          <div className="mb-6">
            <label>Name:</label>
            <input
              type="text"
              name="affiliateName"
              placeholder="Enter affiliate link name..."
              className="field"
              required
            />
          </div>

          <div className="mb-6">
            <label>Affiliate Url:</label>
            <input
              type="text"
              name="affiliateLink"
              placeholder="Enter affiliate link url..."
              className="field"
              required
            />
          </div>

          <div className="mb-6">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter description..."
              className="field"
              rows="6"
              required
            />
          </div>

          <div>
            <button type="submit" className="userBtn w-full py-2 rounded">
              Add Link
            </button>
          </div>
        </form>
      </Modal>

      {/* create product-link modal */}
      <Modal
        isOpen={isProduct}
        closeModal={closeModal}
        modalTitle="Add product link"
      >
        <form onSubmit={addProductLink}>
          <div className="mb-6">
            <label>Name:</label>
            <input
              type="text"
              name="affiliateName"
              placeholder="Enter affiliate link name..."
              className="field"
              required
            />
          </div>

          <div className="mb-6">
            <label>Affiliate Url:</label>
            <input
              type="text"
              name="affiliateLink"
              placeholder="Enter affiliate link url..."
              className="field"
              required
            />
          </div>

          <div className="mb-6">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter description..."
              className="field"
              rows="6"
              required
            ></textarea>
          </div>

          <div>
            <button
              disabled={isFetching}
              type="submit"
              className="userBtn w-full py-2 rounded"
            >
              {isFetching ? "Link is being Adding..." : "Add Link"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AffiliateLinksPage;
