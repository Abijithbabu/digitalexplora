import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useRef } from "react";

function LicenseViewModal({ showModal, setShowModal, kyc }) {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-50 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={showModal}
          onClose={() => setShowModal({ licenseModal: false })}
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
              <div className="fixed inset-0 bg-gray-700 bg-opacity-70 backdrop-filter backdrop-blur-xl transition-opacity" />
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
                    <div className="mt-3 text-center sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="flex items-center justify-between"
                      >
                        <span className="text-xl leading-6 font-bold text-gray-800 mb-4">
                          Driving License Details:
                        </span>

                        <button
                          className="text-gray-500 w-5 h-5 focus:outline-none"
                          onClick={() => setShowModal({ licenseModal: false })}
                          ref={cancelButtonRef}
                        >
                          <XMarkIcon />
                        </button>
                      </Dialog.Title>
                      {kyc ? (
                        <div className="mt-4">
                          <div className="mb-4">
                            <label htmlFor="">License No.</label>
                            <h3 className="text-xl text-gray-600 font-bold">
                              {kyc.drivingLicense.licenseNo}
                            </h3>
                          </div>
                          <div className="md:grid md:grid-cols-2 md:gap-4">
                            <div className="mb-4">
                              <label htmlFor="frontImage">Front View:</label>
                              <img
                                src={
                                  kyc.drivingLicense.licenseFront
                                    ? kyc.drivingLicense.licenseFront
                                    : "/img/no_image.jpg"
                                }
                                alt="License front"
                                className="w-full mb-3 rounded-md shadow-lg"
                              />
                            </div>
                            <div className="mb-4">
                              <label htmlFor="backImage">Back View:</label>
                              <img
                                src={
                                  kyc.drivingLicense.licenseBack
                                    ? kyc.drivingLicense.licenseBack
                                    : "/img/no_image.jpg"
                                }
                                alt="License back"
                                className="w-full mb-3 rounded-md shadow-lg"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        "No data found"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default LicenseViewModal;
