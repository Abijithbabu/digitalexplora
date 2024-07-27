import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  WhatsApp,
  Group,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AadharViewModal from "@/Components/modals/AadharViewModal";
import BankViewModal from "@/Components/modals/BankViewModal";
import LicenseViewModal from "@/Components/modals/LicenseViewModal";
import PancardViewModal from "@/Components/modals/PancardViewModal";
import SocialLink from "@/Components/SocialLink";
import UserLayout from "@/Components/user/UserLayout";
import { userService } from "@/services";

function profile() {
  const { user } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState({
    bankModal: false,
    aadharModal: false,
    panCardModal: false,
    licenseModal: false,
  });
  const [kyc, setKyc] = useState();

  useEffect(() => {
    if (user?._id) {
      getKyc(user?._id);
    }
  }, [user?._id]);

  const getKyc = async (userId) => {
    try {
      const res = await userService.getKycData(userId);
      const resJson = await res.json();

      if (res.ok) {
        setKyc(resJson.data);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout title="Profile settings">
      <div className="max-w-7xl mx-auto p-6">
        {user ? (
          <>
            {/* navbar */}
            <div className="flex items-center mb-4">
              <h3 className="text-lg text-gray-900 font-semibold">
                My profile
              </h3>
              <Link href={`/user/profile/${user._id}`}>
                <p className="ml-auto">
                  <button className="userBtn py-2">Edit profile</button>
                </p>
              </Link>
            </div>
            {/* profileInfo */}
            <div className="bg-white p-6 z-20 shadow-xl relative">
              <div className="md:grid md:grid-cols-6 md:space-x-4 flex-1">
                <div className="leftCol flex col-span-3 mb-3 lg:mb-0 items-center">
                  {user ? (
                    <img
                      src={user?.profilePic}
                      alt={user?.userName}
                      title={user?.userName}
                      className="w-32 h-32 rounded-md shadow-xl mx-auto object-cover"
                    />
                  ) : (
                    <div className="image">
                      <span className="userImage text-3xl text-white font-extrabold w-32 h-32 bg-gray-800 flex items-center justify-center shadow-xl">
                        {user.userName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="ml-8 py-3 flex-1">
                    <p className="text-xs mb-4 font-normal text-gray-500 uppercase tracking-wider">
                      Added By{" "}
                      <span className="text-gray-900 font-semibold">Admin</span>
                    </p>
                    <h3 className="text-gray-900 text-2xl font-medium capitalize">
                      {user.firstName} {user.lastName}
                    </h3>
                    <h5 className="text-sm text-gray-600 mt-1 tracking-wider">
                      <span className="font-semibold text-sm">Username: </span>
                      {user.userName}
                    </h5>
                  </div>
                </div>

                <div className="midCol py-3">
                  <p className="status">
                    <span className="text-xs font-semibold uppercase rounded-full text-gray-600 justify-start flex items-center">
                      {user.isAcitve ? "Active" : "In-active"}
                      {user.isAcitve ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-500 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-500 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mt-4 tracking-wider">
                    Products owned:
                  </p>
                  <p className="text-sm text-gray-600 mt-1 tracking-wider">
                    {user.broughtProduts.length}
                  </p>
                </div>
              </div>
            </div>

            {/* address */}
            <div className="bg-white px-6 pb-3 pt-6 z-10 relative">
              <div className="md:grid md:grid-cols-3 md:gap-4">
                <div className="flex items-center mb-2 lg:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="ml-2 text-gray-500 text-sm font-medium">
                    {user.address}
                  </p>
                </div>
                <div className="flex items-center mb-2 lg:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="ml-2 text-gray-500 text-sm font-medium">
                    {user.phoneNumber}
                  </p>
                </div>
                <div className="flex items-center mb-2 lg:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                    />
                  </svg>
                  <p className="ml-2 text-gray-500 text-sm font-medium">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* connectVia */}
            <div className="bg-white shadow-xl py-2 mb-4 px-8 rounded">
              <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-4">
                Connect via:
              </h3>
              <div className="social mb-3 md:grid md:grid-cols-4 md:gap-4">
                <SocialLink Icon={Facebook} title={user.facebookUsername} />
                <SocialLink Icon={Instagram} title={user.instagramUsername} />
                <SocialLink Icon={YouTube} title={user.youtubeLink} />
                <SocialLink Icon={Group} title={user.groupLink} />
                <SocialLink Icon={LinkedIn} title={user.linkedInUsername} />
                <SocialLink Icon={Twitter} title={user.twitterUsername} />

                <div className="bg-white text-gray-800 mb-2 lg:mb-0 flex items-center col-span-2">
                  <h3 className="text-gray-800 text-md font-semibold">
                    <WhatsApp fontSize="large" />
                  </h3>
                  <p className="ml-2 text-gray-500 text-sm font-medium">
                    {user.whatsappNumberCountryCode} {user.whatsappNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* kyc */}
            <div className="bg-white rounded shadow-xl py-6 px-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-sm">
                  KYC Details:
                </h3>
              </div>
              {/* kyc details */}
              <div className="kyc md:grid md:grid-cols-4 md:gap-4">
                <div className="flex items-center mb-2 lg:mb-0">
                  <button
                    className="userBtn w-full"
                    id="BankModal"
                    onClick={() => setShowModal({ bankModal: true })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>Bank Account</span>
                  </button>
                </div>
                <div className="flex items-center mb-2 lg:mb-0">
                  <button
                    className="userBtn w-full"
                    id="PancardModal"
                    onClick={() => setShowModal({ panCardModal: true })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>Pancard</span>
                  </button>
                </div>
                <div className="flex items-center mb-2 lg:mb-0">
                  <button
                    className="userBtn w-full"
                    id="AadharModal"
                    onClick={() => setShowModal({ aadharModal: true })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>Aadhar Card</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    className="userBtn w-full"
                    id="LicenseModal"
                    onClick={() => setShowModal({ licenseModal: true })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>Driving License</span>
                  </button>
                </div>
              </div>
            </div>
            {showModal.bankModal && (
              <BankViewModal
                kyc={kyc}
                showModal={showModal.bankModal}
                setShowModal={setShowModal}
              />
            )}
            {showModal.licenseModal && (
              <LicenseViewModal
                kyc={kyc}
                showModal={showModal.licenseModal}
                setShowModal={setShowModal}
              />
            )}
            {showModal.panCardModal && (
              <PancardViewModal
                kyc={kyc}
                showModal={showModal.panCardModal}
                setShowModal={setShowModal}
              />
            )}
            {showModal.aadharModal && (
              <AadharViewModal
                kyc={kyc}
                showModal={showModal.aadharModal}
                setShowModal={setShowModal}
              />
            )}
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </UserLayout>
  );
}

export default profile;
