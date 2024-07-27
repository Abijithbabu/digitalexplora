import React from "react";

function Speaker({ speaker }) {
  return (
    <div className="mt-4 text-center speaker rounded-lg shadow-lg md:rounded-none md:shadow-none">
      <img
        src={speaker.image}
        alt={speaker.fullName}
        width="100%"
        height="auto"
      />
      <h3 className="text-gray-900 font-bold mt-4">{speaker.fullName}</h3>
      <p className="text-gray-400 mb-4">{speaker.designation}</p>
      <img
        src={speaker.logo}
        alt={speaker.fullName}
        width="100%"
        height="auto"
      />
    </div>
  );
}

export default Speaker;
