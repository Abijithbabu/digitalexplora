import { useState } from "react";
import { userRequests } from "../../../config/requests";
import useFetchById from "../../../hooks/useFetchById";
import Table from "../../Table";
import { allStatusColumns } from "./Columns";
import Brokenpage from "../../Brokenpage";
import NoData from "../../NoData";

function AllUsers() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const state = useFetchById(userRequests.getPayouts, skip, limit);
  const TOTAL_PAGES = Math.ceil(state?.data?.length / limit);

  if (state?.error) return <Brokenpage state={state} />;

  return (
    <>
      {state?.data?.length > 0 ? (
        <Table
          DATA={state?.data}
          COLUMNS={allStatusColumns}
          totalPages={TOTAL_PAGES}
          skip={skip}
          limit={limit}
          setSkip={setSkip}
          setLimit={setLimit}
        />
      ) : state?.loading ? (
        "Loading..."
      ) : (
        <NoData />
      )}
    </>
  );
}

export default AllUsers;
