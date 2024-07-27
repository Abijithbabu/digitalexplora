// payouts table columns
export const COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Name",
    accessor: "firstname",
    Cell: ({ row }) => (
      <span>
        {row.original.first_name} {row.original.last_name}
      </span>
    ),
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Product",
    accessor: "product",
  },
  {
    Header: "Commission",
    accessor: "commission",
  },
];
