import { Visibility, VisibilityOff } from "@mui/icons-material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/landing/Navbar";
import styles from "../Components/LoginForm.module.css";
import { BASE_URL } from "../config";
import { fetchWrapper } from "../helpers";

function resetPassword() {
  const router = useRouter();
  const { token, userId } = router.query;

  const [password, setPassword] = useState({
    newPassword: "",
    cmPassword: "",
  });
  const [values, setValues] = useState({
    showNewPassword: false,
    showCmPassword: false,
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const newPasswordInput = useRef();
  const cmPasswordInput = useRef();

  useEffect(() => {
    if (token && userId) {
      localStorage.setItem("deToken", JSON.stringify(`Bearer ${token}`));
    }
  }, [token]);

  const changeType = ({ current }) => {
    if (current.name === "newPassword") {
      setValues({
        showNewPassword: !values.showNewPassword,
      });
    } else if (current.name === "cmPassword") {
      setValues({
        showCmPassword: !values.showCmPassword,
      });
    } else {
      setValues({
        showOldPassword: !values.showOldPassword,
      });
    }
  };

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setSubmitting(false);
    e.preventDefault();

    if (password.newPassword !== password.cmPassword) {
      alert("New password and confirm password must match!");
      return;
    } else {
      const body = {
        id: userId,
        newPassword: password.newPassword,
      };

      setSubmitting(true);

      try {
        const response = await fetchWrapper.patch(
          `${BASE_URL}/user/resetpassword`,
          body
        );
        const resJson = await response.json();
        if (response.ok) {
          setSubmitting(false);
          alert("Password changed successfully. Login again!");
          router.push("/login");
        } else {
          setSubmitting(false);
          console.log(resJson.message);
          alert("Something went wrong");
        }
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    }

    setPassword({
      newPassword: "",
      cmPassword: "",
    });
  };

  return (
    <>
      <Head>
        <title>Reset password</title>
        <meta name="description" content="forgot password digital explora" />
        <meta name="keywords" content="digital explora, affiliate, kerala" />
        <meta name="author" content="Digital Explora" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href="https://www.digitalexplora.in/reset-password"
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
                  Reset Password
                </h2>
              </div>

              <form className="mt-6 px-8" onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                  <label>New Password:</label>
                  <input
                    type={values.showNewPassword ? "text" : "password"}
                    className="field"
                    name="newPassword"
                    ref={newPasswordInput}
                    onChange={handleChange}
                    placeholder="Enter new password..."
                  />
                  <span
                    className="text-gray-400 hover:text-gray-600 absolute cursor-pointer top-9 right-5"
                    onClick={() => {
                      changeType(newPasswordInput);
                    }}
                  >
                    {values.showNewPassword ? (
                      <VisibilityOff fontSize="small" title="Hide password" />
                    ) : (
                      <Visibility fontSize="small" title="Show password" />
                    )}
                  </span>
                </div>

                <div className="mb-6 relative">
                  <label>Confirm Password:</label>
                  <input
                    type={values.showCmPassword ? "text" : "password"}
                    className="field"
                    name="cmPassword"
                    ref={cmPasswordInput}
                    onChange={handleChange}
                    placeholder="Confirm password..."
                  />
                  <span
                    className="text-gray-400 hover:text-gray-600 absolute cursor-pointer top-9 right-5"
                    onClick={() => {
                      changeType(cmPasswordInput);
                    }}
                  >
                    {values.showCmPassword ? (
                      <VisibilityOff fontSize="small" title="Hide password" />
                    ) : (
                      <Visibility fontSize="small" title="Show password" />
                    )}
                  </span>
                </div>

                <div className="mb-4">
                  <button disabled={isSubmitting} className="userBtn w-full">
                    {isSubmitting ? "Updating..." : "Change Password"}
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

export default resetPassword;
