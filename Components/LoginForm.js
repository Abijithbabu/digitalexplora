import { useState, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./LoginForm.module.css";
import { useEffect } from "react";
import Router from "next/router";
import { BASE_URL } from "@/config";
import { fetchWrapper } from "@/helpers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { actionCreators } from "@/store";
import Navbar from "./landing/Navbar";

function LoginForm() {
  const auth = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const passwordInput = useRef();

  const dispatch = useDispatch();
  const { login, isUserLoggedIn } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      isUserLoggedIn();

      if (auth.isAuthenticated) {
        if (user._id) {
          const res = await fetchWrapper.get(`${BASE_URL}/user/${user._id}`);
          const resJSon = await res.json();

          const data = resJSon.data;

          if (data.isAdmin) {
            Router.push("/admin");
          } else if (!data.isAdmin) {
            Router.push("/user");
          }
        }
      }
    }
    fetchData()
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (auth.error) {
      setError(auth.error);
    }
  }, [auth.error]);

  useEffect(() => {
    if (data.username === "" || data.password === "" || data.isSubmitting) {
      setError("");
    }
  }, [data.username, data.password]);

  const changeType = ({ current }) => {
    if (current) {
      setShowPassword(!showPassword);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { username: data.username, password: data.password };

    login(user);
  };

  return (
    <div className={styles.loginForm}>
      <Navbar transparent />
      <div className="py-14 w-80 mx-auto">
        <div className="bg-white rounded-xl p-8 w-full">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-700 text-center">
              Sign in
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-xs border-2 px-4 py-2 rounded-lg font-semibold border-red-500">
              <p className="text-center">{error}</p>
            </div>
          )}

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username">Email Id</label>
              <input
                name="username"
                type="text"
                className={`field border border-transparent ${error && "border border-red-500"
                  }`}
                placeholder="Enter username..."
                value={data.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                ref={passwordInput}
                className={`field border border-transparent ${error && "border border-red-500"
                  }`}
                placeholder="Enter Password..."
                value={data.password}
                onChange={handleChange}
              />

              <span
                className="text-gray-400 hover:text-gray-600 absolute cursor-pointer top-9 right-5"
                onClick={() => {
                  changeType(passwordInput);
                }}
              >
                {showPassword ? (
                  <Visibility fontSize="small" title="Show password" />
                ) : (
                  <VisibilityOff fontSize="small" title="Hide password" />
                )}
              </span>
            </div>

            <div className="flex items-center justify-between mt-10">
              <button
                type="submit"
                className="userBtn py-2 w-full"
                disabled={auth.authenticating}
              >
                {auth.authenticating ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>

        <div className="text-sm mt-4 flex items-center justify-between">
          <Link href="/forgot-password">
            <p className="font-medium text-white opacity-50 hover:opacity-100 cursor-pointer">
              Forgot password?
            </p>
          </Link>
          <Link href="/">
            <p className="font-medium text-white opacity-50 hover:opacity-100 cursor-pointer">
              Back to Home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
