import { Fragment, useState } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { UserIcon,  } from "@heroicons/react/24/outline";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import UserNavOption from "./UserNavOption";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import { Logout } from "@mui/icons-material";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserNavbar() {
  const router = useRouter();
  const [navMenu, setNavMenu] = useState(true);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="userNavbar border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="block lg:hidden">
          {navMenu ? (
            <Bars3CenterLeftIcon
              className="w-6 h-6 mr-4 cursor-pointer"
              onClick={() => setNavMenu(false)}
            />
          ) : (
            <XMarkIcon
              className="w-6 h-6 mr-4 cursor-pointer"
              onClick={() => setNavMenu(true)}
            />
          )}
        </div>

        <Link href="/user">
          <p>
            <Logo className="w-32 object-contain" />
          </p>
        </Link>

        <div className="mx-auto hidden lg:flex">
          <UserNavOption link="/user" title="Dashboard" />
          <UserNavOption link="/user/products" title="Products" />
          <UserNavOption link="/user/link-levels" title="Link levels" />
          <UserNavOption link="/user/app-manager" title="App manager" />
          <UserNavOption link="/user/payouts" title="Payouts" />
          <UserNavOption link="/user/leaderboard" title="Leaderboard" />
          <UserNavOption link="/user/affiliate-links" title="Affiliate links" />
          <UserNavOption link="/user/lead-center" title="Lead Center" />
          <UserNavOption link="/user/team" title="Team" />
        </div>

        {/* Profile dropdown */}
        <Menu
          as="div"
          className="ml-auto relative flex flex-col justify-center"
        >
          {({ open }) => (
            <>
              <Menu.Button className="focus:outline-none">
                <span className="sr-only">Open user menu</span>

                {user?.profilePic_thumbnail ? (
                  <img
                    className="h-9 w-9 rounded-full border-2 border-blue-600"
                    src={user?.profilePic_thumbnail}
                  />
                ) : (
                  <div
                    title={user?.userName}
                    className="capitalize rounded-md flex items-center justify-center bg-gray-800 text-white font-bold w-8 h-8 border-2 border-red-500"
                  >
                    {user?.userName && user?.userName.charAt(0)}
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
                      <Link href="/user/profile">
                        <p
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "flex items-center px-4 py-2 text-gray-700 font-medium cursor-pointer"
                          )}
                        >
                          <UserIcon className="h-5 w-5 mr-3" />
                          My Profile
                        </p>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        href="/login"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "flex items-center px-4 py-2 text-gray-700 font-medium cursor-pointer"
                        )}
                        onClick={() => logout()}
                      >
                        <Logout className="h-5 w-5 mr-3" />
                        Sign out
                      </p>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>

        <div
          className={`fixed bg-white top-16 left-0 w-full p-6 z-50 shadow-lg transform transition-all ease-in-out duration-500 ${
            navMenu
              ? "-translate-x-full opacity-0"
              : "opacity-100 -translate-y-0"
          }`}
        >
          <Link href="/user">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/user" && "active"
              }`}
            >
              Analytics
            </p>
          </Link>

          <Link href="/user/products">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/products" && "active"
              }`}
            >
              Products
            </p>
          </Link>

          <Link href="/user/link-levels">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/link-levels" && "active"
              }`}
            >
              Link levels
            </p>
          </Link>

          <Link href="/user/app-manager">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/app-manager" && "active"
              }`}
            >
              App manager
            </p>
          </Link>

          <Link href="/user/payouts">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/payouts" && "active"
              }`}
            >
              Payouts
            </p>
          </Link>

          <Link href="/user/leaderboard">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/leaderboard" && "active"
              }`}
            >
              Leaderboard
            </p>
          </Link>

          <Link href="/user/affiliate-links">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/affiliate-links" && "active"
              }`}
            >
              Affiliate Links
            </p>
          </Link>

          <Link href="/user/team">
            <p
              onClick={() => setNavMenu(true)}
              className={`menu__option block ${
                router.pathname == "/team" && "active"
              }`}
            >
              Team
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
