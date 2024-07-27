import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../store";
import { bindActionCreators } from "redux";
import Breadcrump from "../../Breadcrump";
import { useEffect, useState } from "react";
import { courseService, productService } from "../../../services";
import axios from "axios";
import { BASE_URL } from "../../../config";
import MultiSelect from "../../MultiSelect";
import { fetchWrapper } from "../../../helpers";
import { removeParam } from "../../../helpers/removeParams";
import { productRequests } from "../../../config/requests";
import useFetchAws from "../../../hooks/useFetchAws";

function ProductDetail({ product, fetchProduct }) {
  const router = useRouter();
  const { productId } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const { courses } = useSelector((state) => state.courses);
  const { apps } = useSelector((state) => state.app);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { setCourses, setMessage, getAllApps, getAllProducts } =
    bindActionCreators(actionCreators, dispatch);

  const [image, setImage] = useState({
    currentFile: product.imageLink ? product.imageLink : "",
    progress: 0,
  });

  const [data, setData] = useState({
    productName: product.productName ? product.productName : "",
    description: product.description ? product.description : "",
    slug: product.slug ? product.slug : "",
    oldPrice: product.oldPrice ? product.oldPrice : "",
    price: product.price ? product.price : "",
    gst: product.gst ? product.gst : "",
    directAmount: product.directAmount ? product.directAmount : "",
    tier2Amount: product.tier2Amount ? product.tier2Amount : "",
    courses: product?.courses,
    apps: product?.apps,
    parentName: product?.parentName,
    parentId: product?.parentId,
    isLevel: product?.isLevel,
    isLinkLevelEnabled: product?.isLinkLevelEnabled,
    isAmbassodor: product?.isAmbassodor,
    directAmountAmbassoder: product?.directAmountAmbassoder,
    buttonColor: product?.buttonColor,
    text: product?.text,
    textColor: product?.textColor,
    target: product?.target
  });

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setData({
        ...data,
        [e.target.name]: e.target.checked,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  async function onSelectFile(event) {
    const file = event.target.files[0];

    const url = await useFetchAws(file, "product");

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
      .then(({ config }) => {
        const alteredUrl = removeParam("Content-Type", config.url);

        setImage({
          currentFile: alteredUrl,
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

  const onUpdate = async (e) => {
    e.preventDefault();
    var body;

    if (data.isAmbassodor) {
      body = {
        productName: data.productName,
        description: data.description,
        slug: data.slug,
        oldPrice: data.oldPrice,
        price: data.price,
        gst: data.gst,
        directAmount: data.directAmount,
        tier2Amount: data.tier2Amount,
        courses: data.courses,
        apps: data.apps.map((item) => ({
          appId: item.appId._id,
        })),
        parentName: data.parentName,
        parentId: data.parentId,
        isLevel: data.isLevel,
        isLinkLevelEnabled: data.isLinkLevelEnabled,
        isAmbassodor: data.isAmbassodor,
        directAmountAmbassoder: data.directAmountAmbassoder,
        buttonColor: data?.buttonColor,
        text: data?.text,
        textColor: data?.textColor,
        target: data?.target
      };
    } else {
      body = {
        productName: data.productName,
        description: data.description,
        slug: data.slug,
        oldPrice: data.oldPrice,
        price: data.price,
        gst: data.gst,
        directAmount: data.directAmount,
        courses: data.courses,
        apps: data.apps.map((item) => ({
          appId: item.appId._id,
        })),
        parentName: data.parentName,
        parentId: data.parentId,
        isLevel: data.isLevel,
        isLinkLevelEnabled: data.isLinkLevelEnabled,
        isAmbassodor: data.isAmbassodor,
        buttonColor: data?.buttonColor,
        text: data?.text,
        textColor: data?.textColor,
        target: data?.target
      };
    }

    Object.assign(body, {
      imageLink: image.currentFile,
    });

    setIsLoading(true);

    try {
      const res = await productService.update(product?._id, body);
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        fetchProduct(productId);
        setMessage({ sc: resJson.message, er: "" });
        setIsLoading(false);
      } else {
        console.log(resJson.message);
        setMessage({ er: resJson.message, sc: "" });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage({ er: "", sc: "" });
    }, 5000);
  };

  useEffect(() => {
    getCourses();
    getAllApps();
    getAllProducts(0, 50);
  }, []);

  // get course list for select box
  async function getCourses() {
    const res = await courseService.listAll();
    const resJson = await res.json();

    try {
      if (res.ok) {
        setCourses(resJson);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const defaultValues = data.courses.map((item) => ({
    value: item._id,
    label: item.label,
  }));

  const options = courses.map((item) => ({
    value: item._id,
    label: item.courseName,
  }));

  const handleSelect = (values) => {
    setData({
      ...data,
      courses: values,
    });
  };

  const handleAppSelect = (values) => {
    setData({
      ...data,
      apps: values,
    });
  };

  const handleProductSelect = (e) => {
    const selectedProduct = JSON.parse(e.target.value);
    setData({
      ...data,
      parentName: selectedProduct.productName,
      parentId: selectedProduct._id,
    });
  };

  // delete product
  async function deleteProduct(id) {
    const confirmMsg = window.confirm(
      "Do you want to delete the product permanently?"
    );

    if (!confirmMsg) return;

    try {
      const res = await fetchWrapper.patch(
        `${BASE_URL}${productRequests.delete}${id}`
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        fetchProduct();
        alert("Product deleted succefully");
        router.push("/admin/products");
      } else {
        setMessage({ sc: "", er: resJson.message });
        console.log(resJson.message);
      }
    } catch (error) {
      setMessage({ sc: "", er: error.message });
      console.log(error.message);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Breadcrump
          baseLink="/admin/products"
          baseTitle="Products"
          id={productId}
          edit={false}
          item="Course"
          itemName={product.productName}
        />
      </div>

      {product ? (
        <div className="w-full">
          <h2 className="font-semibold tracking-wider">Information</h2>
          <hr className="my-4" />
          {/* course details */}
          <div className="sm:grid sm:grid-cols-3 sm:gap-6 my-6">
            <div className="leftCol">
              <h3 className="text-gray-900 text-base font-semibold tracking-wider">
                Details
              </h3>
              <p className="text-sm">Change information about your product.</p>
            </div>
            <div className="rightCol col-span-2 bg-white rounded-md p-8">
              <form onSubmit={onUpdate}>
                <div className="mb-6">
                  <label htmlFor="productName">Product Name:</label>
                  <input
                    type="text"
                    className="field"
                    name="name"
                    placeholder="Enter your product name..."
                    value={data.productName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="slug">Slug:</label>
                  <input
                    type="text"
                    className="field"
                    name="slug"
                    placeholder="slug"
                    value={data.slug}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    rows="8"
                    className="field"
                    name="description"
                    placeholder="Enter your description..."
                    value={data.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <div className="firstCol">
                      <label htmlFor="price">New price:</label>
                      <input
                        type="text"
                        className="field"
                        name="price"
                        placeholder="Enter new price..."
                        value={data.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="midCol">
                      <label htmlFor="oldPrice">Old price:</label>
                      <input
                        type="text"
                        className="field"
                        name="oldPrice"
                        placeholder="Enter old price..."
                        value={data.oldPrice}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="lastCol">
                      <label htmlFor="gst">GST (%):</label>
                      <input
                        type="text"
                        className="field"
                        name="gst"
                        placeholder="Enter gst in percentage..."
                        value={data.gst}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div className="leftCol">
                      <label htmlFor="productImage">Product image</label>
                      <img
                        src={
                          image.currentFile
                            ? image.currentFile
                            : "/img/no_image.jpg"
                        }
                        className="w-full h-44 object-cover rounded"
                        alt={data.productName}
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
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <div className="firstCol">
                      <label htmlFor="buttonColor">Button Color*</label>
                      <input
                        type="color"
                        name="buttonColor"
                        data-id="grids"
                        data-nested="styles"
                        className="h-12 w-full rounded"
                        value={data?.buttonColor}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="midCol">
                      <label htmlFor="text">Button Text*</label>
                      <input
                        type="text"
                        name="text"
                        data-id="grids"
                        data-nested="styles"
                        placeholder="Text..."
                        className="field"
                        value={data?.text}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="lastCol">
                      <label htmlFor="textColor">Button Text Color*</label>
                      <input
                        type="color"
                        name="textColor"
                        data-id="grids"
                        data-nested="styles"
                        className="h-12 w-full rounded"
                        value={data?.textColor}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="leftCol">
                    <label htmlFor="target">
                      Button Action (Target url):
                    </label>
                    <input
                      type="text"
                      className="field"
                      name="target"
                      placeholder="Enter redirect url"
                      value={data?.target}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="leftCol">
                    <label htmlFor="directAmount">
                      Direct Commission Percentage (%):
                    </label>
                    <input
                      type="text"
                      className="field"
                      name="directAmount"
                      max="100"
                      placeholder="Enter direct commission percentage..."
                      value={data.directAmount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="courses">Select Courses:</label>
                  {courses.length > 0 ? (
                    <MultiSelect
                      options={options}
                      defaultValue={defaultValues}
                      handleSelect={handleSelect}
                    />
                  ) : (
                    <p>No courses found</p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="apps">Select Apps:</label>
                  {apps?.length > 0 ? (
                    <MultiSelect
                      options={apps?.map((item) => ({
                        value: item?._id,
                        label: item?.name,
                      }))}
                      defaultValue={data?.apps?.map((item) => ({
                        value: item?.appId?._id,
                        label: item?.appId?.name,
                      }))}
                      handleSelect={handleAppSelect}
                    />
                  ) : (
                    <p>No apps found</p>
                  )}
                </div>

                <div className="mb-4 col-span-2">
                  {products?.length > 0 && (
                    <>
                      <label htmlFor="products">
                        Select product to promote*
                      </label>
                      <select
                        className="field"
                        defaultValue={data.parentId}
                        onChange={handleProductSelect}
                      >
                        <option value="" selected={!data.parentName} disabled>
                          Choose a product
                        </option>
                        {products.map((product) => (
                          <option
                            value={JSON.stringify(product)}
                            key={product._id}
                          >
                            {product.productName}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label htmlFor="level">Level product / Not:</label>
                    <input
                      type="checkbox"
                      name="isLevel"
                      checked={data.isLevel}
                      onChange={handleChange}
                      className="w-8 h-8 form-checkbox border border-gray-500 hover:bg-blue-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label htmlFor="level">Enable link level:</label>
                    <input
                      type="checkbox"
                      name="isLinkLevelEnabled"
                      checked={data.isLinkLevelEnabled}
                      onChange={handleChange}
                      className="w-8 h-8 form-checkbox border border-gray-500 hover:bg-blue-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label htmlFor="isAmbassodor">
                      Ambassador program / Not:
                    </label>
                    <input
                      type="checkbox"
                      name="isAmbassodor"
                      checked={data.isAmbassodor}
                      onChange={handleChange}
                      className="w-8 h-8 form-checkbox border border-gray-500 hover:bg-blue-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
                {data.isAmbassodor && (
                  <div className="lg:grid lg:grid-cols-2 lg:gap-4 mt-4">
                    <div className="rightCol">
                      <label htmlFor="directAmountAmbassodor">
                        Ambassodor Commission Percentage (%):
                      </label>
                      <input
                        type="text"
                        className="field"
                        name="directAmountAmbassoder"
                        max="100"
                        placeholder="Enter ambassador commission amount..."
                        value={data.directAmountAmbassoder}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="rightCol">
                      <label htmlFor="tier2Amount">
                        Tier 2 Commission Percentage (%):
                      </label>
                      <input
                        type="text"
                        className="field"
                        name="tier2Amount"
                        max="100"
                        placeholder="Enter tier 2 commission percentage..."
                        value={data.tier2Amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                <div className="mb-4 mt-6">
                  <button
                    className={`userBtn py-3 w-full sm:w-auto sm:ml-auto md:w-40 ${isLoading && "animate-pulse"
                      }`}
                    disabled={isLoading}
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

          <div className="sm:grid sm:grid-cols-3 sm:gap-6 my-6">
            <div className="leftCol">
              <h3 className="text-gray-900 text-base font-semibold tracking-wider">
                Actions
              </h3>
              <p className="text-sm">
                Take action to delete or duplicate your course
              </p>
            </div>
            <div className="rightCol col-span-2 bg-white rounded-md p-8 flex items-center">
              <button
                className="btn bg-white border-red-500 text-red-600 ml-4"
                onClick={() => deleteProduct(productId)}
              >
                Delete product Permanently
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8">
          <Loading />
        </div>
      )}
    </>
  );
}

export default ProductDetail;
