import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { fetchWrapper } from "../../helpers";
import { useRouter } from "next/router";
import { BASE_URL } from "../../config";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";

export default function Modal({ open, setOpen, webinar }) {
  const router = useRouter();
  const asPath = router.asPath;
  const { slug } = router.query;

  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    refferedBy: "admin",
    language: "",
  });
  const [isLoading, setIsLoading] = useState();

  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    var urlParams = localStorage.getItem("urlParams");

    if (urlParams) {
      var referralId;

      if (asPath.indexOf("ref=") !== -1) {
        referralId = asPath.split("ref=");
      }

      if (urlParams && asPath.indexOf("ref=") === -1) {
        router.replace(`${asPath}?${urlParams}`);
        referralId = urlParams.split("ref=");
      } else {
        referralId = asPath.split("ref=");
      }
      setData({ ...data, referralId: referralId[1] });
    }
  }, [asPath]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      webinarId: webinar._id,
      webinarName: webinar.webinarName,
      name: data.name.toLowerCase(),
      email: data.email.toLowerCase(),
      phoneNumber: data.phoneNumber,
      refferedBy: data.refferedBy.toLowerCase(),
      language: data.language,
    };

    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}/webinar/registration`,
        body
      );
      const resJson = await res.json();

      setIsLoading(true);

      if (res.ok) {
        router.push(`/webinars/${slug}/watch/${data?.language}`);
        setIsLoading(false);
        setOpen(false);
      } else {
        console.log(resJson.message);
        setMessage(resJson.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
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
            <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-filter backdrop-blur-xl transition-opacity" />
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
                      className="text-2xl leading-6 font-bold text-gray-800 mb-4"
                    >
                      <span role="img" aria-label="Form">
                        📝{" "}
                      </span>{" "}
                      Register here
                    </Dialog.Title>
                    <p className="text-xs text-gray-600 mt-2">
                      Come hear from the world’s most successful DTC brand
                      founders, CEOs, and CMOs, as well as top industry
                      authorities and the brightest minds in ecommerce.
                    </p>
                    <div className="mt-4">
                      <form onSubmit={submitHandler}>
                        <div className="mb-6">
                          <label
                            htmlFor="name"
                            className="text-gray-800 font-bold mb-2 text-sm"
                          >
                            Name:
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your Name.."
                            className="field"
                            value={data?.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="text-gray-800 font-bold mb-2 text-sm"
                          >
                            Email Id:
                          </label>
                          <input
                            type="text"
                            name="email"
                            placeholder="Email.."
                            value={data?.email}
                            onChange={handleChange}
                            className="field"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="phone"
                            className="text-gray-800 font-bold mb-2 text-sm"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone number.."
                            className="field"
                            value={data?.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="language"
                            className="text-gray-800 font-bold mb-2 text-sm"
                          >
                            Language
                          </label>
                          <input
                            type="text"
                            name="language"
                            placeholder="Language"
                            className="field"
                            value={data?.language}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="refferedBy"
                            className="text-gray-800 font-bold mb-2 text-sm"
                          >
                            Referred By
                          </label>
                          <input
                            type="text"
                            name="refferedBy"
                            placeholder="Referal by.."
                            className="field"
                            value={data?.refferedBy}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="userBtn ml-4 font-semibold px-8 py-2"
                          >
                            {isLoading ? "Submtting..." : "Register"}
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
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
