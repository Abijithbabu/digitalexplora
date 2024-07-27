import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { courseService } from "../services";
import { actionCreators } from "../store";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import getSymbolFromCurrency from "currency-symbol-map";

const animatedComponents = makeAnimated();

function ProductForm({ isLoading, onAddProduct }) {
  const { courses } = useSelector((state) => state.courses);
  const { apps } = useSelector((state) => state.app);
  const { products } = useSelector((state) => state.products);
  const router = useRouter();
  const [input, setInput] = useState({
    imageLink: "",
    name: "",
    slug: "",
    description: "",
    oldPrice: "",
    newPrice: "",
    gst: "",
    directAmount: "",
    tier2Amount: "",
    ambassadorAmount: "",
    course: [],
    isLevel: false,
    isLinkLevelEnabled: false,
    isAmbassodor: false,
  });

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedApps, setApps] = useState([]);
  const [selectedProduct, setProduct] = useState([]);
  const dispatch = useDispatch();
  const { setCourses, getAllApps } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const productData = {
      productName: input.name,
      oldPrice: Number(input.oldPrice),
      price: Number(input.newPrice),
      gst: input.gst,
      slug: input.slug,
      directAmount: Number(input.directAmount),
      tier2Amount: Number(input.tier2Amount),
      isLevel: input.isLevel,
      isLinkLevelEnabled: input.isLinkLevelEnabled,
      isAmbassodor: input.isAmbassador,
      directAmountAmbassoder: Number(input.ambassadorAmount),
      courses: selectedCourses,
      apps: selectedApps.map((item) => ({
        appId: item.value,
      })),
      parentName: selectedProduct.productName,
      parentId: selectedProduct._id,
      description: input.description,
    };

    onAddProduct(productData); 
  };

  useEffect(() => {
    getCourses();
    getAllApps();
  }, []);

  const handleSelect = (values) => {
    setSelectedCourses(values);
  };

  const handleAppSelect = (values) => {
    setApps(values);
  };

  const handleProductSelect = (e) => {
    const selectedProduct = JSON.parse(e.target.value);
    setProduct(selectedProduct);
  };

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

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="md:grid md:grid-cols-2 md:gap-2">
          <div className="mb-4 col-span-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Name..."
              className="field"
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="name">Slug*</label>
            <input
              type="text"
              name="slug"
              placeholder="slug"
              className="field"
              value={input.slug}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="number">
              Old Price in {getSymbolFromCurrency("INR")}*
            </label>
            <input
              type="number"
              name="oldPrice"
              placeholder="Number..."
              className="field"
              value={input.oldPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="number">
              New Price {getSymbolFromCurrency("INR")}*
            </label>
            <input
              type="number"
              name="newPrice"
              value={input.newPrice}
              onChange={handleChange}
              placeholder="Number..."
              className="field"
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="number">Description*</label>
            <textarea
              type="text"
              name="description"
              value={input.description}
              onChange={handleChange}
              placeholder="Add description here..."
              className="field"
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="gst">Gst (%)*</label>
            <input
              type="number"
              name="gst"
              value={input.gst}
              onChange={handleChange}
              max="100"
              placeholder="10%"
              className="field"
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="directAmount">
              Direct commission percentage (%)*
            </label>
            <input
              type="number"
              name="directAmount"
              value={input.directAmount}
              onChange={handleChange}
              max="100"
              placeholder="Enter percentage..."
              className="field"
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            {courses?.length > 0 ? (
              <>
                <label htmlFor="courses">Select Course*</label>
                <Select
                  name="courses"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={courses.map((course) => ({
                    value: course._id,
                    label: course.courseName,
                  }))}
                  onChange={handleSelect}
                />
              </>
            ) : (
              <div className="flex items-center justify-between">
                <p>No courses added yet</p>
                <button
                  className="text-blue-600 font-bold flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/admin/courses");
                  }}
                >
                  Add course
                  <PlusCircleIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </div>

          <div className="mb-4 col-span-2">
            {apps?.length > 0 ? (
              <>
                <label htmlFor="apps">Select Apps*</label>
                <Select
                  name="apps"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={apps.map((app) => ({
                    value: app._id,
                    label: app.name,
                  }))}
                  onChange={handleAppSelect}
                />
              </>
            ) : (
              <div className="flex items-center justify-between">
                <p>No apps added yet</p>
                <button
                  className="text-blue-600 font-bold flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/admin/app-manager");
                  }}
                >
                  Add app
                  <PlusCircleIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </div>

          <div className="mb-4 col-span-2">
            {products?.length > 0 && (
              <>
                <label htmlFor="products">Select product to promote*</label>
                <select className="field" onChange={handleProductSelect}>
                  {products.map((product) => (
                    <option value={JSON.stringify(product)} key={product._id}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div className="flex justify-between items-center col-span-2">
            <div>
              <div className="flex items-center">
                <label htmlFor="level">Level</label>
                <input
                  type="checkbox"
                  name="isLevel"
                  onChange={handleChange}
                  defaultChecked={input.isLevel}
                  className="form-checkbox w-6 h-6 rounded cursor-pointer bg-blue-200 ml-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <label htmlFor="isLinkLevelEnabled">Enable Link level</label>
                <input
                  type="checkbox"
                  name="isLinkLevelEnabled"
                  onChange={handleChange}
                  defaultChecked={input.isLinkLevelEnabled}
                  className="form-checkbox w-6 h-6 rounded cursor-pointer bg-blue-200 ml-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <label htmlFor="isAmbassador">Is Ambassador</label>
                <input
                  type="checkbox"
                  name="isAmbassador"
                  onChange={handleChange}
                  defaultChecked={input.isAmbassodor}
                  className="form-checkbox w-6 h-6 rounded cursor-pointer bg-blue-200 ml-2"
                />
              </div>
            </div>
          </div>

          {input.isAmbassador ? (
            <>
              <div className="my-4 col-span-2">
                <label htmlFor="directAmount">
                  Ambassador commission Percentage (%)*
                </label>
                <input
                  type="number"
                  name="ambassadorAmount"
                  value={input.ambassadorAmount}
                  onChange={handleChange}
                  max="100"
                  placeholder="Enter commission percentage..."
                  className="field"
                  required
                />
              </div>

              <div className="mb-4 col-span-2">
                <label htmlFor="tier2Amount">
                  Tier 2 commission percentage (%)*
                </label>
                <input
                  type="number"
                  name="tier2Amount"
                  value={input.tier2Amount}
                  onChange={handleChange}
                  max="100"
                  placeholder="Enter percentage..."
                  className="field"
                  required
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="col-span-2 mt-8">
            <button
              className="w-full userBtn"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
