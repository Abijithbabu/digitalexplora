import dynamic from "next/dynamic";
import FileUploadBtn from "../../FileUploadBtn";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

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

function Step1({
  currentStep,
  handleChange,
  handleImage,
  setHeadingPoints,
  data,
}) {
  if (currentStep !== 1) {
    return null;
  }
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-center mb-4">
        Lead Page <span className="text-blue-500">(Step 1)</span>
      </h3>

      <div className="bg-gray-700 p-4">
        <h4 className="text-sm text-gray-300 font-semibold">Header Section:</h4>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-4 bg-gray-100 p-10 mb-4">
        <div className="col-span-6">
          <label>Featured Image</label>
          <FileUploadBtn
            title="featured"
            name="featuredImage"
            dataId=""
            dataNested=""
            image={data?.featuredImage}
            handleImage={handleImage}
          />
        </div>

        <div className="col-span-6">
          <label>Background Image</label>
          <FileUploadBtn
            title="background"
            name="backgroundImage"
            dataId=""
            dataNested=""
            image={data?.backgroundImage}
            handleImage={handleImage}
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
            value={data?.leadPageUrl}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="bg-gray-700 p-4">
        <h4 className="text-sm text-gray-300 font-semibold">Grids Section:</h4>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-4 bg-gray-100 p-10 mb-4">
        <div className="col-span-3">
          <label>Background Image</label>
          <FileUploadBtn
            title="gridBackground"
            name="backgroundImage"
            dataId="grids"
            dataNested=""
            image={data?.grids?.backgroundImage}
            handleImage={handleImage}
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="heading">Heading*</label>
          <textarea
            type="text"
            name="heading"
            data-id="grids"
            data-nested=""
            placeholder="Heading..."
            className="field"
            value={data?.grids?.heading}
            onChange={handleChange}
          />

          <label htmlFor="subHeading">Sub Heading*</label>
          <textarea
            type="text"
            name="subHeading"
            data-id="grids"
            data-nested=""
            placeholder="Sub Heading..."
            className="field"
            value={data?.grids?.subHeading}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-3">
          <label htmlFor="buttonColor">Button Color*</label>
          <input
            type="color"
            name="buttonColor"
            data-id="grids"
            data-nested="styles"
            className="h-12 w-full rounded"
            value={data?.grids?.styles?.buttonColor}
            onChange={handleChange}
          />

          <label htmlFor="text">Button Text*</label>
          <input
            type="text"
            name="text"
            data-id="grids"
            data-nested="styles"
            placeholder="Text..."
            className="field"
            value={data?.grids?.styles?.text}
            onChange={handleChange}
          />

          <label htmlFor="textColor">Button Text Color*</label>
          <input
            type="color"
            name="textColor"
            data-id="grids"
            data-nested="styles"
            className="h-12 w-full rounded"
            value={data?.grids?.styles?.textColor}
            onChange={handleChange}
          />
        </div>

        <fieldset className="col-span-12">
          <legend className="text-sm font-semibold text-gray-800 bg-gray-300 p-4 w-full">
            3 Columns
          </legend>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4 p-6 bg-white">
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
                value={data?.grids?.grid1?.heading}
                onChange={handleChange}
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
                value={data?.grids?.grid1?.description}
                onChange={handleChange}
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
                value={data?.grids?.grid2?.heading}
                onChange={handleChange}
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
                value={data?.grids?.grid2?.description}
                onChange={handleChange}
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
                value={data?.grids?.grid3?.heading}
                onChange={handleChange}
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
                value={data?.grids?.grid3?.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="bg-gray-700 p-4 max-w-3xl">
        <h4 className="text-sm text-gray-300 font-semibold">Popup Section:</h4>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-4 bg-gray-100 p-10 max-w-3xl">
        <div>
          <label htmlFor="title">Title*</label>
          <textarea
            type="text"
            name="title"
            data-id="popup"
            data-nested=""
            placeholder="Popup title..."
            className="field mb-5"
            value={data?.popup?.title}
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
            placeholder="Sub Description..."
            className="field"
            value={data?.popup?.subDescription}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Step1;
