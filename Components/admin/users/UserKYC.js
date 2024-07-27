import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { BUCKET_URL, AWS_API_URL, BASE_URL } from "@/config";
import { SaveAltOutlined } from "@mui/icons-material";
import KycItem from "@/Components/KycItem";
import { fetchWrapper } from "@/helpers";

function UserKYC({ preloadedValues, getKyc }) {
  const router = useRouter();
  const { userId } = router.query;
  const dispatch = useDispatch();
  const { setLoading, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [isUpdating, setUpdating] = useState(false);

  const bank = preloadedValues?.bankAccount;
  const aadhar = preloadedValues?.aadharCard;
  const panCard = preloadedValues?.panCard;
  const license = preloadedValues?.drivingLicense;
  const upiId = preloadedValues?.upiId;

  const [kyc, setKyc] = useState({
    passbook: {
      title: "bank account",
      bankName: bank?.bankName ? bank?.bankName : "",
      bankStatement: bank?.bankStatement ? bank?.bankStatement : "",
      bankStatementName: bank?.bankStatementName ? bank?.bankStatementName : "",
      number: bank?.accountNo ? bank?.accountNo : "",
      ifsc: bank?.ifsc ? bank?.ifsc : "",
    },
    upiId: upiId ? upiId : "",
    aadhar: {
      title: "aadhar",
      frontImage: aadhar?.aadharFront ? aadhar?.aadharFront : "",
      backImage: aadhar?.aadharBack ? aadhar?.aadharBack : "",
      number: aadhar?.aadharNo ? aadhar?.aadharNo : "",
    },
    pancard: {
      title: "pancard",
      frontImage: panCard?.panCardFront ? panCard?.panCardFront : "",
      backImage: panCard?.panCardBack ? panCard?.panCardBack : "",
      number: panCard?.panNo ? panCard?.panNo : "",
    },
    license: {
      title: "license",
      frontImage: license?.licenseFront ? license?.licenseFront : "",
      backImage: license?.licenseBack ? license?.licenseBack : "",
      number: license?.licenseNo ? license?.licenseNo : "",
    },
  });

  const uploadToS3 = async (name, file, id) => {
    let data = new FormData();
    data.append("file", file);
    const response = await fetch(AWS_API_URL.KYC, {
      method: "POST",
      body: JSON.stringify({
        id: userId,
        type: file.type,
        name: file.name,
        folder: name,
        subFolder: id,
      }),
    });
    const { url } = await response.json();

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          setLoading(percent);
        }
        setLoading(percent);
      },
    };

    return await axios.put(url, file, options);
  };

  const onSelectFile = async ({ target: { name, id, files } }) => {
    const file = files[0];
    if (!file) {
      alert("Select a file");
      return;
    }
    if (id === "passbook") {
      const data = await uploadToS3(name, file, id);

      if (data.status === 200) {
        setKyc({
          ...kyc,
          [name]: {
            ...kyc[name],
            bankStatement: data.config.url,
            bankStatementName: data.config.data.name,
          },
        });
        setLoading(0);
        setMessage({
          sc: "Uploaded successfully",
        });
      } else {
        setMessage({
          er: "Something went wrong! Try again",
        });
      }

      setTimeout(() => {
        setMessage({
          sc: "",
          er: "",
        });
      }, 3000);
    } else if (id.indexOf("frontImage") === 0) {
      const data = await uploadToS3(name, file, id);

      if (data.status === 200) {
        setKyc({
          ...kyc,
          [name]: {
            ...kyc[name],
            frontImage: `${BUCKET_URL}/users/${userId}/kyc/${name}/${id}/${file.name}`,
          },
        });
        setLoading(0);
        setMessage({ sc: "Uploaded successfully" });
      } else {
        setMessage({ er: "Something went wrong! Try again" });
      }

      setTimeout(() => {
        setMessage({
          sc: "",
          er: "",
        });
      }, 3000);
    } else if (id.indexOf("backImage") === 0) {
      const data = await uploadToS3(name, file, id);

      if (data.status === 200) {
        setKyc({
          ...kyc,
          [name]: {
            ...kyc[name],
            backImage: `${BUCKET_URL}/users/${userId}/kyc/${name}/${id}/${file.name}`,
          },
        });
        setLoading(0);
        setMessage({ sc: "Uploaded successfully" });
      } else {
        setMessage({ er: "Something went wrong! Try again" });
      }

      setTimeout(() => {
        setMessage({
          sc: "",
          er: "",
        });
      }, 3000);
    }
  };

  const handleChange = ({ target: { name, value, id } }) => {
    if (id === "bank") {
      setKyc({
        ...kyc,
        ["passbook"]: {
          ...kyc["passbook"],
          [name]: value,
        },
      });
    } else if (name === "upiId") {
      setKyc({
        ...kyc,
        upiId: value,
      });
    } else {
      setKyc({
        ...kyc,
        [name]: {
          ...kyc[name],
          number: value,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      bankAccount: {
        bankName: kyc.passbook.bankName,
        bankStatement: kyc.passbook.bankStatement,
        bankStatementName: kyc.passbook.bankStatementName,
        accountNo: kyc.passbook.number,
        ifsc: kyc.passbook.ifsc,
      },
      aadharCard: {
        aadharFront: kyc.aadhar.frontImage,
        aadharBack: kyc.aadhar.backImage,
        aadharNo: kyc.aadhar.number,
      },
      panCard: {
        panCardFront: kyc.pancard.frontImage,
        panCardBack: kyc.pancard.backImage,
        panNo: kyc.pancard.number,
      },
      drivingLicense: {
        licenseFront: kyc.license.frontImage,
        licenseBack: kyc.license.backImage,
        licenseNo: kyc.license.number,
      },
      upiId: kyc.upiId,
    };

    setUpdating(true);

    try {
      const res = await fetchWrapper.put(
        `${BASE_URL}/user/${userId}/kyc`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        getKyc(userId);
        setMessage({ sc: "KYC updated succssfully" });
        setUpdating(false);
      } else {
        setMessage({ er: resJson.message });

        setUpdating(false);
      }
    } catch (err) {
      setMessage({ er: err });
      console.log(err);

      setUpdating(false);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  };

  const removeImage = (event) => {
    event.preventDefault();
    const btnId = event.target.id;
    const name = event.target.name;
    console.log(btnId, name);
    if (btnId.indexOf("frontBtn") === 0) {
      setKyc({
        ...kyc,
        [name]: {
          ...kyc[name],
          frontImage: "",
          previewFrontImage: "",
        },
      });
      setLoading(0);
    } else if (btnId.indexOf("backBtn") === 0) {
      setKyc({
        ...kyc,
        [name]: {
          ...kyc[name],
          backImage: "",
          previewBackImage: "",
        },
      });
      setLoading(0);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between my-6">
        <h3 className="text-gray-800 text-lg font-bold">
          Submit your KYC documents
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          <KycItem
            name="passbook"
            title="Bank Account"
            bank={true}
            onSelectFile={onSelectFile}
            handleChange={handleChange}
            removeImage={removeImage}
            passbook={kyc.passbook}
            number={kyc.passbook.number}
            value={kyc.passbook.number}
          />

          <KycItem
            name="aadhar"
            title="aadhar"
            frontImage={kyc.aadhar.frontImage}
            backImage={kyc.aadhar.backImage}
            number={kyc.aadhar.number}
            onSelectFile={onSelectFile}
            handleChange={handleChange}
            removeImage={removeImage}
            value={kyc.aadhar.number}
          />
          <KycItem
            name="pancard"
            title="pancard"
            frontImage={kyc.pancard.frontImage}
            backImage={kyc.pancard.backImage}
            number={kyc.pancard.number}
            onSelectFile={onSelectFile}
            handleChange={handleChange}
            removeImage={removeImage}
            value={kyc.pancard.number}
          />

          <KycItem
            name="license"
            title="license"
            frontImage={kyc.license.frontImage}
            backImage={kyc.license.backImage}
            number={kyc.license.number}
            onSelectFile={onSelectFile}
            handleChange={handleChange}
            removeImage={removeImage}
            value={kyc.license.number}
          />

          <div className="mb-6 lg:mb-0 bg-white border border-gray-200 rounded-md p-6 shadow-xl">
            <h3 className="text-base text-gray-900 font-bold text-center uppercase col-span-2">
              UPI Details:
            </h3>

            <div className="mt-4">
              <label className="capitalize">UPI ID:</label>
              <input
                type="text"
                value={kyc.upiId}
                className="field"
                onChange={handleChange}
                name="upiId"
                placeholder="Enter UPI ID"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="userBtn cursor-pointer mt-5 py-3 w-full"
        >
          {isUpdating ? (
            "Updating..."
          ) : (
            <>
              <SaveAltOutlined className="w-5 h-5" /> Update
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default UserKYC;
