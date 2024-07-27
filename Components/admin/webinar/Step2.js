import FileUploadBtn from "../../FileUploadBtn";

function Step2({ currentStep, handleChange, data, handleImage }) {
  if (currentStep !== 2) {
    return null;
  }
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-center mb-4">
        Video Page <span className="text-blue-500">(Step 2)</span>
      </h3>

      <div className="lg:grid lg:grid-cols-12 lg:gap-4 mb-10 p-10 bg-gray-100">
        <div className="col-span-6">
          <label htmlFor="smallHead">Small Head*</label>
          <textarea
            name="smallHead"
            data-id="videoPage"
            data-nested=""
            placeholder="Small head..."
            className="field"
            value={data?.videoPage?.smallHead}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="heading">Heading*</label>
          <textarea
            name="heading"
            data-id="videoPage"
            data-nested=""
            placeholder="Heading..."
            className="field"
            value={data?.videoPage?.heading}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="subHead">Sub Heading*</label>
          <textarea
            name="subHead"
            data-id="videoPage"
            data-nested=""
            placeholder="Sub Heading..."
            className="field"
            value={data?.videoPage?.subHead}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="description">Description*</label>
          <textarea
            type="text"
            name="description"
            data-id="videoPage"
            data-nested=""
            placeholder="Description..."
            className="field"
            value={data?.videoPage?.description}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="embedLink">Video embed link*</label>
          <input
            type="text"
            name="embedLink"
            data-id="videoPage"
            data-nested=""
            placeholder="Video embed link..."
            className="field"
            value={data?.videoPage?.embedLink}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="url">Url*</label>
          <input
            type="text"
            name="url"
            data-id="videoPage"
            data-nested=""
            placeholder="Url..."
            className="field"
            value={data?.videoPage?.url}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2">
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

        <div className="col-span-2">
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

        <div className="col-span-2">
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

        <div className="col-span-6">
          <label>Background Image</label>
          <FileUploadBtn
            title="videoBackground"
            name="backgroundImage"
            dataId="videoPage"
            dataNested=""
            image={data?.videoPage?.backgroundImage}
            handleImage={handleImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Step2;
