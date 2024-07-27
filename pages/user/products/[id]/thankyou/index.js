import { BadgeCheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSelector } from "react-redux";
import UserLayout from "../../../../../Components/user/UserLayout";

function thankyou() {
  return (
    <UserLayout title="Digital explora | Thank you">
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
          <Link href="/user/products">
            <p>
              <button className="userBtn mt-8 w-full">Access product</button>
            </p>
          </Link>
        </div>
      </div>
    </UserLayout>
  );
}

export default thankyou;
