import React, { useState } from "react";
import Link from "next/link";
import { Facebook, Group, Instagram, LinkedIn, Twitter, WhatsApp, YouTube } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { userService } from "@/services";
import ErrorPage from "@/Components/ErrorPage";
import Breadcrump from "@/Components/Breadcrump";
import SocialLink from "@/Components/SocialLink";
import ELoading from "@/Components/ELoading";

function UserDetails({ person, setShowModal }) {
  const dispatch = useDispatch();
  const { aside } = useSelector((state) => state.utils);
  const [error, setError] = useState(false);

  const { setAside } = bindActionCreators(actionCreators, dispatch);

  const suspendUser = async (userId) => {
    setLoading(true);
    const res = await userService.suspendUser(userId);
    const resJson = await res.json();

    try {
      if (res.ok) {
        const fetchLoading = false;
        getAllUsers(fetchLoading);
        setMessage({ sc: resJson.message });
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setMessage({ er: resJson.message });
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : (
        <>
          {person ? (
            <>
              {/* topDiv */}
              <div className="sm:flex items-center lg:justify-between mb-6">
                <Breadcrump
                  baseLink="/admin/users"
                  baseTitle="Users"
                  id={person._id}
                  edit={false}
                  item="Course"
                  itemName={person.userName}
                />

                <button
                  className="btn bg-white border-red-500 w-full font-medium md:w-auto sm:ml-auto py-2 mb-4 lg:mb-0"
                  onClick={() => suspendUser(person._id)}
                >
                  Suspend
                </button>

                <Link
                  href={`/admin/users/${person._id}?edit=${person.userName}`}
                >
                  <p className="userBtn w-full font-medium md:w-auto sm:ml-2 py-2">
                    Edit User
                  </p>
                </Link>
              </div>

              <main className="profileInfo">
                {/* profileInfo */}
                <div className="bg-white p-6 z-20 shadow-xl relative">
                  <div className="md:grid md:grid-cols-6 md:space-x-4 flex-1">
                    <div className="leftCol flex col-span-3 mb-3 lg:mb-0 items-center">
                      {person.profilePic ? (
                        <img
                          src={person.profilePic}
                          alt={person.userName}
                          title={person.userName}
                          className="w-32 h-32 rounded-md shadow-xl mx-auto object-cover"
                        />
                      ) : (
                        <div className="image">
                          <span className="userImage text-3xl text-white font-extrabold w-32 h-32 bg-gray-800 flex items-center justify-center shadow-xl">
                            {person.userName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="ml-8 py-3 flex-1">
                        <p className="text-xs mb-4 font-normal text-gray-500 uppercase tracking-wider">
                          Refered By{" "}
                          <span className="text-gray-900 font-semibold lowercase">
                            {person.referredBy}
                          </span>
                        </p>
                        <h3 className="text-gray-900 text-2xl font-medium capitalize">
                          {person.firstName ?? "--"} {person.lastName ?? "--"}
                        </h3>
                        <h5 className="text-sm text-gray-600 mt-1 tracking-wider">
                          {person.countryCode ?? "--"}{" "}
                          {person.phoneNumber ?? "--"}
                        </h5>
                      </div>
                    </div>
                    <div className="midCol py-3">
                      <p className="status">
                        <span className="text-xs font-semibold uppercase rounded-full text-gray-600 justify-start flex items-center">
                          {person.isAcitve ? "Active" : "In-active"}
                          {person.isAcitve ? (
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
                      <p className="text-sm text-gray-600 mt-1 tracking-wider">
                        {person.email ?? "--"}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 tracking-wider">
                        {person.dob ?? "--"}
                      </p>
                    </div>
                    {/* <div className="rightCol lg:items-end justify-center flex flex-col col-span-2">
                      <p>Data</p>
                    </div> */}
                  </div>
                </div>

                {/* address */}
                <div className="bg-white px-6 pb-3 pt-6 z-10 relative">
                  <div className="md:grid md:grid-cols-4 md:gap-4">
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
                        {person.address ?? "--"}
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
                        {person.phoneNumber ?? "--"}
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
                        {person.email ?? "--"}
                      </p>
                    </div>
                    <div className="sendMail">
                      <button className="userBtn w-full group">
                        <span>Send Mail</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-3 transition-all ease-linear duration-200 opacity-30 transform rotate-90 group-hover:opacity-100"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* connectVia */}
                <div className="bg-white shadow-xl py-2 mb-4 px-8 rounded">
                  <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-4">
                    Connect via:
                  </h3>
                  <div className="social mb-3 md:grid md:grid-cols-4 md:gap-4">
                    <SocialLink
                      Icon={Facebook}
                      title={person.facebookUsername ?? "--"}
                    />
                    <SocialLink
                      Icon={Instagram}
                      title={person.instagramUsername ?? "--"}
                    />
                    <SocialLink
                      Icon={YouTube}
                      title={person.youtubeLink ?? "--"}
                    />
                    <SocialLink Icon={Group} title={person.groupLink ?? "--"} />
                    <SocialLink
                      Icon={LinkedIn}
                      title={person.linkedInUsername ?? "--"}
                    />
                    <SocialLink
                      Icon={Twitter}
                      title={person.twitterUsername ?? "--"}
                    />

                    <div className="bg-white text-gray-800 mb-2 lg:mb-0 flex items-center col-span-2">
                      <h3 className="text-gray-800 text-md font-semibold">
                        <WhatsApp fontSize="large" />
                      </h3>
                      <p className="ml-2 text-gray-500 text-sm font-medium">
                        {person.whatsappNumberCountryCode ?? "--"}{" "}
                        {person.whatsappNumber ?? "--"}
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
              </main>
            </>
          ) : (
            <ELoading />
          )}
        </>
      )}
    </>
  );
}

export default UserDetails;
