import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { navigation } from "../../constants/LandingPage";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { LogoutIcon, ViewGridIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { useSelector } from "react-redux";
import Logo from "../Logo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ transparent }) {
  const router = useRouter();
  const pathName = router.pathname;
  const { singleUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreators, dispatch);

  return (
    <Disclosure
      as="nav"
      className={`digitalNavbar z-50 ${
        transparent ? "bg-transparent" : "bg-white shadow"
      }`}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 sm:py-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white focus:outline-none focus">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-900 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-900 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center lg:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <p>
                      <Logo className="w-32 object-contain" />
                    </p>
                  </Link>
                </div>
                <div className="hidden lg:block sm:ml-auto">
                  <div className="flex space-x-8 items-center">
                    {navigation.map((item, index) => (
                      <Link href={item.href} key={index}>
                        <p
                          className={classNames(
                            item.button
                              ? "px-4 bg-blue-800 text-white rounded py-3 hover:bg-blue-900 shadow-xl transition-all ease-in-out duration-300 focus:outline-none font-semibold"
                              : `block font-semibold text-md tracking-tight hover:text-blue-700 ${
                                  item.href === pathName
                                    ? "text-blue-700"
                                    : "text-gray-800"
                                }`,
                            "mx-2 cursor-pointer"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </p>
                      </Link>
                    ))}

                    {/* Profile dropdown */}
                    {singleUser ? (
                      <Menu
                        as="div"
                        className="ml-auto relative flex flex-col justify-center"
                      >
                        {({ open }) => (
                          <>
                            <Menu.Button className="focus:outline-none">
                              <span className="sr-only">Open user menu</span>

                              {singleUser?.profilePic_thumbnail ? (
                                <img
                                  className="h-9 w-9 rounded-full border-2 border-blue-600"
                                  src={`${singleUser?.profilePic_thumbnail}`}
                                />
                              ) : (
                                <div
                                  title={singleUser?.userName}
                                  className="capitalize rounded-md flex items-center justify-center bg-gray-800 text-white font-bold w-8 h-8 border-2 border-red-500"
                                >
                                  {singleUser?.userName &&
                                    singleUser?.userName.charAt(0)}
                                </div>
                              )}
                            </Menu.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right z-50 absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      href={
                                        singleUser?.isAdmin ? "/admin" : "/user"
                                      }
                                    >
                                      <p
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "flex items-center px-4 py-2 text-gray-700 font-medium cursor-pointer"
                                        )}
                                      >
                                        <ViewGridIcon className="h-5 w-5 mr-3" />
                                        Dashboard
                                      </p>
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <p
                                      href="/"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "flex items-center px-4 py-2 text-gray-700 font-medium cursor-pointer"
                                      )}
                                      onClick={() => logout()}
                                    >
                                      <LogoutIcon className="h-5 w-5 mr-3" />
                                      Sign out
                                    </p>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    ) : (
                      <Link href="/login">
                        <p
                          className={`block font-semibold text-md tracking-tight hover:text-blue-700 ${
                            "/login" === pathName
                              ? "text-blue-700"
                              : "text-gray-800"
                          } mx-2 cursor-pointer`}
                        >
                          Sign in
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-8 text-center">
              {navigation.map((item, index) => (
                <Link href={item.href} key={index}>
                  <p
                    key={item.name}
                    className={classNames(
                      item.button
                        ? "block mb-6 px-4 bg-blue-600 text-white rounded py-3 hover:bg-blue-500 shadow-xl transition-all ease-in-out duration-300 focus:outline-none font-semibold"
                        : "text-gray-800 block font-semibold text-md tracking-tight mb-6"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </p>
                </Link>
              ))}

              <Link href="/login">
                <p
                  className={`block font-semibold text-md tracking-tight hover:text-blue-700 ${
                    "/login" === pathName ? "text-blue-700" : "text-gray-800"
                  } mx-2 cursor-pointer`}
                >
                  Sign in
                </p>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
