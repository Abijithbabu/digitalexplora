import { Visibility, VisibilityOff } from "@mui/icons-material";
import Router from "next/router";
import { useRef, useState } from "react";
import { BASE_URL } from "../../../config";
import { fetchWrapper } from "../../../helpers";
import { useSelector } from "react-redux";

function Resetpassword() {
  const { user } = useSelector((state) => state.auth);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    cmPassword: "",
  });
  const [values, setValues] = useState({
    showOldPassword: false,
    showNewPassword: false,
    showCmPassword: false,
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const oldPasswordInput = useRef();
  const newPasswordInput = useRef();
  const cmPasswordInput = useRef();

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
      alert("!New password and confirm password must match");
      return;
    } else {
      const body = {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        id: user._id,
      };

      setSubmitting(true);

      try {
        const response = await fetchWrapper.patch(
          `${BASE_URL}/user/changepassword`,
          body
        );
        const resJson = await response.json();
        if (response.ok) {
          console.log(resJson.message);
          alert("Password changed successfully. Login again!");
          localStorage.removeItem("deToken");
          Router.push("/login");

          setSubmitting(false);
        } else {
          console.log(resJson.message);
          alert("Something went wrong");

          setSubmitting(false);
        }
      } catch (error) {
        setSubmitting(false);
        console.log(error);
      }
    }

    setPassword({
      oldPassword: "",
      newPassword: "",
      cmPassword: "",
    });
  };

  return (
    <div className="max-w-md p-6 mx-auto">
      <div className="card">
        <h2 className="text-xl text-gray-500 font-bold mb-4">
          Change Password
        </h2>
        <hr />
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label>Old Password:</label>
            <input
              type={values.showOldPassword ? "text" : "password"}
              className="field"
              name="oldPassword"
              ref={oldPasswordInput}
              onChange={handleChange}
              placeholder="Enter new password..."
            />
            <span
              className="text-gray-400 hover:text-gray-600 absolute cursor-pointer top-9 right-5"
              onClick={() => {
                changeType(oldPasswordInput);
              }}
            >
              {values.showOldPassword ? (
                <VisibilityOff fontSize="small" title="Hide password" />
              ) : (
                <Visibility fontSize="small" title="Show password" />
              )}
            </span>
          </div>

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
  );
}

export default Resetpassword;
