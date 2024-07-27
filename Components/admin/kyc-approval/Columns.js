import getSymbolFromCurrency from "currency-symbol-map";

const options = [
  { value: 0, label: "Pending" },
  { value: 1, label: "Approve" },
  { value: 2, label: "Reject" },
];

export const approvalColumns = (updateStatus, showKyc) => {
  return [
    {
      Header: "Submitted date",
      accessor: "createdAt",
      Cell: ({ row }) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;

        const date = row.original?.createdAt ? row.original?.createdAt : today;

        return <p>{date}</p>;
      },
    },
    {
      Header: "User name",
      accessor: "userName",
      Cell: ({ row }) => (
        <>
          <p>{row.original.userName}</p>
        </>
      ),
    },
    {
      Header: "Show kyc",
      accessor: "kyc",
      Cell: ({ row }) => (
        <button
          onClick={() => showKyc(row.original)}
          className="text-blue-500 focus:outline-none"
        >
          Show kyc
        </button>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <select
          defaultValue={row.original.kycStatus}
          onChange={(e) =>
            updateStatus(row.original.customerId, e.target.value)
          }
          className="field2 text-sm"
        >
          {options.map((option, optionIdx) => (
            <option key={optionIdx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ),
    },
  ];
};
