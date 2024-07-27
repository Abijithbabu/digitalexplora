import UserForm from "../user/UserForm";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { BASE_URL } from "@/config";
import { fetchWrapper } from "@/helpers";
import { XMarkIcon } from "@heroicons/react/24/solid";

function UserModal({ showModal, setShowModal }) {
  const cancelButtonRef = useRef(null);
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const CheckUserAvail = async (enteredUserData) => {
    const { userName } = enteredUserData;
    const res = await fetchWrapper.get(`${BASE_URL}/user/search/${userName}`);
    const resJson = await res.json();

    if (res.ok) {
      console.log(resJson);
      submitUser(enteredUserData);
    } else {
      console.log(resJson);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return;
    }
  };

  const addNewUser = async (enteredUserData) => {
    CheckUserAvail(enteredUserData);
  };

  const submitUser = async (enteredUserData) => {
    setSubmitting(false);
    try {
      setSubmitting(true);

      const res = await fetchWrapper.post(
        `${BASE_URL}/user/create`,
        enteredUserData
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        router.push(
          `/admin/users/${resJson.data._id}?=${resJson.data.userName}`
        );
        setSubmitting(false);
      } else {
        console.log(resJson.message);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

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
                        <span role="img" aria-label="Form">
                          📝{" "}
                        </span>{" "}
                        Add new user
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
                      <UserForm
                        addNewUser={addNewUser}
                        isSubmitting={isSubmitting}
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

export default UserModal;
