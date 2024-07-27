import { useState } from "react";
import useFetchAws from "@/hooks/useFetchAws";
import axios from "axios";
import { removeParam } from "@/helpers/removeParams";
import dynamic from "next/dynamic";
import { fetchWrapper } from "@/helpers";
import { BASE_URL } from "@/config";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";

import FileUploadBtn from "../../FileUploadBtn";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function SingleWebinar({ setMessage, webinar, slug }) {
  const [data, setData] = useState(webinar);
  const [headingPoints, setHeadingPoints] = useState();

  const [isUpdating, setUpdating] = useState();
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();
  const { fetchWebinar } = bindActionCreators(actionCreators, dispatch);

  async function onUpdate(e) {
    e.preventDefault();

    const point = {
      point: {
        ...data.point,
        points: headingPoints,
      },
    };

    if (headingPoints) {
      Object.assign(data, point);
    }

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}/webinar/edit-webinar/${data._id}`,
        data
      );
      const resJson = await res.json();
      setUpdating(true);

      if (res.ok) {
        fetchWebinar(slug);
        setUpdating(false);
        setMessage({ sc: resJson.message, er: "" });
      } else {
        console.log(resJson.message);
        setUpdating(false);
        setMessage({ sc: "", er: resJson.message });
      }
    } catch (error) {
      console.log(error);
      setUpdating(false);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }

  function handleChange(e) {
    const { dataset, name, value, type, files } = e.target;

    if (type !== "file") {
      // Use a functional state update
      setData((datas) => ({
        ...datas,
        ...(dataset.id
          ? {
              // update the correct dataset id
              [dataset.id]: {
                // shallow copy existing dataset values
                ...datas[dataset.id],

                // if value is nested then update nested state value
                ...(dataset.nested
                  ? {
                      [dataset.nested]: {
                        // shallow copy existing nested values
                        ...datas[dataset.id]?.[dataset.nested],

                        // update nested field value
                        [name]: value,
                      },
                    }
                  : {
                      // update unnested field value
                      [name]: value,
                    }),
              },
            }
          : {
              // update unnested field value
              [name]: value,
            }),
      }));
    } else {
      // Use a functional state update
      setData((datas) => ({
        ...datas,
        ...(dataset.id
          ? {
              // update the correct dataset id
              [dataset.id]: {
                // shallow copy existing dataset values
                ...datas[dataset.id],

                // if value is nested then update nested state value
                ...(dataset.nested
                  ? {
                      [dataset.nested]: {
                        // shallow copy existing nested values
                        ...datas[dataset.id]?.[dataset.nested],

                        // update nested field value
                        [name]: files[0],
                      },
                    }
                  : {
                      // update unnested field value
                      [name]: files[0],
                    }),
              },
            }
          : {
              // update unnested field value
              [name]: files[0],
            }),
      }));
    }
  }

  async function handleImage(e) {
    const { dataset } = e.target;
    const file = e.target.files[0];

    const url = await useFetchAws(file, "webinar");

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        setLoading(percent);
      },
    };

    await axios
      .put(url, file, options)
      .then(({ config }) => {
        const alteredUrl = removeParam("Content-Type", config.url);
        // Use a functional state update
        setData((datas) => ({
          ...datas,
          ...(dataset.id
            ? {
                // update the correct dataset id
                [dataset.id]: {
                  // shallow copy existing dataset values
                  ...datas[dataset.id],

                  // if value is nested then update nested state value
                  ...(dataset.nested
                    ? {
                        [dataset.nested]: {
                          // shallow copy existing nested values
                          ...datas[dataset.id]?.[dataset.nested],

                          // update nested field value
                          [e.target.name]: alteredUrl,
                        },
                      }
                    : {
                        // update unnested field value
                        [e.target.name]: alteredUrl,
                      }),
                },
              }
            : {
                // update unnested field value
                [e.target.name]: alteredUrl,
              }),
        }));
        setMessage({ sc: "Uploaded successfully", er: "" });

        setTimeout(() => {
          setLoading(null);
          setMessage({ sc: "", er: "" });
        }, 2000);
      })
      .catch((err) => {
        setMessage({ sc: "", er: "Something went wrong! Try again" });
        console.log(err);
      });
  }

  const addInput = (e) => {
    e.preventDefault();
    setData({
      ...data,
      languages: [
        ...data.languages,
        {
          language: "",
          videoUrl: "",
        },
      ],
    });
  };

  const handleLanguage = (e) => {
    const { dataset, name, value } = e.target;

    let temp_Arr = [...data.languages];

    let temp_ele = { ...temp_Arr[dataset.id] };

    if (name === "videoUrl") {
      temp_ele.videoUrl = value;
    } else if (name === "language") {
      temp_ele.language = value;
    } else {
      return;
    }

    temp_Arr[dataset.id] = temp_ele;

    setData({
      ...data,
      languages: temp_Arr,
    });
  };

  function handleLangDelete(e, index) {
    e.preventDefault();

    const newArr = [...data.languages];
    newArr.splice(index, 1);

    setData({ ...data, languages: newArr });
  }

  return (
    <div className="w-full px-10 pb-4">
      {loading > 0 ? (
        <div className="w-full h-full fixed flex items-center justify-center top-0 left-0 bg-white bg-opacity-90 z-50">
          <div className="percent">
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
              <circle cx="70" cy="70" r="70"></circle>
            </svg>
            <div className="number">
              <h2>
                {loading}
                <span>%</span>
              </h2>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={onUpdate}>
        <h3 className="text-xl font-bold text-center mb-4">
          Lead Page <span className="text-blue-500">(Step 1)</span>
        </h3>

        {/* header section */}
        <section>
          <div className="bg-gray-700 p-4">
            <h4 className="text-sm text-gray-300 font-semibold">
              Header Section:
            </h4>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-4 bg-gray-100 p-10 mb-4">
            <div className="col-span-6">
              <label htmlFor="featuredImage">Featured Image*</label>
              <FileUploadBtn
                image={data?.featuredImage}
                handleImage={handleImage}
                title="featuredImage"
                dataId=""
                dataNested=""
                name="featuredImage"
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="backgroundImage">Background Image*</label>
              <FileUploadBtn
                image={data?.backgroundImage}
                handleImage={handleImage}
                title="backgroundImage"
                dataId=""
                dataNested=""
                name="backgroundImage"
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="smallHead">Small Head*</label>
              <textarea
                name="smallHead"
                data-id=""
                data-nested=""
                placeholder="Small head..."
                className="field"
                value={data?.smallHead}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="heading">Heading*</label>
              <textarea
                type="text"
                name="heading"
                data-id=""
                data-nested=""
                placeholder="Heading..."
                className="field"
                value={data?.heading}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="subHeading">Sub Heading*</label>
              <textarea
                type="text"
                name="subHeading"
                data-id=""
                data-nested=""
                placeholder="Sub Heading..."
                className="field"
                value={data?.subHeading}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="buttonColor">Button Color*</label>
              <input
                type="color"
                name="buttonColor"
                data-id="styles"
                data-nested=""
                className="h-12 w-full rounded"
                value={data?.styles?.buttonColor}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="text">Button Text*</label>
              <input
                type="text"
                name="text"
                data-id="styles"
                data-nested=""
                placeholder="Text..."
                className="field"
                value={data?.styles?.text}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="textColor">Button Text Color*</label>
              <input
                type="color"
                name="textColor"
                data-id="styles"
                data-nested=""
                className="h-12 w-full rounded"
                value={data?.styles?.textColor}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="heading">Heading & Points*</label>
              <input
                type="text"
                name="heading"
                data-id="point"
                data-nested=""
                placeholder="Featured Heading..."
                className="field mb-4"
                value={data?.point?.heading}
                onChange={handleChange}
              />
              <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                defaultValue="<ul><li>Hello</li></ul>"
                theme="snow"
                onChange={(value) => setHeadingPoints(JSON.stringify(value))}
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="heading">Lead page url*</label>
              <input
                type="text"
                name="leadPageUrl"
                data-id=""
                data-nested=""
                placeholder="Lead page url..."
                className="field"
                value={webinar?.leadPageUrl}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* grid section */}
        <section>
          <div className="bg-gray-700 p-4">
            <h4 className="text-sm text-gray-300 font-semibold">
              Grids Section:
            </h4>
          </div>
          <div className="lg:grid lg:grid-cols-4 lg:gap-4 bg-gray-100 p-10 mb-4">
            <div className="col-span-2">
              <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="col-span-2">
                  <label>Background Image*</label>
                  <FileUploadBtn
                    image={data?.backgroundImage}
                    handleImage={handleImage}
                    title="gridBackground"
                    dataId="grids"
                    dataNested=""
                    name="backgroundImage"
                  />
                </div>

                <div>
                  <label htmlFor="heading">Heading*</label>
                  <input
                    type="text"
                    name="heading"
                    data-id="grids"
                    data-nested=""
                    placeholder="Heading..."
                    className="field"
                    onChange={handleChange}
                    value={data?.grids?.heading}
                  />
                </div>

                <div>
                  <label htmlFor="subHeading">Sub Heading*</label>
                  <input
                    type="text"
                    name="subHeading"
                    data-id="grids"
                    data-nested=""
                    placeholder="Sub Heading..."
                    className="field"
                    onChange={handleChange}
                    value={data?.grids?.subHeading}
                  />
                </div>

                <div>
                  <label htmlFor="buttonColor">Button Color*</label>
                  <input
                    type="color"
                    name="buttonColor"
                    data-id="grids"
                    data-nested="styles"
                    className="h-12 w-full rounded"
                    onChange={handleChange}
                    value={data?.grids?.styles?.buttonColor}
                  />
                </div>

                <div>
                  <label htmlFor="text">Button Text*</label>
                  <input
                    type="text"
                    name="text"
                    data-id="grids"
                    data-nested="styles"
                    placeholder="Text..."
                    className="field"
                    onChange={handleChange}
                    value={data?.grids?.styles?.text}
                  />
                </div>

                <div>
                  <label htmlFor="textColor">Button Text Color*</label>
                  <input
                    type="color"
                    name="textColor"
                    data-id="grids"
                    data-nested="styles"
                    className="h-12 w-full rounded"
                    onChange={handleChange}
                    value={data?.grids?.styles?.textColor}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <fieldset>
                <legend className="text-lg font-bold text-gray-400 mb-3">
                  3 Columns
                </legend>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4">
                  {/* first column */}
                  <div>
                    <label htmlFor="heading">Heading*</label>
                    <input
                      type="text"
                      name="heading"
                      data-id="grids"
                      data-nested="grid1"
                      placeholder="First Col Heading..."
                      className="field mb-5"
                      onChange={handleChange}
                      value={data?.grids?.grid1?.heading}
                    />

                    <label htmlFor="description">Description*</label>
                    <textarea
                      type="text"
                      name="description"
                      data-id="grids"
                      data-nested="grid1"
                      rows="4"
                      placeholder="First Column Description..."
                      className="field"
                      onChange={handleChange}
                      value={data?.grids?.grid1?.description}
                    />
                  </div>

                  {/* second column */}
                  <div>
                    <label htmlFor="heading">Heading*</label>
                    <input
                      type="text"
                      name="heading"
                      data-id="grids"
                      data-nested="grid2"
                      placeholder="Second Col Heading..."
                      className="field mb-5"
                      onChange={handleChange}
                      value={data?.grids?.grid2?.heading}
                    />

                    <label htmlFor="description">Description*</label>
                    <textarea
                      type="text"
                      name="description"
                      data-id="grids"
                      data-nested="grid2"
                      rows="4"
                      placeholder="Second Column Description..."
                      className="field"
                      onChange={handleChange}
                      value={data?.grids?.grid2?.description}
                    />
                  </div>

                  {/* third column */}
                  <div>
                    <label htmlFor="heading">Heading*</label>
                    <input
                      type="text"
                      name="heading"
                      data-id="grids"
                      data-nested="grid3"
                      placeholder="Third Col Heading..."
                      className="field mb-5"
                      onChange={handleChange}
                      value={data?.grids?.grid3?.heading}
                    />

                    <label htmlFor="description">Description*</label>
                    <textarea
                      type="text"
                      name="description"
                      data-id="grids"
                      data-nested="grid3"
                      rows="4"
                      placeholder="Third Column Description..."
                      className="field"
                      onChange={handleChange}
                      value={data?.grids?.grid3?.description}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </section>

        {/* popup section */}
        <section>
          <div className="bg-gray-700 p-4">
            <h4 className="text-sm text-gray-300 font-semibold">
              Popup Section:
            </h4>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-4 bg-gray-100 p-10 mb-4">
            <div>
              <label htmlFor="title">Title*</label>
              <input
                type="text"
                name="title"
                data-id="popup"
                data-nested=""
                placeholder="Popup title..."
                className="field mb-5"
                value={webinar?.popup?.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="subDescription">Sub Description*</label>
              <textarea
                type="text"
                name="subDescription"
                data-id="popup"
                data-nested=""
                rows="4"
                placeholder="Sub Description..."
                className="field"
                value={webinar?.popup?.subDescription}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* video page */}
        <section>
          <h3 className="text-xl font-bold text-center mt-10 mb-4">
            Video Page <span className="text-blue-500">(Step 2)</span>
          </h3>

          <div className="lg:grid lg:grid-cols-4 lg:gap-4 bg-gray-100 p-10 mb-4">
            <div>
              <label htmlFor="smallHead">Small Head*</label>
              <input
                type="text"
                name="smallHead"
                data-id="videoPage"
                data-nested=""
                placeholder="Small head..."
                className="field"
                value={data?.videoPage?.smallHead}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="heading">Heading*</label>
              <input
                type="text"
                name="heading"
                data-id="videoPage"
                data-nested=""
                placeholder="Heading..."
                className="field"
                value={data?.videoPage?.heading}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="subHead">Sub Heading*</label>
              <input
                type="text"
                name="subHead"
                data-id="videoPage"
                data-nested=""
                placeholder="Sub Heading..."
                className="field"
                value={data?.videoPage?.subHead}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description">Description*</label>
              <textarea
                type="text"
                name="description"
                data-id="videoPage"
                data-nested=""
                rows="4"
                placeholder="Description..."
                className="field"
                value={data?.videoPage?.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="buttonColor">Button Color*</label>
              <input
                type="color"
                name="buttonColor"
                data-id="videoPage"
                data-nested="styles"
                placeholder="Button color..."
                className="h-12 w-full rounded"
                value={data?.videoPage?.styles?.buttonColor}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="text">Text*</label>
              <input
                type="text"
                name="text"
                data-id="videoPage"
                data-nested="styles"
                placeholder="Text..."
                className="field"
                value={data?.videoPage?.styles?.text}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="textColor">Text Color*</label>
              <input
                type="color"
                name="textColor"
                data-id="videoPage"
                data-nested="styles"
                placeholder="Text color..."
                className="h-12 w-full rounded"
                value={data?.videoPage?.styles?.textColor}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label>Background Image*</label>
              <FileUploadBtn
                image={data?.videoPage?.backgroundImage}
                handleImage={handleImage}
                title="videoBackground"
                dataId="videoPage"
                dataNested=""
                name="backgroundImage"
              />
            </div>
          </div>
        </section>

        {/* settings */}
        <section>
          <h3 className="text-xl font-bold text-center mt-10 mb-4">
            Settings <span className="text-blue-500">(Step 3)</span>
          </h3>

          <div className="lg:grid lg:grid-cols-4 lg:gap-4 bg-gray-100 p-10">
            <div className="mb-4 col-span-2">
              <label htmlFor="url">Webinar Name*</label>
              <input
                type="text"
                name="webinarName"
                data-id=""
                data-nested=""
                placeholder="Webinar name..."
                className="field"
                value={data?.webinarName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 col-span-2">
              <label htmlFor="slug">Webinar Link*</label>
              <input
                type="text"
                name="slug"
                data-id=""
                data-nested=""
                placeholder="Webinar link..."
                className="field"
                value={data?.slug}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 col-span-2">
              {data?.languages ? (
                <div className="mb-4">
                  <div className="flex my-4">
                    <h3 className="font-bold">Add languages*</h3>
                    <button
                      className="ml-auto focus:outline-none"
                      onClick={addInput}
                    >
                      <PlusCircleIcon className="w-8 h-8 p-1 bg-gray-50 border border-gray-400 text-gray-400 hover:text-blue-500 rounded" />
                    </button>
                  </div>
                  {data?.languages.map((item, i) => (
                    <div className="flex mb-4 items-center" key={i}>
                      <div>
                        <label htmlFor="language">Language:</label>
                        <input
                          type="text"
                          name="language"
                          placeholder="language"
                          className="field"
                          data-id={i}
                          value={item.language}
                          onChange={handleLanguage}
                        />
                      </div>
                      <div className="ml-2 flex-1">
                        <label htmlFor="url">Video embed url:</label>
                        <input
                          type="url"
                          name="videoUrl"
                          placeholder="url"
                          className="field"
                          data-id={i}
                          value={item.videoUrl}
                          onChange={handleLanguage}
                        />
                      </div>
                      <button
                        className="ml-3 mt-5"
                        onClick={(e) => handleLangDelete(e, i)}
                      >
                        <TrashIcon className="w-8 h-8 p-1 bg-gray-50 border border-gray-400 text-gray-400 hover:text-red-500 rounded" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                "Loading..."
              )}
            </div>
          </div>
        </section>

        <div className="mb-4 mt-6">
          <button
            className={`userBtn py-3 w-full sm:w-auto sm:ml-auto md:w-40 ${
              isUpdating && "animate-pulse"
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SingleWebinar;
