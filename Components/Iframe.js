function Iframe({ src, id }) {
  if (!src) return <p>No lesson found</p>;
  return (
    <div className="video-container">
      <iframe
        width="100%"
        height="100%"
        id={id}
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; encrypted-media;"
        loading="lazy"
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
}

export default Iframe;
