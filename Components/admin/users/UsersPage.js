import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { userService } from "@/services";
import { actionCreators } from "@/store";
import SearchInput from "@/Components/SearchInput";
import ELoading from "@/Components/ELoading";
import ErrorPage from "@/Components/ErrorPage";
import UserModal from "@/Components/modals/UserModal";

function UsersPage() {
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { fetchUser, searchUsersAction, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (!searchTerm) {
      if (userState.totalUsers < limit) {
        setTotalPages(1);
      } else {
        setTotalPages(Math.ceil(userState.totalUsers / limit));
      }
    } else {
      if (userState.totalUsers < limit) {
        setTotalPages(1);
      } else {
        setTotalPages(Math.ceil(userState.searchResult / limit));
      }
    }
  }, [userState.totalUsers, skip, limit]);

  const handleClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const fetchLoading = true;
    if (!searchTerm) {
      getAllUsers(fetchLoading);
      setSearchTerm("");
    } else {
      searchUser();
    }
  }, [limit, skip, searchTerm, userState.searchResult]);

  const getAllUsers = async (fetchLoading) => {
    setError(false);
    if (fetchLoading) {
      setIsFetching(true);
    }

    try {
      const res = await userService.getAll(skip, limit);
      const resJson = await res.json();

      if (res.ok) {
        localStorage.setItem("totalUsers", resJson.data.totalUsers);
        fetchUser(resJson.data);
        setIsFetching(false);
      } else {
        localStorage.setItem("totalUsers", null);
        setMessage({ sc: "", er: resJson.message });
        setIsFetching(false);
      }
    } catch (error) {
      setIsFetching(false);
      setError(true);
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm.toLowerCase());
  };

  const hasChar = (string) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(string);
  };

  const searchUser = async (event) => {
    setError(false);
    if (event) {
      event.preventDefault();
    }
    if (!searchTerm) {
      alert("Enter an input");
      return;
    }
    if (hasChar(searchTerm)) {
      setMessage({ sc: "", er: "Remove special characters" });
      return;
    } else {
      const body = {
        skip,
        limit,
      };

      try {
        const res = await userService.search(searchTerm, body);
        const resJson = await res.json();

        if (res.ok) {
          searchUsersAction(resJson.data);
        } else {
          setMessage({ sc: "", er: resJson.message });
        }
      } catch (error) {
        setError(true);
        console.error(error);
      }
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">User Management</h3>

        <SearchInput placeholder="Search user..." onChange={handleSearch} />

        <button
          className="userBtn w-full font-medium lg:w-auto sm:ml-2 py-2"
          onClick={handleClick}
        >
          Add User
        </button>
      </div>

      <div className="userList">
        {isFetching ? (
          <ELoading />
        ) : userState.users.length > 0 ? (
          <UserTable
            totalPages={totalPages}
            limit={limit}
            skip={skip}
            setLimit={setLimit}
            setSkip={setSkip}
            state={userState}
            getAllUsers={getAllUsers}
          />
        ) : error ? (
          <ErrorPage />
        ) : (
          <div className="p-8 text-center col-span-4">
            <p className="text-base">No data Found</p>
            <p className="text-3xl font-semibold">Add a user</p>
          </div>
        )}

        <UserModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
}

export default UsersPage;
