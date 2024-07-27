import UserLayout from "../../../Components/user/UserLayout";
import Table from "../../../Components/Table";
import NoData from "../../../Components/NoData";
import NetworkError from "../../../Components/NetworkError";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../store";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";

function index() {
  const auth = useSelector((state) => state.auth);
  const { apps, totalApps, error, loading, successMessage } = useSelector(
    (state) => state.app
  );
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const { getUserApps, setMessage } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (auth.user) {
      getUserApps(auth.user._id, skip, limit);
    }

    if (successMessage) {
      setMessage({ sc: successMessage, er: "" });
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }, [skip, limit, successMessage, auth.user]);

  const TOTAL_PAGES = Math.ceil(totalApps / limit);

  return (
    <UserLayout title="App manager">
      <div className="py-8 px-6 lg:px-0 max-w-7xl mx-auto">
        <h3 className="text-center text-xl font-bold mb-6">App Manager</h3>
        {loading ? (
          "Loading"
        ) : (
          <>
            {error ? (
              <NetworkError error={error} />
            ) : (
              <>
                {apps?.length > 0 ? (
                  <div className="lg:grid lg:grid-cols-4 lg:gap-6">
                    {apps?.map((item) => (
                      <div
                        className="card appCard p-0 overflow-hidden"
                        key={item?._id}
                      >
                        <img
                          src={item?.appId?.imageUrl ?? "/img/no_image.jpg"}
                          alt={item?.appName}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-6">
                          <h3 className="font-semibold">
                            {item?.appName ?? "____"}
                          </h3>
                          <p className="text-gray-500">
                            {item?.appId?.description ?? "____"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <NoData />
                )}
              </>
            )}
          </>
        )}
      </div>
    </UserLayout>
  );
}

export default index;
