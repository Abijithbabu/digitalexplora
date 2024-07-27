import { useEffect, useState } from "react";
import MultiStepProgressBar from "./MultiStepProgressBar";
import { BASE_URL, COUNTRYAPIKEY } from "@/config";
import useFetchData from "@/hooks/useFetchData";
import { countryRequests, landingRequests } from "@/config/requests";
import { useRouter } from "next/router";
import { userService } from "@/services";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { fetchWrapper } from "@/helpers";
import Modal from "../Modal";

// form steps
import Step1 from "./Step1";
import Step2 from "./Step2";

const headers = new Headers();
headers.append("X-CSCAPI-KEY", COUNTRYAPIKEY);
const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

function CheckouForm() {
  const router = useRouter();
  const asPath = router.asPath;
  const { slug } = router.query;

  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { login, clearError } = bindActionCreators(actionCreators, dispatch);

  // fetching product data
  const { state: data } = useFetchData(landingRequests.PRODUCTS);

  const [loginModal, setLoginModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [state, setState] = useState({
    currentStep: 1,
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    number: "",
    referalId: "admin",
    password: "",
    address: "",
    province: "selectState",
    zipcode: "",
    country: "IN",
    terms: false,
  });
  const [message, setMessage] = useState({
    sc: "",
    er: "",
  });
  const [refMessage, setRefMessage] = useState({
    sc: "",
    er: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    var urlParams = localStorage.getItem("urlParams");
    var refId;

    if (asPath.indexOf("ref=") === -1) {
      return;
    }

    if (asPath.indexOf("ref=") !== -1) {
      refId = asPath.split("ref=");
    }

    if (urlParams && asPath.indexOf("ref=") === -1) {
      router.replace(`${asPath}?${urlParams}`);
      refId = urlParams.split("ref=");
    } else {
      refId = asPath.split("ref=");
    }

    setState({
      ...state,
      referalId: refId[1],
    });
  }, [asPath]);

  function handleChange(event) {
    const { name, value, type } = event.target;
    if (type !== "checkbox") {
      setState({
        ...state,
        [name]: value,
      });
    } else {
      setState({
        ...state,
        [name]: !state.terms,
      });
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    clearError();

    const user = {
      username: e.target.username.value.toLowerCase(),
      password: e.target.password.value,
    };

    login(user, handleClose);
  }

  const checkUserAvail = async () => {
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/user/search/${state.userName}`
      );
      const resJson = await res.json();

      if (res.ok) {
        console.log(resJson.message);
        setMessage({
          sc: resJson.message,
          er: "",
        });
        return true;
      } else {
        console.log(resJson.message);
        setMessage({
          sc: "",
          er: "User is already registered",
        });
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const checkRefId = async () => {
    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}/user/search/${state.referalId}`
      );
      const resJson = await res.json();

      if (res.ok) {
        setRefMessage({
          sc: "",
          er: "Please enter a referal ID",
        });
        return false;
      } else {
        setRefMessage({
          sc: "Referal found",
          er: "",
        });
        return true;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  function handleClose() {
    setLoginModal(false);
  }

  async function registerUser() {
    const isUsername = await checkUserAvail();
    const isRefer = await checkRefId();

    if (!isUsername) {
      setLoginModal(true);
      return;
    }

    if (isUsername && isRefer) {
      const body = {
        firstName: state.firstName,
        lastName: state.lastName,
        userName: state.userName.toLowerCase(),
        email: state.email,
        phoneNumber: state.number,
        referredBy: state.referalId,
        password: state.password,
      };

      setLoading(true);

      try {
        const res = await fetchWrapper.post(
          `${BASE_URL}${landingRequests.CHECKOUT_REG}`,
          body
        );
        const resJson = await res.json();

        if (res.ok) {
          localStorage.setItem("token", resJson.data.token);
          localStorage.setItem("user", JSON.stringify(resJson.data));

          setLoading(false);
          return true;
        } else {
          console.log(resJson.message);

          setMessage({ sc: "", er: resJson.message });
          setLoading(false);
          return false;
        }
      } catch (error) {
        console.log(error);

        setLoading(false);
        return false;
      }
    } else {
      setLoading(false);
      return false;
    }
  }

  async function _next(event) {
    event.preventDefault();

    const isRegistered = await registerUser();

    if (isRegistered) {
      let currentStep = state.currentStep;

      // If the current step is 1 or 2, then add one on "next" button click
      currentStep = currentStep >= 2 ? 3 : currentStep + 1;
      console.log(currentStep);
      setState({
        ...state,
        currentStep: currentStep,
      });
    }
  }

  async function submitUser(event) {
    event.preventDefault();

    const body = {
      address: `${state.address}, ${state.province}, ${state.country} `,
    };

    try {
      const res = await userService.update(user._id, body);
      const resJson = await res.json();

      if (res.ok) {
        console.log("Payment successfull!");
        router.push(`/checkout/${slug}/thankyou`);
      } else {
        console.log(resJson.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (state.userName === "") {
      setMessage({ sc: "", er: "" });
    }
  }, [state.userName]);

  useEffect(() => {
    useCountry();
  }, []);

  useEffect(() => {
    getState();
  }, [state.country]);

  function useCountry() {
    try {
      fetch(countryRequests.COUNTRY, requestOptions)
        .then((response) => response.json())
        .then((result) => setCountries(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }

  function getState() {
    try {
      fetch(
        `https://api.countrystatecity.in/v1/countries/${state.country}/states`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setProvinces(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={submitUser} className="py-4">
        <MultiStepProgressBar currentStep={state.currentStep} />

        {message.er && (
          <div className="fixed top-1/2 right-10 w-56 bg-red-100 border-2 border-red-600 text-red-600 font-semibold p-4 rounded-lg mb-4">
            {message.er}
          </div>
        )}

        <Step1
          state={state}
          handleChange={handleChange}
          refMessage={refMessage}
        />
        <Step2
          state={state}
          handleChange={handleChange}
          countries={countries}
          provinces={provinces}
          products={data?.data}
          setIsPaid={setIsPaid}
          isPaid={isPaid}
        />

        <div className="footer lg:flex items-center justify-between">
          {state.currentStep !== 1 && state.currentStep < 2 && (
            <button
              className="userBtn w-full mb-4 lg:mb-0 py-3 px-12 font-semibold"
              onClick={_prev}
            >
              Previous
            </button>
          )}

          {state.currentStep < 2 && (
            <button
              disabled={
                isLoading ||
                state.email === "" ||
                state.userName === "" ||
                state.phoneNumber
              }
              className="userBtn w-full py-3 px-12 font-semibold"
              onClick={_next}
            >
              {isLoading ? "User registering..." : "Next"}
            </button>
          )}
        </div>
      </form>

      {loginModal && (
        <Modal
          isOpen={loginModal}
          closeModal={handleClose}
          modalTitle="Login here!"
        >
          <form onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-100 text-red-500 border-2 border-red-500 p-2 text-center rounded mb-6">
                <p>{error}</p>
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="username">Email Id / Username</label>
              <input
                name="username"
                type="text"
                className={`field border border-transparent`}
                placeholder="Enter email or username..."
              />
            </div>
            <div className="mb-6">
              <label htmlFor="username">Password</label>
              <input
                name="password"
                type="text"
                className={`field border border-transparent`}
                placeholder="Enter username..."
              />
            </div>

            <button type="submit" className="userBtn w-full mb-4">
              Sign in
            </button>

            <Link href="/forgot-password">
              <p className="text-blue-500">Forgot password?</p>
            </Link>
          </form>
        </Modal>
      )}
    </>
  );
}

export default CheckouForm;
