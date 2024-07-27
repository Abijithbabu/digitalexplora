import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AWS_API_URL, BUCKET_URL } from "../../../config";
import { removeParam } from "../../../helpers/removeParams";
import useFetchAws from "../../../hooks/useFetchAws";
import { userService } from "../../../services";
import { actionCreators } from "../../../store";
import ProgressBar from "../../ProgressBar";

function ProfileSettings({ preloadedValues, getUser }) {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { setMessage, setUser } = bindActionCreators(actionCreators, dispatch);

  const [image, setImage] = useState({
    currentFile: preloadedValues?.profilePic ? preloadedValues?.profilePic : "",
    progress: 0,
  });
  const [dimensions, setDimensions] = useState({
    imgHeight: null,
    imgWidth: null,
  });
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues,
  });

  const onSelectFile = async (event) => {
    try {
      if (dimensions.imgHeight !== dimensions.imgWidth) {
        setImage({
          currentFile: null,
          progress: 0,
        });

        setMessage({ sc: "", er: "Image must be in 1:1 Aspect ratio" });

        setTimeout(() => {
          setMessage({ sc: "", er: "" });
        }, 2000);
      } else {
        const file = event.target.files[0];

        if (file) {
          const url = await useFetchAws(file, "profileImage");

          const options = {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              let percent = Math.floor((loaded * 100) / total);

              if (percent < 100) {
                setImage({ progress: percent });
              }
            },
          };

          await axios
            .put(url, file, options)
            .then(({ config }) => {
              const alteredUrl = removeParam("Content-Type", config.url);
              setImage({
                currentFile: alteredUrl,
                progress: 0,
              });
              setMessage({ sc: "Uploaded successfully", er: "" });
            })
            .catch((err) => {
              setMessage({ sc: "", er: "Something went wrong! Try again" });
              console.log(err);
            });
        } else {
          alert("No image selected...");
          return;
        }
      }
    } catch (error) {
      setImage({
        currentFile: null,
        progress: 0,
      });
      console.log(error);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 2000);
  };

  const onUpdate = async (data) => {
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      countryCode: data.countryCode,
      phoneNumber: data.phoneNumber,
      address: data.address,
      facebookUsername: data.facebookUsername,
      instagramUsername: data.instagramUsername,
      linkedInUsername: data.linkedInUsername,
      twitterUsername: data.twitterUsername,
      groupLink: data.groupLink,
      youtubeLink: data.youtubeLink,
      whatsappNumber: data.whatsappNumber,
      whatsappNumberCountryCode: data.whatsappNumberCountryCode,
    };

    if (body) {
      Object.assign(body, {
        profilePic: image.currentFile,
        profilePic_thumbnail: image.currentFile,
      });
    }

    setIsLoading(true);
    try {
      const res = await userService.update(id, body);
      const resJson = await res.json();

      if (res.ok) {
        getUser(id);
        setUser(resJson.data);
        setMessage({ sc: "User updated successfully", er: "" });
        console.log("updated successfully");
        setIsLoading(false);
      } else {
        setMessage({ sc: "", er: resJson.message });
        console.log(resJson.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 4000);
  };

  const onImgLoad = (event) => {
    setDimensions({
      ...dimensions,
      imgHeight: event.target.naturalHeight,
      imgWidth: event.target.naturalWidth,
    });
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)} className="py-6">
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-2 md:gap-4">
        <div className="leftCol bg-white rounded-lg shadow-xl p-8">
          <div className="mb-3">
            <div className="md:flex mb-4 items-center">
              <img
                onLoad={onImgLoad}
                src={
                  image.currentFile ? image.currentFile : "/img/no_image.jpg"
                }
                alt={preloadedValues.userName}
                className="w-24 h-24 mx-auto md:mx-0 rounded-full border border-gray-300"
              />
              <label
                className="text-blue-600 font-semibold text-center lg:text-left text-sm mx-4 cursor-pointer mt-3 md:mt-0 focus:outline-none mb-0"
                htmlFor="profileImage"
              >
                Add new Image
                <input
                  type="file"
                  hidden
                  accept="image/png, image/gif, image/jpeg"
                  onChange={onSelectFile}
                  id="profileImage"
                />
              </label>
              <button
                className="text-red-600 font-semibold text-sm cursor-pointer w-full md:w-auto text-center lg:text-left focus:outline-none mb-0"
                onClick={(e) => {
                  e.preventDefault();
                  setImage({
                    currentFile: "",
                    progress: 0,
                  });
                }}
              >
                Remove
              </button>
            </div>
            {image.progress > 0 && <ProgressBar value={image.progress} />}
          </div>
          <div className="mb-4">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="field"
              readOnly
              {...register("userName")}
            />
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="mb-4">
              <label htmlFor="firstName">First name:</label>
              <input type="text" className="field" {...register("firstName")} />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">Last name:</label>
              <input type="text" className="field" {...register("lastName")} />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email:</label>
              <input type="email" className="field" {...register("email")} />
            </div>
            <div className="mb-4">
              <label htmlFor="dob">DOB:</label>
              <input type="date" className="field" {...register("dob")} />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="number">Number with country code:</label>
            <div className="flex">
              <input
                type="text"
                className="field w-16"
                placeholder="+91"
                {...register("countryCode")}
              />
              <input
                type="tel"
                className="field flex-1"
                placeholder="9876543210"
                {...register("phoneNumber")}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address">Address:</label>
            <textarea
              {...register("address")}
              id="address"
              rows="4"
              className="field"
              placeholder="Enter your address..."
            ></textarea>
          </div>
        </div>

        <div className="middleCol bg-white rounded-lg shadow-xl p-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="mb-4">
              <label htmlFor="facebook">Facebook username:</label>
              <input
                type="text"
                className="field"
                {...register("facebookUsername")}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instagram">Instagram username:</label>
              <input
                type="text"
                className="field"
                {...register("instagramUsername")}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="linkedin">LinkedIn Username:</label>
              <input
                type="text"
                className="field"
                {...register("linkedInUsername")}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="twitter">Twitter Username:</label>
              <input
                type="text"
                className="field"
                {...register("twitterUsername")}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="group">Group Link:</label>
            <input type="text" className="field" {...register("groupLink")} />
          </div>
          <div className="mb-4">
            <label htmlFor="youtube">Youtube Link:</label>
            <input type="text" className="field" {...register("youtubeLink")} />
          </div>

          <div className="mb-6">
            <label htmlFor="whatsapp">Whatsapp Number:</label>
            <div className="flex">
              <input
                type="text"
                className="field w-16"
                placeholder="+91"
                {...register("whatsappNumberCountryCode")}
                required
              />
              <input
                type="tel"
                className="field flex-1"
                placeholder="9876543210"
                {...register("whatsappNumber")}
              />
            </div>
          </div>

          <div className="flex items-center">
            <button
              className={`userBtn ml-auto w-full ${
                isLoading && "animate-pulse"
              }`}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileSettings;
