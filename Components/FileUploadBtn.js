import ProgressBar from "./ProgressBar";

function FileUploadBtn({
  image,
  isLoading,
  handleImage,
  title,
  name,
  dataId,
  dataNested,
}) {
  function checkUrl(url) {
    if (!url) return null;
    return url.match(/\.(jpeg|jpg|gif|png|JPG)$/) != null;
  }

  return (
    <div className="flex w-full items-center justify-center bg-grey-lighter">
      {isLoading ? (
        <ProgressBar width="100%" value={isLoading} />
      ) : (
        <label
          className="w-full flex flex-col items-center px-4 py-5 bg-gray-50 text-gray-500 rounded-lg tracking-wide uppercase transition-all duration-300 ease-in-out border-2 border-dashed border-gray-500 cursor-pointer"
          htmlFor={`upload ${title}`}
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span
            className="leading-normal text-xs text-center"
            id="fileSelected"
          >
            {checkUrl(image) ? (
              <img
                src={image}
                alt={title + " image"}
                className="flex-1 w-full rounded"
              />
            ) : (
              `Select ${title} Image`
            )}
          </span>
          <input
            type="file"
            hidden
            name={name}
            accept="image/*"
            data-id={dataId ?? ""}
            data-nested={dataNested ?? ""}
            id={`upload ${title}`}
            onChange={handleImage}
          />
        </label>
      )}
    </div>
  );
}

export default FileUploadBtn;
