import { BadgeCheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";

function thankyou() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isUserLoggedIn } = bindActionCreators(actionCreators, dispatch);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    isUserLoggedIn();

    const warningMessage = JSON.parse(localStorage.getItem("warningMessage"));

    setWarningMessage(warningMessage);
  }, []);

  function handleAccess() {
    localStorage.removeItem("warningMessage");
  }

  if (!user) return <p>You are not logged in..</p>;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-xl mx-auto">
        <p>
          <BadgeCheckIcon className="w-14 h-14 animate-bounce text-green-500 mx-auto" />
        </p>
        <h3 className="text-center text-gray-800 text-3xl font-bold my-5">
          🎊 Thanks for purchasing! 🎉
        </h3>
        <p className="text-gray-500 text-lg font-semibold text-center">
          You can access everything inside your dashboard.
        </p>

        {warningMessage && (
          <div className="bg-yellow-200 border-yellow-400 text-yellow-400 font-semibold p-4 text-center">
            <p>{warningMessage}</p>
          </div>
        )}

        <Link href="/user">
          <p>
            <button className="userBtn mt-8 w-full" onClick={handleAccess}>
              Access Dashboard
            </button>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default thankyou;
