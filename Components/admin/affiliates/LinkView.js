import { Switch } from "@headlessui/react";
import { CheckIcon, ClipboardDocumentCheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Save } from "@mui/icons-material";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { BASE_URL } from "@/config";
import { affiliateRequests } from "@/config/requests";
import { fetchWrapper } from "@/helpers";
import useLinks from "@/hooks/useLinks";
import { actionCreators } from "@/store";

function LinkView({
  name,
  url,
  id,
  handleUpdate,
  description,
  productId,
  isProductLink,
  updateProduct,
  fetchProducts,
  fetchGeneralLinks,
  isEnable,
}) {
  const [enabled, setEnabled] = useState(isEnable);
  const [copySuccess, setCopySuccess] = useState("");
  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  const nameRef = useRef();
  const urlRef = useRef();

  const copyCodeToClipboard = (id) => {
    const el = document.getElementById(id);
    el.select();
    document.execCommand("copy");
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  async function handlEnable(value, linkId, description) {
    setEnabled((prevState) => !prevState);

    if (!isProductLink) {
      const body = {
        affiliateName: nameRef.current.value,
        affiliateLink: urlRef.current.value,
        description: description,
        isEnable: value,
      };
      handleUpdate(linkId, body);
    } else {
      const body = {
        _id: linkId,
        affiliateName: nameRef.current.value,
        affiliateLinks: urlRef.current.value,
        description: description,
        isEnable: value,
      };
      updateProduct(productId, body);
    }
  }

  async function handleDelete(url, body) {
    try {
      if (isProductLink) {
        const res = await fetchWrapper.patch(url, body);
        const resJson = await res.json();

        if (res.ok) {
          setMessage({ sc: "product link deleted successfully", er: "" });
          fetchProducts();
          console.log(resJson.message);
        } else {
          setMessage({ sc: "", er: resJson.message });
          console.log(resJson.message);
        }
      } else {
        const res = await fetchWrapper.patch(url);
        const resJson = await res.json();

        if (res.ok) {
          setMessage({ sc: "General link deleted successfully", er: "" });
          console.log(resJson.message);
          fetchGeneralLinks();
        } else {
          setMessage({ sc: "", er: resJson.message });
          console.log(resJson.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  }

  function onDelete(linkId) {
    if (!isProductLink) {
      handleDelete(
        `${BASE_URL}/${affiliateRequests.deleteGeneralLink}/${linkId}`
      );
    } else {
      const body = {
        _id: linkId,
      };
      handleDelete(
        `${BASE_URL}/${affiliateRequests.deleteProductLink}/${productId}`,
        body
      );
    }
  }

  function onUpdate(linkId, description) {
    if (!isProductLink) {
      const body = {
        affiliateName: nameRef.current.value,
        affiliateLink: urlRef.current.value,
        description: description,
      };
      handleUpdate(linkId, body);
    } else {
      const body = {
        _id: linkId,
        affiliateName: nameRef.current.value,
        affiliateLinks: urlRef.current.value,
        description: description,
        isEnable: enabled,
      };
      updateProduct(productId, body);
    }
  }

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
          ref={nameRef}
          required
        />
      </div>
      <div className="linkName lg:ml-8 flex-1 relative group mb-4 lg:mb-0">
        <p className="mb-2 uppercase text-gray-500 text-xs font-semibold">
          Url:
        </p>
        <input
          type="text"
          className="field shadow-none rounded"
          defaultValue={url}
          ref={urlRef}
          id={id}
        />
        {copySuccess && (
          <span className="absolute bg-green-100 text-green-500 px-2 py-1 rounded right-0 top-0">
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
        <button
          title="Save"
          className="focus:outline-none"
          onClick={() => onUpdate(id, description)}
        >
          <Save className="w-6 h-6 text-blue-400 mr-3 cursor-pointer hover:text-blue-600 transition-colors ease-in-out duration-300" />
        </button>
        <button
          title="Delete link"
          className="focus:outline-none"
          onClick={() => onDelete(id)}
        >
          <TrashIcon
            title="Delete"
            className="w-6 h-6 text-red-400 cursor-pointer hover:text-red-600 transition-colors ease-in-out duration-300 mr-3"
          />
        </button>
        <Switch
          title="Enable/Disable link"
          checked={enabled}
          onChange={(value) => handlEnable(value, id, description)}
          className={`${enabled ? "bg-green-500" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
    </div>
  );
}

export default LinkView;
