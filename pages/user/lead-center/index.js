import { useEffect, useState } from "react";
import UserLayout from "../../../Components/user/UserLayout";
import Table from "../../../Components/Table";
import NetworkError from "../../../Components/NetworkError";
import NoData from "../../../Components/NoData";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import { useSelector } from "react-redux";

const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phoneNumber",
  },
  {
    Header: "Referred Page",
    accessor: "referredPage",
  },
  {
    Header: "Referred By",
    accessor: "referredBy",
  },
  {
    Header: "Language",
    accessor: "language",
  },
];

function Index() {
  const { userLeads, loading, error } = useSelector((state) => state.leads);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const { fetchUserLeads } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchUserLeads();
  }, []);

  const TOTAL_PAGES = Math.ceil(userLeads?.length / limit);

  return (
    <UserLayout title="Lead center">
      <div className="max-w-7xl mx-auto p-8 lg:py-8 lg:px-0">
        {loading ? (
          "Loading"
        ) : (
          <>
            {error ? (
              <NetworkError error={error} />
            ) : (
              <>
                {userLeads?.length > 0 ? (
                  <Table
                    DATA={userLeads}
                    COLUMNS={COLUMNS}
                    skip={skip}
                    limit={limit}
                    setSkip={setSkip}
                    setLimit={setLimit}
                    totalPages={TOTAL_PAGES}
                  />
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

export default Index;
