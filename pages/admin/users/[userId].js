import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/admin/AdminLayout";
import { useRouter } from "next/router";
import UserDetails from "../../../Components/admin/users/UserDetails";
import BankViewModal from "../../../Components/modals/BankViewModal";
import LicenseViewModal from "../../../Components/modals/LicenseViewModal";
import PancardViewModal from "../../../Components/modals/PancardViewModal";
import AadharViewModal from "../../../Components/modals/AadharViewModal";
import UserEdit from "../../../Components/admin/users/UserEdit";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/index";
import { userService } from "../../../services";
import ErrorPage from "../../../Components/ErrorPage";

function user() {
  const router = useRouter();
  const { edit } = router.query;
  const { userId } = router.query;

  const userState = useSelector((state) => state.users);
  const [kyc, setKyc] = useState();
  const [showModal, setShowModal] = useState({
    bankModal: false,
    aadharModal: false,
    panCardModal: false,
    licenseModal: false,
  });
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { setSingleUser, fetchRequest, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchRequest();

    if (token && userId) {
      getUser(userId);
    }
  }, [userId]);

  const getUser = async (userId) => {
    try {
      const res = await userService.getById(userId);
      const resJson = await res.json();

      if (res.ok) {
        setSingleUser(resJson.data);
      } else {
        console.log(resJson.message);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const getKyc = async (userId) => {
      try {
        const res = await userService.getKycData(userId);
        const resJson = await res.json();

        if (res.ok) {
          setKyc(resJson.data);
        } else if (res.status === 400) {
          setMessage({ sc: "", er: "KYC not found please update" });
          console.log("KYC not found please update");
        } else {
          console.log(resJson.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getKyc(userId);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }, [userId]);

  return (
    <AdminLayout>
      {userState?.singleUser ? (
        <>
          {error ? (
            <ErrorPage />
          ) : (
            <div>
              {edit ? (
                <UserEdit person={userState.singleUser} />
              ) : (
                <UserDetails
                  person={userState.singleUser}
                  setShowModal={setShowModal}
                />
              )}
            </div>
          )}

          {showModal.bankModal && (
            <BankViewModal
              kyc={kyc}
              showModal={showModal.bankModal}
              setShowModal={setShowModal}
            />
          )}
          {showModal.licenseModal && (
            <LicenseViewModal
              kyc={kyc}
              showModal={showModal.licenseModal}
              setShowModal={setShowModal}
            />
          )}
          {showModal.panCardModal && (
            <PancardViewModal
              kyc={kyc}
              showModal={showModal.panCardModal}
              setShowModal={setShowModal}
            />
          )}
          {showModal.aadharModal && (
            <AadharViewModal
              kyc={kyc}
              showModal={showModal.aadharModal}
              setShowModal={setShowModal}
            />
          )}
        </>
      ) : (
        <div className="shadow rounded-md p-4 w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-blue-400 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-blue-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-blue-400 rounded"></div>
                <div className="h-4 bg-blue-400 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default user;
