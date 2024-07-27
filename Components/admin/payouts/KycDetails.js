import { BuildingOfficeIcon, IdentificationIcon } from "@heroicons/react/24/solid";

function KycDetails({ kyc }) {
  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="mb-4 col-span-2">
          <label className="text-xs">Bank Account No.</label>
          <h3 className="text-sm text-gray-600 font-bold">
            {kyc.bankAccount?.accountNo
              ? kyc.bankAccount.accountNo
              : "Not found"}
          </h3>
        </div>

        <div>
          <label className="text-xs">Bank Ifsc Code:</label>
          <h3 className="text-sm text-gray-600 font-bold flex items-center capitalize">
            {kyc.bankAccount?.ifsc ? kyc.bankAccount.ifsc : "Not found"}
          </h3>
        </div>

        <div>
          <label className="text-xs">Bank Name:</label>
          <h3 className="text-sm text-gray-600 font-bold flex items-center capitalize">
            <BuildingOfficeIcon className="mr-2 w-6 h-6 text-blue-600" />
            {kyc.bankAccount?.bankName ? kyc.bankAccount.bankName : "Not found"}
          </h3>
        </div>
      </div>

      <hr className="my-4" />

      {/* aadhar */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="col-span-2">
          <label className="text-xs">Aadhar Number</label>
          <h3 className="text-sm text-gray-600 font-bold">
            {kyc.aadharCard?.aadharNo ? kyc.aadharCard.aadharNo : "Not found"}
          </h3>
        </div>

        <div>
          <label className="text-xs">Aadhar front image:</label>
          <img
            src={
              kyc.aadharCard?.aadharFront.indexOf("http://") == 0 ||
              kyc.panCard?.panCardBack.indexOf("https://") == 0
                ? kyc.aadharCard?.aadharFront
                : "/img/no_image.jpg"
            }
            width="100%"
            className="rounded"
            alt="Aadhar front image"
          />
        </div>

        <div>
          <label className="text-xs">Aadhar back image:</label>
          <img
            src={
              kyc.aadharCard?.aadharBack.indexOf("http://") == 0 ||
              kyc.panCard?.panCardBack.indexOf("https://") == 0
                ? kyc.aadharCard?.aadharBack
                : "/img/no_image.jpg"
            }
            width="100%"
            className="rounded"
            alt="Aadhar back image"
          />
        </div>
      </div>

      <hr className="my-4" />

      {/* pancard */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="col-span-2">
          <label className="text-xs">Pancard Number</label>
          <h3 className="text-sm text-gray-600 font-bold">
            {kyc.panCard?.panNo}
          </h3>
        </div>

        <div>
          <label className="text-xs">Pancard front image:</label>
          <img
            src={
              kyc.panCard?.panCardFront.indexOf("http://") == 0 ||
              kyc.panCard?.panCardBack.indexOf("https://") == 0
                ? kyc.panCard?.panCardFront
                : "/img/no_image.jpg"
            }
            width="100%"
            className="rounded"
            alt="Pancard front image"
          />
        </div>

        <div>
          <label className="text-xs">Pancard back image:</label>
          <img
            src={
              kyc.panCard?.panCardBack.indexOf("http://") == 0 ||
              kyc.panCard?.panCardBack.indexOf("https://") == 0
                ? kyc.panCard?.panCardBack
                : "/img/no_image.jpg"
            }
            width="100%"
            className="rounded"
            alt="Pancard back image"
          />
        </div>
      </div>

      <hr className="my-4" />

      {/* license */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="col-span-2">
          <label className="text-xs">License Number</label>
          <h3 className="text-sm text-gray-600 font-bold">
            {kyc.drivingLicense?.licenseNo}
          </h3>
        </div>

        <div>
          <label className="text-xs">License front image:</label>
          <img
            src={
              kyc.drivingLicense?.licenseFront.indexOf("http://") == 0 ||
              kyc.drivingLicense?.licenseFront.indexOf("https://") == 0
                ? kyc.drivingLicense?.licenseFront
                : "/img/no_image.jpg"
            }
            width="100%"
            className="rounded"
            alt="License front image"
          />
        </div>

        <div>
          <label className="text-xs">License back image:</label>
          <img
            src={
              kyc.drivingLicense?.licenseBack.indexOf("http://") == 0 ||
              kyc.drivingLicense?.licenseBack.indexOf("https://") == 0
                ? kyc.drivingLicense?.licenseBack
                : "/img/no_image.jpg"
            }
            width="100%"
            className="rounded"
            alt="License back image"
          />
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <label className="text-xs">UPI Id:</label>
        <h3 className="text-sm text-gray-600 font-bold flex items-center">
          <IdentificationIcon className="mr-2 w-5 h-5 text-green-400" />
          {kyc?.upiId ?? "No UPI ID Found"}
        </h3>
      </div>
    </>
  );
}

export default KycDetails;
