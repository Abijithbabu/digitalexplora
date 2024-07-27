import {
  useTable,
  usePagination,
  useRowSelect,
  useFilters,
  useGlobalFilter,
} from "react-table";
import React, { useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function Table({
  DATA,
  COLUMNS,
  limit,
  skip,
  setSkip,
  setLimit,
  totalPages,
  multiSelect,
}) {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => DATA, [DATA]);

  const dispatch = useDispatch();
  const { storeRowsData } = bindActionCreators(actionCreators, dispatch);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <>
              {multiSelect && (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              )}
            </>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <>
              {multiSelect && (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              )}
            </>
          ),
        },
        ...columns,
      ]);
    }
  );

  function goToNextPage() {
    setSkip((skip) => skip + 1);
  }

  function goToPreviousPage() {
    setSkip((skip) => skip - 1);
  }

  const handlePageSize = (e) => {
    setLimit(Number(e.target.value));
    setPageSize(Number(e.target.value));
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;

  useEffect(() => {
    if (selectedFlatRows) {
      const data = selectedFlatRows.map((row) => row.original);

      storeRowsData(data);
    }
  }, [selectedRowIds]);

  return (
    <div className="overflow-auto rounded shadow-xl">
      <table {...getTableProps()} className="rounded overflow-hidden w-full">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="text-gray-500 bg-blue-50 mb-2 sm:mb-0"
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  key={index}
                  className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={index}
                className="rounded-lg mb-2 sm:mb-0"
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      className="py-3 px-6 text-gray-700 font-medium"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between sm:px-6 text-xs pagination">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            onClick={goToPreviousPage}
            disabled={skip === 0}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={skip === totalPages - 1}
            className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          >
            Next
          </button>
        </div>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="hidden md:block">
            <span className="text-xs text-gray-700">
              Showing{" "}
              <span className="font-bold">
                {skip + 1}-{Math.min(skip + limit, DATA.length)}
              </span>{" "}
              of <span className="font-bold">{totalPages}</span> pages
            </span>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <select
                value={limit}
                disabled={totalPages === 1}
                className="bg-white p-3 text-xs rounded-md"
                onChange={handlePageSize}
              >
                {[10, 25, 50].map((limit) => (
                  <option key={limit} value={limit}>
                    Show {limit}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSkip(0)}
                disabled={skip === 0}
                className="relative hidden md:inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                {"<<"}
              </button>
              <button
                onClick={goToPreviousPage}
                disabled={skip === 0}
                className="relative hidden md:inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* {Array(totalPages)
                .fill()
                .map((_, i) => (
                  <button
                    key={i}
                    onClick={changePage}
                    className={`relative hidden md:inline-flex items-center px-4 py-2 text-sm font-medium focus:outline-none ${
                      i === skip
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-gray-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))} */}
              <button className="bg-blue-600 text-white relative hidden md:inline-flex items-center px-4 py-2 text-sm font-medium focus:outline-none">
                {skip + 1}
              </button>

              <button
                onClick={goToNextPage}
                disabled={skip === totalPages - 1}
                className="relative hidden md:inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                onClick={() => setSkip(totalPages - 1)}
                disabled={skip === totalPages - 1}
                className="relative hidden md:inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                {">>"}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
