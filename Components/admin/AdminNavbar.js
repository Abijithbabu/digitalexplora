import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import Logo from "../Logo";
import styles from "./AdminNavbar.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Logout, Menu } from "@mui/icons-material";

function AdminNavbar() {
  const { aside } = useSelector((state) => state.utils);
  const dispatch = useDispatch();
  const { setAside, logout } = bindActionCreators(actionCreators, dispatch);

  return (
    <div
      className={`bg-white w-full p-4 lg:px-8 shadow-md sticky top-0 z-30 flex items-center`}
    >
      {aside ? (
        <XMarkIcon
          className="block lg:hidden w-6 h-6 mr-8 cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out"
          onClick={() => setAside(!aside)}
        />
      ) : (
        <Menu
          className="block lg:hidden w-6 h-6 mr-8 cursor-pointer hover:text-blue-600 transition-colors duration-200 ease-in-out"
          onClick={() => setAside(!aside)}
        />
      )}

      <div className={styles.navbar__brand}>
        <Logo className="w-28 object-contain" />
      </div>

      <button
        className="ml-auto cursor-pointer"
        title="Logout"
        onClick={() => logout()}
      >
        <Logout fontSize="small" className="w-5 h-5" />
      </button>
    </div>
  );
}

export default AdminNavbar;
