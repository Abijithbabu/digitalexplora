import { CreditCard } from "@mui/icons-material";
import { BUCKET_URL } from "../config";

function KycItem({
  title,
  frontImage,
  name,
  backImage,
  bank,
  passbook,
  onSelectFile,
  removeImage,
  handleChange,
  value,
}) {
  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-md p-6 shadow-xl">
      {!bank && (
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <h3 className="text-base text-gray-900 font-bold text-center uppercase col-span-2">
            {title} Details:
          </h3>
          <div className="frontImage">
            <img
              src={
                frontImage.indexOf(BUCKET_URL) !== -1
                  ? frontImage
                  : "/img/no_image.jpg"
              }
              alt={title}
              className="w-full rounded mb-4"
            />
            <div className="flex items-center">
              <label
                htmlFor={`frontImage_${title}`}
                className="text-blue-600 text-sm cursor-pointer mb-0"
              >
                Add new Image
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={onSelectFile}
                  id={`frontImage_${title}`}
                  name={title}
                  className="hidden"
                />
              </label>

              <button
                className="text-red-600 ml-4 focus:outline-none"
                id={`frontBtn_${title}`}
                name={title}
                onClick={removeImage}
              >
                Remove
              </button>
            </div>
          </div>

          <div className="backImage">
            <img
              src={
                backImage.indexOf(BUCKET_URL) !== -1
                  ? backImage
                  : "/img/no_image.jpg"
              }
              alt={title}
              className="w-full rounded mb-4"
            />
            <div className="flex items-center">
              <label
                htmlFor={`backImage_${title}`}
                className="text-blue-600 text-sm cursor-pointer mb-0"
              >
                Add new Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  id={`backImage_${title}`}
                  name={title}
                  className="hidden"
                />
              </label>
              <button
                className="text-red-600 ml-4 focus:outline-none"
                name={title}
                id={`backBtn_${title}`}
                onClick={removeImage}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {bank ? (
        <>
          <h3 className="text-base text-gray-900 font-bold mb-4 text-center uppercase">
            Bank Details
          </h3>

          <label className="capitalize">Bank statement:</label>
          <div className="passbook flex items-center">
            <CreditCard />
            <p className="text-sm text-gray-900 ml-3">
              {passbook.bankStatementName
                ? passbook.bankStatementName
                : "Upload your Bank statement"}
            </p>
            <label
              htmlFor="passbook"
              className="text-blue-600 text-sm cursor-pointer ml-auto"
            >
              Browse
              <input
                type="file"
                accept="application/pdf"
                onChange={onSelectFile}
                id="passbook"
                name="passbook"
                hidden
              />
            </label>
          </div>

          <div className="number mt-4">
            <label className="capitalize">Account number:</label>
            <input
              type="text"
              value={value}
              className="field"
              onChange={handleChange}
              name="passbook"
              placeholder="Enter your account number"
            />
          </div>

          <div className="bankName mt-4">
            <label className="capitalize">Bank Name:</label>
            <input
              type="text"
              value={passbook.bankName}
              className="field"
              onChange={handleChange}
              id="bank"
              name="bankName"
              placeholder="Enter your bank name..."
            />
          </div>

          <div className="bankName mt-4">
            <label className="capitalize">IFSC Code:</label>
            <input
              type="text"
              value={passbook.ifsc}
              className="field"
              onChange={handleChange}
              id="bank"
              name="ifsc"
              placeholder="Enter your ifsc code..."
            />
          </div>
        </>
      ) : (
        <div className="number mt-4">
          <label className="capitalize">{`${title} number`}:</label>
          <input
            type="text"
            value={value}
            className="field"
            onChange={handleChange}
            name={name}
            placeholder={`Enter your ${title} number`}
          />
        </div>
      )}
    </div>
  );
}

export default KycItem;
