import WebinarForm from "./WebinarForm";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/index";
import { fetchWrapper } from "../../../helpers";
// import { BASE_URL } from "../../../config";
const BASE_URL = "http://localhost:5000";


function AddWebinarModal({ showModal, setShowModal, skip, limit }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { setMessage, fetchAllWebinars } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const cancelButtonRef = useRef(null);

  const userIdFetch = false;

  async function onAddWebinar(enteredWebinarData) {
    setIsLoading(true);

    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}/webinar/create-webinar`,
        enteredWebinarData
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        setMessage({ sc: resJson.message, er: "" });
        fetchAllWebinars(skip, limit);
        setIsLoading(false);
        setShowModal(false);
      } else {
        console.log(resJson.message);
        setIsLoading(false);
        setMessage({ er: resJson.message, sc: "" });
      }
    } catch (error) {
      console.log(error.message);
      setMessage({ er: error.message, sc: "" });
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage({ er: "", sc: "" });
    }, 5000);
  }

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 left-0 top-0 overflow-y-auto w-full h-full"
        initialFocus={cancelButtonRef}
        open={showModal}
        onClose={setShowModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed left-0 top-0 bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-xl transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:align-middle w-full h-screen">
              <div className="bg-white px-4 pt-5 pb-4 sm:pt-8 sm:pb-4 sm:px-10">
                <div>
                  <div className="my-3 text-center sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between"
                    >
                      <span className="text-xl leading-6 font-bold text-gray-800">
                        <span role="img" aria-label="Form">
                          📝{" "}
                        </span>{" "}
                        Add webinar page
                      </span>

                      <button
                        className="text-gray-500 w-5 h-5 focus:outline-none"
                        onClick={() => setShowModal(false)}
                        ref={cancelButtonRef}
                      >
                        <XMarkIcon />
                      </button>
                    </Dialog.Title>
                    <div className="mt-4">
                      <WebinarForm
                        isLoading={isLoading}
                        onAddWebinar={onAddWebinar}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddWebinarModal;
