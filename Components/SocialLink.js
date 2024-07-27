import React from "react";

function SocialLink({ Icon, title, colSpan }) {
  return (
    <div
      className={`bg-white text-gray-800 mb-2 lg:mb-0 flex items-center col-span-${
        colSpan && colSpan
      }`}
    >
      <h3 className="text-gray-800 text-md font-semibold">
        <Icon fontSize="large" />
      </h3>
      <p className="ml-2 text-gray-500 text-sm font-medium">{title}</p>
    </div>
  );
}

export default SocialLink;
