import React from "react";

function Button({ text, Icon, handleClick }) {
  return (
    <button
      type="submit"
      onClick={handleClick}
      className="flex items-center md:ml-auto px-8 py-2 border font-medium border-transparent text-sm rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-2 mt-3 md:mt-0 focus:outline-none"
    >
      {Icon && (
        <span>
          <Icon />
        </span>
      )}
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default Button;
