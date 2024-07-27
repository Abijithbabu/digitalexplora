import Modal from "../modals/Modal";
import { createRef, useState } from "react";
import { useRouter } from "next/router";
import people from "../../people.json";
import { Close } from "@mui/icons-material";

export default function AadharModal(props) {
  const router = useRouter();
  const { id } = router.query;

  const person = people[id];
  if (!person) return <p></p>;

  const [frontImage, setfrontImage] = useState(person.aadharFront);
  const [backImage, setbackImage] = useState(person.aadharBack);

  const frontImageRef = createRef();
  const backImageRef = createRef();

  const handleFront = () => {
    setfrontImage(URL.createObjectURL(frontImageRef.current.files[0]));
  };
  const handleBack = () => {
    setbackImage(URL.createObjectURL(backImageRef.current.files[0]));
  };
  const handleForm = () => {
    alert("Form Saved");
    props.close;
  };
  return (
    <Modal>
      <div className="flex items-center justify-between">
        <div className="mb-2 text-gray-700 text-2xl">Edit Aadhar Details</div>
        <button
          className="text-sm text-gray-400 cursor-pointer"
          onClick={props.close}
        >
          <Close />
        </button>
      </div>
      <form action="#">
        <div className="mb-4">
          <label htmlFor="">Aadhar Number</label>
          <input
            type="text"
            placeholder="Enter Aadhar Number"
            defaultValue={person.aadharNumber}
            className="block rounded-md bg-gray-100 focus:outline-none w-full px-4 py-3 mt-2"
          />
        </div>
        <div className="mb-4">
          <img
            src={frontImage}
            alt="Pancard Front"
            width="180"
            className="mb-4"
          />
          <div className="flex w-full items-center justify-center bg-grey-lighter">
            <label
              className="w-full flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border-2 transition-all duration-300 ease-in-out border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
              htmlFor="pancardFront"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="leading-normal text-xs" id="fileSelected">
                Select Image
              </span>
              <input
                type="file"
                className="hidden"
                id="pancardFront"
                onChange={handleFront}
                ref={frontImageRef}
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <img
            src={backImage}
            alt="Pancard back"
            width="180"
            className="mb-4"
          />
          <div className="flex w-full items-center justify-center bg-grey-lighter">
            <label
              className="w-full flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border-2 transition-all duration-300 ease-in-out border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
              htmlFor="pancardBack"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="leading-normal text-xs" id="fileSelected">
                Select Image
              </span>
              <input
                type="file"
                className="hidden"
                id="pancardBack"
                onChange={handleBack}
                ref={backImageRef}
              />
            </label>
          </div>
        </div>
      </form>
      <div className="flex justify-center md:justify-end">
        <button
          className="bg-gray-200 text-gray-800 focus:outline-none px-4 py-2 rounded-md"
          onClick={props.close}
        >
          Close
        </button>
        <button
          className="bg-blue-600 text-white ml-2 focus:outline-none px-8 py-2 rounded-md"
          onClick={handleForm}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}