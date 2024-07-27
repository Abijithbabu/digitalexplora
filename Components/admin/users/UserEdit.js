import { useState } from "react";
import UserKYC from "./UserKYC";
import EditUserProfile from "../EditUserProfile";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { useDispatch } from "react-redux";
import Breadcrump from "@/Components/Breadcrump";
import { CreditCardIcon, UsersIcon } from "@heroicons/react/24/solid";
import ELoading from "@/Components/ELoading";
import { userService } from "@/services";

function UserEdit({ person }) {
  const router = useRouter();
  const { userId } = router.query;
  const [userProfile, setUserProfile] = useState(true);
  const [kycEdit, setKycEdit] = useState(false);
  const [user, setUserData] = useState();
  const [kyc, setKyc] = useState();

  const dispatch = useDispatch();

  const { setSingleUser } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const getUser = async (userId) => {
    try {
      const res = await userService.getById(userId);
      const resJson = await res.json();
      setUserData(resJson.data);
      setSingleUser(resJson.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getKyc(userId);
    }
  }, [userId]);

  const getKyc = async (userId) => {
    const res = await userService.getKycData(userId);
    const resJson = await res.json();

    if (res.ok) {
      setKyc(resJson.data);
    } else {
      console.log(resJson.message);
    }
  };

  return (
    <>
      {/* topDiv */}
      <div className="sm:flex items-center">
        <Breadcrump
          baseLink="/admin/users"
          baseTitle="Users"
          id={userId}
          edit={true}
          item="Course"
          itemName={person.userName}
        />

        <div className="tabIcon inline-flex items-center bg-white rounded-lg overflow-hidden ml-auto">
          <button
            className={`btn hover:-translate-y-0 ${
              userProfile && "bg-blue-600 text-white"
            }`}
            onClick={() => {
              setUserProfile(true);
              setKycEdit(false);
            }}
          >
            <span className="w-5 h-5 mr-2">
              <UsersIcon />
            </span>
            User Profile
          </button>
          <button
            className={`btn hover:-translate-y-0 ${
              kycEdit && "bg-blue-600 text-white"
            }`}
            onClick={() => {
              setUserProfile(false);
              setKycEdit(true);
            }}
          >
            <span className="w-5 h-5 mr-2">
              <CreditCardIcon />
            </span>
            KYC Details
          </button>
        </div>
      </div>

      {user ? (
        <main className="userEdit">
          {userProfile && (
            <EditUserProfile preloadedValues={user} getUser={getUser} />
          )}
          {kycEdit && <UserKYC preloadedValues={kyc} getKyc={getKyc} />}
        </main>
      ) : (
        <ELoading />
      )}
    </>
  );
}

export default UserEdit;
