import { ChartBarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AdminLayout from "../../../Components/admin/AdminLayout";
import AdminNavbar from "../../../Components/admin/AdminNavbar";
import Table from "../../../Components/Table";
import { payoutRequests } from "../../../config/requests";
import useFetchData from "../../../hooks/useFetchData";
import NetworkError from "../../../Components/NetworkError";
import ELoading from "../../../Components/ELoading";

function paymentlog() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const userId = false;

  const { state } = useFetchData(
    `${payoutRequests.getPaymentlog}/${skip}/${limit}`,
    userId
  );
  const TOTAL_PAGES = Math.ceil(state?.data?.length / limit);

  const COLUMNS = [
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Error source",
      accessor: "error_source",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Event",
      accessor: "event",
    },
    {
      Header: "Contact",
      accessor: "contact",
    },
    {
      Header: "Card",
      accessor: "card_id",
    },
    {
      Header: "Date",
      accessor: "paymentDateISO",
      Cell: ({ row }) => {
        const date = new Date(row.original.paymentDateISO);

        function convert(str) {
          var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
          return [day, mnth, date.getFullYear()].join("-");
        }

        return (
          <>
            <p className="w-24">{convert(date)}</p>
          </>
        );
      },
    },
    {
      Header: "Payment Id",
      accessor: "paymentId",
    },
    {
      Header: "Order Id",
      accessor: "orderId",
    },
  ];

  return (
    <AdminLayout title="Payment log">
      
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Payment log</h3>
      </div>

      {state?.error ? (
        <NetworkError error={state?.error} />
      ) : (
        <div className="paymentLog">
          {!state.loading ? (
            <>
              {state?.data?.length > 0 ? (
                <Table
                  DATA={state?.data}
                  COLUMNS={COLUMNS}
                  totalPages={TOTAL_PAGES}
                  skip={skip}
                  limit={limit}
                  setSkip={setSkip}
                  setLimit={setLimit}
                />
              ) : (
                <p>Currently no logs captured</p>
              )}
            </>
          ) : (
            <ELoading />
          )}
        </div>
      )}
    </AdminLayout>
  );
}

export default paymentlog;
