import UserLayout from "../../Components/user/UserLayout";
import LinkLevels from "../../Components/user/linkLevels/LinkLevels";
import NoData from "../../Components/NoData";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "@/store";
import { bindActionCreators } from "redux";
import { fetchWrapper } from "../../helpers";
import { userRequests } from "../../config/requests";
import { BASE_URL } from "../../config";
import NetworkError from "../../Components/NetworkError";

function linkLevels() {
  const [state, setState] = useState({
    data: [],
    error: null,
  });
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getLinks();
  }, [skip, limit]);

  async function getLinks() {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await fetchWrapper.get(
        `${BASE_URL}${userRequests.getLinkLevels}${skip}/${limit}?userId=${user._id}`
      );
      const resJson = await res.json();

      if (res.status === 200 || res.ok) {
        setState({ data: resJson.data, error: null });
      } else {
        setState({ data: [], error: resJson.message });
      }
    } catch (error) {
      setMessage({ sc: "", er: error.message });
    }
  }

  return (
    <UserLayout title="Link levels">
      {state?.error ? (
        <NetworkError error={state?.error} />
      ) : (
        <>
          {state?.data?.linkLevels ? (
            <>
              {state?.data?.linkLevels?.length > 0 ? (
                <LinkLevels
                  state={state?.data}
                  setLimit={setLimit}
                  getLinks={getLinks}
                />
              ) : (
                <NoData />
              )}
            </>
          ) : (
            <div className="max-w-7xl mx-auto text-center p-10">Loading</div>
          )}
        </>
      )}
    </UserLayout>
  );
}

export default linkLevels;
