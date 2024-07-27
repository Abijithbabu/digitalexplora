import UserLayout from "../../Components/user/UserLayout";
import Table from "../../Components/Table";
import { People, Search } from "@mui/icons-material";
import { userRequests } from "../../config/requests";
import { useState } from "react";
import useFetchById from "../../hooks/useFetchById";
import getSymbolFromCurrency from "currency-symbol-map";
import NetworkError from "../../Components/NetworkError";
import NoData from "../../Components/NoData";

function team() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, error } = useFetchById(userRequests.getTeam, skip, limit);

  const TOTAL_PAGES = Math.ceil(data?.length / limit);

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "firstname",
      Cell: ({ row }) => (
        <span className="flex items-center">
          <img
            src={
              row.original.picture ? row.original.picture : "/img/no_image.jpg"
            }
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="ml-2">
            <h3 className="font-semibold">{row.original.name}</h3>
            <p className="font-medium text-gray-500">{row.original.email}</p>
          </div>
        </span>
      ),
    },
    {
      Header: "Phone",
      accessor: "phoneNumber",
    },
    {
      Header: "Total Earnings",
      accessor: "totalRefferalEarned",
      Cell: ({ row }) => (
        <span className="text-gray-900 font-semibold">
          {getSymbolFromCurrency("INR")}
          {row.original.totalRefferalEarned}
        </span>
      ),
    },
    {
      Header: "No.of direct members",
      accessor: "totalRefferal",
      Cell: ({ row }) => (
        <span className="text-blue-500 font-semibold">
          {row.original.totalRefferal}
        </span>
      ),
    },
  ];

  return (
    <UserLayout title="Team">
      <div className="p-4 lg:px-0 lg:py-8 mx-auto max-w-7xl">
        <div className="bg-white mb-10">
          <div className="md:flex md:items-center">
            <div className="flex items-center title md:mr-3 justify-center md:justify-start">
              <span className="rounded-xl relative p-2 bg-blue-100">
                <People style={{ color: "blue" }} />
              </span>
              <div className="flex flex-col ml-3">
                <span className="font-semibold text-md text-gray-900">
                  Team Members :{" "}
                  <span className="text-sm text-gray-400">
                    {data ? (
                      data?.length ?? "0"
                    ) : (
                      <span className="animate-pulse">Loading...</span>
                    )}
                  </span>
                </span>
              </div>
            </div>
            {data?.length ? (
              <div className="search__block bg-white border border-gray-300 mt-4 md:mt-0 rounded-md flex items-center ml-auto text-gray-900">
                <Search fontSize="small" color="inherit" className="ml-2" />
                <input
                  type="text"
                  className="border-0 focus:outline-none bg-transparent flex-1 p-2"
                  placeholder="Search user..."
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {error ? (
          <NetworkError error={error} />
        ) : (
          <>
            {data ? (
              data?.length > 0 ? (
                <Table
                  DATA={data?.userFound}
                  COLUMNS={COLUMNS}
                  totalPages={TOTAL_PAGES}
                  skip={skip}
                  limit={limit}
                  setSkip={setSkip}
                  setLimit={setLimit}
                />
              ) : (
                <NoData />
              )
            ) : (
              <div className="bg-white shadow-xl rounded-md overflow-hidden">
                <div className="title p-2 shadow-lg bg-gray-800 animate-pulse">
                  <h3 className="text-lg text-white font-bold text-center">
                    Loading...
                  </h3>
                </div>
                <ul className="p-4 animate-pulse">
                  <li>Loading...</li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </UserLayout>
  );
}

export default team;
