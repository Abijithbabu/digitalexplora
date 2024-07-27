import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SearchInput from "../SearchInput";
import { userService } from "@/services";

function UserForm({ addNewUser, isSubmitting }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      phoneNumber: "",
      email: "",
      isAdmin: false,
    },
  });

  const [referalBy, setReferalBy] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [showReferalMenu, setReferalMenu] = useState(false);

  const submitHandler = (data) => {
    Object.assign(data, { referredBy: referalBy });
    addNewUser(data);
  };

  // get all users
  async function getAllusers() {
    try {
      const res = await userService.getUsers();
      const resJson = await res.json();

      if (res.ok) {
        setAllUsers(resJson.data);
        setDefaultUsers(resJson.data);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // search input
  const updateInput = async (e) => {
    const input = e.target.value;
    const filtered = defaultUsers.filter((user) => {
      return user.userName.toLowerCase().includes(input.toLowerCase());
    });

    setSearchInput(input);
    setReferalMenu(true);
    setAllUsers(filtered);
  };

  useEffect(() => {
    getAllusers();
  }, []);

  useEffect(() => {
    if (!searchInput) {
      setReferalMenu(false);
      return;
    }
  }, [searchInput]);

  function handleJoinBy(e) {
    setReferalBy(e.target.innerText);
    setSearchInput(e.target.innerText);
    setReferalMenu(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-4">
          <label htmlFor="name">Username*</label>
          <input
            type="text"
            {...register("userName")}
            placeholder="Enter username..."
            className="field"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="name">Join under*</label>
          <SearchInput
            classList="field flex capitalize"
            placeholder="Search..."
            onChange={updateInput}
            value={searchInput}
          />

          {showReferalMenu && (
            <div className="absolute top-full left-0 w-full bg-white p-6 z-30 max-h-44 overflow-y-auto shadow-lg">
              <ul>
                <li
                  className="cursor-pointer capitalize p-2 hover:bg-gray-100 rounded"
                  onClick={handleJoinBy}
                >
                  admin
                </li>
                {allUsers.map((user) => (
                  <li
                    className="cursor-pointer capitalize p-2 hover:bg-gray-100 rounded"
                    onClick={handleJoinBy}
                    key={user._id}
                  >
                    {user.userName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="number">Phone*</label>

          <div className="flex">
            <input
              type="text"
              {...register("countryCode")}
              placeholder="+91"
              className="field w-16 mr-1"
              required
            />
            <input
              type="number"
              {...register("phoneNumber")}
              placeholder="Phone number..."
              className="field"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email ID*</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter Email Id..."
            className="field"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter user password..."
            className="field"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="isAdmin" className="flex items-center">
            Is Admin*
            <input
              type="checkbox"
              className="focus:outline-none form-checkbox w-6 h-6 ml-2 cursor-pointer rounded-md bg-blue-200"
              {...register("isAdmin")}
            />
          </label>
        </div>

        <button
          className="userBtn mt-2 w-full mb-4"
          disabled={isSubmitting}
          type="submit"
        >
          {!isSubmitting ? "Add user" : "Adding..."}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
