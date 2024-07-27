import { CheckIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Eloading from "../../ELoading";

function LinkView({ name, url, id, userName, productLink }) {
  const [copySuccess, setCopySuccess] = useState("");

  const copyCodeToClipboard = (id) => {
    const el = document.getElementById(id);
    el.select();
    document.execCommand("copy");
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  return (
    <div className="linkInfo lg:flex items-center mb-6 bg-white p-4 rounded-md shadow-lg w-full">
      <div className="linkName mb-4 lg:mb-0">
        <p className="mb-2 uppercase text-gray-500 text-xs font-semibold">
          Link name:
        </p>
        <input
          type="text"
          className="field shadow-none rounded "
          defaultValue={name}
          disabled
        />
      </div>
      <div className="linkName lg:ml-8 flex-1 relative group mb-4 lg:mb-0">
        <p className="mb-2 uppercase text-gray-500 text-xs font-semibold">
          Url:
        </p>
        {userName ? (
          <input
            type="text"
            className="field shadow-none rounded"
            defaultValue={`${url}${!productLink ? userName : ""}`}
            readOnly
            id={id}
          />
        ) : (
          <Eloading />
        )}
        {copySuccess && (
          <span className="absolute bg-green-100 text-green-600 px-4 py-2 rounded right-0 top-0 text-lg font-semibold">
            Copied
          </span>
        )}
      </div>
      <div className="actions flex lg:ml-8 justify-center">
        <button
          className="focus:outline-none mr-3"
          onClick={() => copyCodeToClipboard(id)}
          title="Copy to clipboard"
        >
          {copySuccess ? (
            <CheckIcon className="w-6 h-6 text-green-500" />
          ) : (
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-gray-700 hover:text-gray-900" />
          )}
        </button>
      </div>
    </div>
  );
}

export default LinkView;
