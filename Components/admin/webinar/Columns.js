export const COLUMNS = [
  {
    Header: "User name",
    accessor: "userName",
    Cell: ({ row }) => (
      <>
        <p>{row.original.userName}</p>
      </>
    ),
  },
];
