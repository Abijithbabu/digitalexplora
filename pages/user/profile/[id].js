import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/index";
import { userService } from "../../../services";
import UserLayout from "../../../Components/user/UserLayout";
import Details from "../../../Components/user/profile/Details";

function user() {
  const router = useRouter();
  const { id } = router.query;
  const userState = useSelector((state) => state.users);
  const [kyc, setKyc] = useState();

  const dispatch = useDispatch();
  const { setUser, fetchRequest, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetchRequest();

    if (id) {
      getUser(id);
    }
  }, [id]);

  const getUser = async (id) => {
    try {
      const res = await userService.getById(id);
      const resJson = await res.json();
      if (res.ok) {
        setUser(resJson.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getKyc(id);
    }
  }, [id]);

  const getKyc = async (id) => {
    try {
      const res = await userService.getKycData(id);
      const resJson = await res.json();

      if (res.ok) {
        setKyc(resJson.data);
        setMessage({ sc: resJson.message, er: "" });
      } else if (res.status === 400) {
        setMessage({ sc: "", er: "Please update KYC" });
      } else {
        setMessage({ sc: "", er: resJson.message });
        console.log(resJson.message);
      }
    } catch (error) {
      setMessage({ sc: "", er: error.message });
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 4000);
  };

  return (
    <UserLayout>
      <Details
        person={userState?.user}
        getUser={getUser}
        kyc={kyc}
        getKyc={getKyc}
      />
    </UserLayout>
  );
}

export default user;
