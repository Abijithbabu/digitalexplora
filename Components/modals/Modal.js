import React from "react";

function Modal({ children, close }) {
  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/3 mx-auto md:mt-20">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      <div
        className="opacity-60 fixed inset-0 z-40 bg-black"
        onClick={close}
      ></div>
    </>
  );
}

export default Modal;
