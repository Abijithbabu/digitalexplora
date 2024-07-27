import getSymbolFromCurrency from "currency-symbol-map";

const options = [
  { value: 1, label: "Pending" },
  { value: 2, label: "Paid" },
  { value: 3, label: "Refund" },
];

export const allStatusColumns = (
  updateStatus,
  showKyc,
  NumberRangeColumnFilter
) => {
  return [
    {
      Header: "Product Name",
      accessor: "productName",
    },
    {
      Header: "Created date",
      accessor: "createdDateISO",
      Cell: ({ row }) => {
        const date = new Date(row.original.createdDateISO);

        return (
          <>
            <p>
              {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </p>
          </>
        );
      },
    },
    {
      Header: "Commission Type",
      accessor: "commissionType",
    },
    {
      Header: "Referred By",
      accessor: "referred",
      Cell: ({ row }) => (
        <button
          onClick={() => showKyc(row.original.referredId)}
          className="text-blue-600 font-semibold focus:outline-none"
        >
          {row.original.referred}
        </button>
      ),
    },
    {
      Header: "Bought by",
      accessor: "name",
    },
    {
      Header: "Referral Earnings",
      accessor: "referralEarned",
      Filter: NumberRangeColumnFilter,
      filter: "between",
      Cell: ({ row }) => (
        <p>
          {getSymbolFromCurrency("INR")}
          {row.original.referralEarned.toFixed(2)}
        </p>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <select
          defaultValue={row.original.status}
          onChange={(e) => updateStatus(row.original._id, e.target.value)}
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
