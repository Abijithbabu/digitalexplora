export const allStatusColumns = [
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
            {date.getDate()} - {date.getMonth()} - {date.getFullYear()}
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
  },
  {
    Header: "Status",
    accessor: "statusText",
    Cell: ({ row }) => (
      <p
        className={`${
          row.original.status === 1
            ? "bg-yellow-100 text-yellow-500"
            : row.original.status === 2
            ? "bg-blue-100 text-blue-500"
            : row.original.status === 3
            ? "bg-green-100 text-green-500"
            : ""
        }  font-semibold text-xs rounded-full text-center py-1`}
      >
        {row.original.status === 1
          ? "Pending"
          : row.original.status === 2
          ? "Paid"
          : row.original.status === 3
          ? "Refund"
          : ""}
      </p>
    ),
  },
];
