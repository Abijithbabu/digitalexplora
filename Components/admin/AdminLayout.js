import React, { useEffect } from "react";
import AdminAside from "./AdminAside";
import Router from "next/router";
import Head from "next/head";
import ProgressBar from "@/Components/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchWrapper } from "@/helpers";
import { actionCreators } from "@/store";
import { BASE_URL } from "@/config";
import AdminNavbar from "./AdminNavbar";
import { Circles } from "react-loader-spinner";

function AdminLayout({ title, children }) {
  const authState = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const { aside, loading, message } = useSelector((state) => state.utils);

  const dispatch = useDispatch();
  const { setAside, setUser, isUserLoggedIn } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      isUserLoggedIn();

      if (token) {
        if (user._id) {
          try {
            const res = await fetchWrapper.get(`${BASE_URL}/user/${user._id}`);
            const resJSon = await res.json();

            const data = resJSon.data;

            if (res.ok) {
              if (!data.isAdmin) {
                Router.push("/login");
              }

              setUser(data);
            } else {
              setUser("");
              console.log("Something went wrong");
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        Router.push("/login");
      }
    }
    fetchData()
  }, [authState.isAuthenticated]);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [aside]);

  const updateWindowDimensions = () => {
    if (window.innerWidth >= 992) {
      setAside(true);
    } else {
      setAside(false);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-white">
        {user && user.isAdmin ? (
          <div>
            {message.sc && (
              <p
                className="bg-green-50 text-green-600 font-semibold border-2 border-green-600 shadow-lg px-4 py-3 rounded items-center justify-between fixed top-1/2 right-6"
                style={{ zIndex: 9999 }}
              >
                {message.sc}
              </p>
            )}
            {message.er && (
              <p
                className="bg-red-50 text-red-600 font-semibold border-2 border-red-600 shadow-lg px-4 py-3 rounded items-center justify-between fixed top-1/2 right-6 z-50"
                style={{ zIndex: 9999 }}
              >
                {message.er}
              </p>
            )}

            <AdminNavbar setAside={setAside} aside={aside}></AdminNavbar>

            <AdminAside />

            <main className="py-8 px-8 lg:px-14 lg:w-10/12 lg:ml-auto">
              {children}
            </main>

            {loading > 0 && (
              <div
                className="bg-white fixed bottom-0 left-0 w-full p-2"
                style={{ zIndex: 1024 }}
              >
                <ProgressBar value={loading} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex min-h-screen items-center justify-center bg-transparent">
            <Circles
              color="#2563EB" height={40} width={40}
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminLayout;
