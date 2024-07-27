import { useEffect } from "react";
import UserNavbar from "./UserNavbar";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import styles from "./UserLayout.module.css";
import { Circles } from "react-loader-spinner";
import { fetchWrapper } from "../../helpers";
import { BASE_URL } from "../../config";

function UserLayout({ children }) {
  const { isAuthenticated, user: authUser } = useSelector(
    (state) => state.auth
  );
  const { user } = useSelector((state) => state.users);
  const { message, loading } = useSelector((state) => state.utils);

  const dispatch = useDispatch();
  const { isUserLoggedIn, setUser } = bindActionCreators(
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
              if (data.isAdmin) {
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
  }, [isAuthenticated]);

  return (
    <>
      {message.sc && (
        <div className="flex items-center justify-between responseMessage bg-green-50 text-green-600 font-semibold border-2 border-green-600 shadow-lg px-4 py-3 rounded fixed top-1/2 right-6 z-50">
          <span>{message.sc}</span>
        </div>
      )}
      {message.er && (
        <div className="flex items-center justify-between responseMessage bg-red-50 text-red-600 font-semibold border-2 border-red-600 shadow-lg px-4 py-3 rounded fixed top-1/2 right-6 z-50">
          <span>{message.er}</span>
        </div>
      )}

      {loading > 0 && (
        <div
          className="fixed top-16 left-0 bg-green-400 text-center z-50 animate-pulse"
          style={{ width: `${loading}%` }}
        >
          <p className="text-white font-bold text-xs">{loading}%</p>
        </div>
      )}

      <div className={styles.userDashboard}>
        {user && !user.isAdmin ? (
          <>
            <UserNavbar />
            <main className="px-10 lg:px-0">{children}</main>
          </>
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

export default UserLayout;
