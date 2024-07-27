import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "../Components/landing/Navbar";
import styles from "../Components/LoginForm.module.css";
import { BASE_URL } from "../config";
import { userRequests } from "../config/requests";
import { fetchWrapper } from "../helpers";
import { Send } from "@mui/icons-material";

function forgotPassword() {
  const initialState = {
    email: "",
    isSubmitting: false,
    errorMessage: null,
    successMessage: null,
  };
  const [data, setData] = useState(initialState);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ ...data, isSubmitting: true });

    const body = {
      userName: data.email,
    };

    try {
      const res = await fetchWrapper.post(
        `${BASE_URL}${userRequests.resetPassword}`,
        body
      );
      const resJson = await res.json();

      if (res.ok) {
        setData({
          ...data,
          isSubmitting: false,
          successMessage:
            "A reset password link has been send to your email. Please check",
        });
      } else {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: resJson.message,
        });

        console.log(resJson);
      }
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: resJson.message,
      });

      console.log(error);
    }

    setTimeout(() => {
      setData({
        isSubmitting: false,
        errorMessage: "",
        successMessage: "",
      });
    }, 10000);
  };

  return (
    <>
      <Head>
        <title>Forgot password</title>
        <meta name="description" content="forgot password digital explora" />
        <meta name="keywords" content="digital explora, affiliate, kerala" />
        <meta name="author" content="Digital Explora" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href="https://www.digitalexplora.in/forgot-password"
        />
      </Head>

      <div className={styles.loginForm}>
        <Navbar transparent />
        <div className="max-w-xl mx-auto">
          <div className="px-10 md:px-14 py-14 flex items-center justify-center">
            <div className="w-full bg-white shadow-xl rounded-xl py-16 px-4 sm:px-6">
              <div className="text-center mb-2">
                <Link href="/">
                  <p className="text-3xl text-blue-600 font-bold" title="Home">
                    Digital Explora
                  </p>
                </Link>
                <h2 className="mt-2 text-center text-sm font-medium text-gray-900">
                  Forgot Password?
                </h2>
              </div>
              {data?.errorMessage && (
                <p className="form-error text-red-500 text-center">
                  {data?.errorMessage}
                </p>
              )}

              {data?.successMessage && (
                <p className="form-error text-green-500 text-center">
                  {data?.successMessage}
                </p>
              )}

              <form className="mt-6 px-8" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm">
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="font-semibold text-gray-600 text-sm"
                    >
                      Email:
                    </label>
                    <input
                      name="email"
                      type="email"
                      autoComplete="off"
                      onChange={handleChange}
                      className="field2"
                      placeholder="Enter your registered email..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div className="text-sm">
                    <Link href="/login">
                      <p className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                      </p>
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center py-3 px-6 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ease-in-out duration-300"
                    disabled={data?.isSubmitting}
                  >
                    {data.isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center justify-around">
                        <Send
                          className="h-5 w-5 text-blue-500 group-hover:text-blue-400 mr-3"
                          aria-hidden="true"
                        />
                        Submit
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default forgotPassword;
