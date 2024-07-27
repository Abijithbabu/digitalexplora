import React, { useEffect, useState } from "react";
import AsideOption from "./AsideOption";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { BanknotesIcon, BookOpenIcon, ChartBarIcon, CogIcon, ComputerDesktopIcon, CubeIcon, IdentificationIcon, LinkIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Dashboard, SpaceDashboard } from "@mui/icons-material";
import styles from "./AdminAside.module.css";

function AdminAside() {
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState();

  const { aside } = useSelector((state) => state.utils);
  const dispatch = useDispatch();
  const { setAside } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    if (windowWidth < 991) {
      setAside(false);
    } else {
      setAside(true);
    }

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [windowWidth]);

  return (
    <div
      className={`transition-all ease-in-out duration-300 ${styles.adminAside
        } ${aside
          ? "fixed left-0 top-0 max-h-screen min-h-screen overflow-y-auto w-full lg:w-2/12"
          : "hidden"
        }`}
    >
      {/* siderbar-links */}
      <div className="lg:mt-10 asideMenu">
        <Link href="/admin">
          <p>
            <AsideOption
              Icon={Dashboard}
              title="Analytics"
              active={router.pathname == "/admin" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/users">
          <p>
            <AsideOption
              Icon={UsersIcon}
              title="Users"
              active={router.pathname == "/admin/users" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/products">
          <p>
            <AsideOption
              Icon={CubeIcon}
              title="Products"
              active={router.pathname == "/admin/products" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/courses">
          <p>
            <AsideOption
              Icon={BookOpenIcon}
              title="Courses"
              active={router.pathname == "/admin/courses" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/app-manager">
          <p>
            <AsideOption
              Icon={SpaceDashboard}
              title="App manager"
              active={router.pathname == "/admin/app-manager" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/payouts">
          <p>
            <AsideOption
              Icon={BanknotesIcon}
              title="Payouts"
              active={router.pathname == "/admin/payouts" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/payment-log">
          <p>
            <AsideOption
              Icon={ChartBarIcon}
              title="Payment log"
              active={router.pathname == "/admin/payment-log" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/affiliate-links">
          <p>
            <AsideOption
              Icon={UsersIcon}
              title="Affiliate links"
              active={
                router.pathname == "/admin/affiliate-links" ? true : false
              }
            />
          </p>
        </Link>

        <Link href="/admin/link-levels">
          <p>
            <AsideOption
              Icon={LinkIcon}
              title="Link levels"
              active={router.pathname == "/admin/link-levels" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/webinar">
          <p>
            <AsideOption
              Icon={ComputerDesktopIcon}
              title="Webinar"
              active={router.pathname == "/admin/webinar" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/kyc-approval">
          <p>
            <AsideOption
              Icon={IdentificationIcon}
              title="Kyc approval"
              active={router.pathname == "/admin/kyc-approval" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/lead-center">
          <p>
            <AsideOption
              Icon={UsersIcon}
              title="Lead center"
              active={router.pathname == "/admin/lead-center" ? true : false}
            />
          </p>
        </Link>

        <Link href="/admin/settings">
          <p>
            <AsideOption
              Icon={CogIcon}
              title="Settings"
              active={router.pathname == "/admin/settings" ? true : false}
            />
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminAside;
