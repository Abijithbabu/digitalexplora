import ProductForm from "../ProductForm";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import { productService } from "../../services";

function productModal({
  showModal,
  setShowModal,
  getAllProducts,
  skip,
  limit,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);
  const cancelButtonRef = useRef(null);

  async function onAddProduct(enteredProductdata) {
    setIsLoading(true);

    try {
      const res = await productService.create(enteredProductdata);
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        setMessage({ sc: resJson.message, er: "" });
        getAllProducts(skip, limit);
        setIsLoading(false);
        setShowModal(false);
      } else {
        console.log(resJson.message);
        setIsLoading(false);
        setMessage({ er: resJson.message, sc: "" });
      }
    } catch (error) {
      console.log(error.message);
      setMessage({ sc: "", er: error.message });
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage({ er: "", sc: "" });
    }, 3000);
  }
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-50 inset-0 overflow-y-auto"
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
            <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-xl transition-opacity" />
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                        Add new product
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
                      <ProductForm
                        isLoading={isLoading}
                        onAddProduct={onAddProduct}
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

export default productModal;
