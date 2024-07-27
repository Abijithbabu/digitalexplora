import TableView from "../../TableView";
import { userService } from "../../../services";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/index";
import { useState } from "react";

function UserTable({
  limit,
  skip,
  setLimit,
  setSkip,
  state,
  getAllUsers,
  totalPages,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  const suspendUser = async (userId) => {
    setLoading(true);
    try {
      const res = await userService.suspendUser(userId);
      const resJson = await res.json();

      if (res.ok) {
        const fetchLoading = false;
        getAllUsers(fetchLoading);
        setMessage({ sc: resJson.message });
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        setMessage({ er: resJson.message });
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 3000);
  };

  return (
    <TableView
      DATA={state?.users}
      COLUMNS={[
        {
          Header: "Name",
        },
        {
          Header: "Contact",
        },
        {
          Header: "Status",
        },
        {
          Header: "Actions",
        },
      ]}
      limit={limit}
      skip={skip}
      setLimit={setLimit}
      setSkip={setSkip}
      totalPages={totalPages}
      loading={loading}
      suspendUser={suspendUser}
    />
  );
}

export default UserTable;
