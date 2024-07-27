import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import ProgressBar from "../ProgressBar";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import { AWS_API_URL, BASE_URL, BUCKET_URL } from "../../config";
import { userService } from "../../services/user.service";
import useFetchAws from "../../hooks/useFetchAws";
import { fetchWrapper } from "../../helpers";
import { Circles } from "react-loader-spinner";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import MultiSelect from "../MultiSelect";

const EditUserProfile = ({ preloadedValues, getUser }) => {
  const router = useRouter();
  const { userId } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(preloadedValues?.userName);
  const [checkUserLoading, setCheckLoading] = useState(false);
  const [isAvail, setAvail] = useState(null);
  const [products, setProducts] = useState([]);
  const [assignedProducts, setAssignedProducts] = useState([]);

  const dispatch = useDispatch();
  const { setMessage, setSingleUser } = bindActionCreators(
    actionCreators,
    dispatch
  );

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
        const url = await useFetchAws(file, "user");

        await axios
          .put(url, file, options)
          .then(({ config }) => {
            setImage({
              currentFile: config.url,
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

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 2000);
  };

  const onUpdate = async (data) => {
    if (isAvail === false) return alert("Username not available");
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      dob: data.dob,
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
      products: assignedProducts,
      isAmbassodor: data.isAmbassodor,
    };

    if (body) {
      Object.assign(body, {
        profilePic: image.currentFile,
        profilePic_thumbnail: image.currentFile,
      });
    }

    setIsLoading(true);
    try {
      const res = await userService.update(userId, body);
      const resJson = await res.json();

      if (res.ok) {
        getUser(userId);
        setSingleUser(resJson.data);
        setMessage({ sc: "User updated successfully", er: "" });
        setIsLoading(false);
      } else {
        console.log(resJson);
        setMessage({ sc: "", er: resJson.message });
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 2000);
  };

  const onImgLoad = (event) => {
    setDimensions({
      ...dimensions,
      imgHeight: event.target.naturalHeight,
      imgWidth: event.target.naturalWidth,
    });
  };

  async function handleChange({ target }) {
    setUsername(target.value);

    const checkUsername = await checkUserAvail(target.value);

    if (checkUsername) {
      console.log("Username is available");
    } else {
      console.log("Username is not available");
    }
  }

  const checkUserAvail = async (userName) => {
    setCheckLoading(true);
    setAvail(null);
    try {
      const res = await fetchWrapper.get(`${BASE_URL}/user/search/${userName}`);
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        setCheckLoading(false);
        setAvail(true);
        return true;
      } else {
        console.log(resJson.message);
        setCheckLoading(false);
        setAvail(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setCheckLoading(false);
      setAvail(null);
      return false;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // get course list for select box
  async function getProducts() {
    const res = await fetchWrapper.get(`${BASE_URL}/product/`);
    const resJson = await res.json();

    try {
      if (res.ok) {
        setProducts(resJson.data.products);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const defaultValues = preloadedValues?.products?.map((item) => ({
    value: item._id,
    label: item.label,
  }));

  const options = products?.map((item) => ({
    value: item._id,
    label: item.productName,
  }));

  const handleSelect = (values) => {
    setAssignedProducts(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onUpdate)}>
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
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="mb-3">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  className="field"
                  {...register("firstName")}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  className="field"
                  {...register("lastName")}
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="field lowercase"
                value={username}
                onChange={handleChange}
              />

              {checkUserLoading && (
                <Circles
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  color="#2d87c8"
                  height={50}
                  width={50}
                  className="absolute top-6 right-0"
                />
              )}

              {isAvail ? (
                <CheckCircleIcon className="w-6 h-6 absolute top-9 right-3 text-green-500" />
              ) : (
                isAvail !== null && (
                  <XCircleIcon className="w-6 h-6 absolute top-9 right-3 text-red-500" />
                )
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="name">Email:</label>
              <input type="email" className="field" {...register("email")} />
            </div>
            <div className="mb-4">
              <label htmlFor="dob">Date of birth:</label>
              <input type="date" className="field" {...register("dob")} />
            </div>
            <div className="mb-4">
              <label htmlFor="number">Number:</label>
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

            <div className="mb-6">
              <label htmlFor="courses">Assign Products:</label>
              {products?.length > 0 ? (
                <MultiSelect
                  options={options}
                  defaultValue={defaultValues}
                  handleSelect={handleSelect}
                />
              ) : (
                <p>No product found</p>
              )}
            </div>
          </div>
          <div className="middleCol bg-white rounded-lg shadow-xl p-8">
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
              <label htmlFor="group">Facebook Group Link:</label>
              <input type="text" className="field" {...register("groupLink")} />
            </div>
            <div className="mb-4">
              <label htmlFor="youtube">Youtube Link:</label>
              <input
                type="text"
                className="field"
                {...register("youtubeLink")}
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

            <div className="mb-6">
              <label htmlFor="whatsapp">Whatsapp Number:</label>
              <div className="flex">
                <input
                  type="text"
                  className="field w-16"
                  placeholder="+91"
                  {...register("whatsappNumberCountryCode")}
                />
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  className="field flex-1"
                  placeholder="9876543210"
                  {...register("whatsappNumber")}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="cursor-pointer flex items-center justify-between">
                Is Ambassodor:
                <input
                  type="checkbox"
                  {...register("isAmbassodor")}
                  className="form-checkbox cursor-pointer w-6 h-6 rounded-md mr-2 bg-gray-200"
                />
              </label>
            </div>

            <div className="flex items-center">
              <button
                className={`userBtn ml-auto w-full ${isLoading && "animate-pulse"
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
    </>
  );
};

export default EditUserProfile;
