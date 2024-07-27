import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

function Step3({
  currentStep,
  handleChange,
  data,
  addInput,
  arr,
  handleLanguage,
  handleLangDelete,
}) {
  if (currentStep !== 3) {
    return null;
  }
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-center mb-4">
        Settings <span className="text-blue-500">(Step 3)</span>
      </h3>

      <div className="bg-gray-100 p-10">
        <div className="mb-4">
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

        <div className="mb-4">
          <label htmlFor="url">Webinar Link*</label>
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

        <div className="mb-4">
          <div className="flex my-4">
            <h3 className="font-bold">Add languages*</h3>
            <button className="ml-auto focus:outline-none" onClick={addInput}>
              <PlusCircleIcon className="w-8 h-8 p-1 bg-gray-50 border border-gray-400 text-gray-400 hover:text-blue-500 rounded" />
            </button>
          </div>
          {arr.map((item, i) => (
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
      </div>
    </div>
  );
}

export default Step3;
