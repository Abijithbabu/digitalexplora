import React from "react";
const Video = ({ videoSrcURL, videoTitle }) => (
  <div className="rounded shadow-xl overflow-hidden">
    <iframe
      src={videoSrcURL}
      width="100%"
      height="400"
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
);
export default Video;
