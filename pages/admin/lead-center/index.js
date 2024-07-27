import AdminLayout from "../../../Components/admin/AdminLayout";
import AdminNavbar from "../../../Components/admin/AdminNavbar";
import Table from "../../../Components/Table";
import SearchInput from "../../../Components/SearchInput";
import NetworkError from "../../../Components/NetworkError";
import NoData from "../../../Components/NoData";

import { UsersIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../store";
import { bindActionCreators } from "redux";

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
    accessor: "phone",
    Cell: ({ row }) => (
      <>
        <p>{row.original.phoneNumber}</p>
      </>
    ),
  },
  {
    Header: "Webinar ame",
    accessor: "webinarName",
  },
  {
    Header: "Referred By",
    accessor: "refferedBy",
  },
  {
    Header: "Language",
    accessor: "language",
  },
];

function Index() {
  const leads = useSelector((state) => state.leads);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { fetchAdminLeads, searchAdminLeads } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (!searchTerm || searchTerm === "") {
      fetchAdminLeads(skip, limit);
    } else {
      searchAdminLeads(searchTerm, skip, limit);
    }
  }, [skip, limit, searchTerm]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm.toLowerCase());
  };

  const TOTAL_PAGES = Math.ceil(leads?.adminLeads?.totalLeads / limit);

  return (
    <AdminLayout title="Lead center">
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Lead center</h3>

        <div className="ml-auto">
          <SearchInput placeholder="Search leads..." onChange={handleSearch} />
        </div>
      </div>

      <div className="leadCenter">
        {leads?.loading ? (
          "Loading"
        ) : (
          <>
            {leads?.error ? (
              <NetworkError error={leads?.error} />
            ) : (
              <>
                {leads?.adminLeads?.leads?.length > 0 ? (
                  <Table
                    DATA={leads?.adminLeads?.leads}
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
    </AdminLayout>
  );
}

export default Index;
