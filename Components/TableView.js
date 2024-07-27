import { useMemo } from "react";
import Link from "next/link";
import { Puff } from "react-loader-spinner";
import { Block, CheckCircle, ChevronLeft, ChevronRight, Edit } from "@mui/icons-material";

function TableView({
  DATA,
  COLUMNS,
  limit,
  skip,
  setSkip,
  setLimit,
  totalPages,
  suspendUser,
  loading,
}) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, [DATA]);

  function goToNextPage() {
    setSkip((skip) => skip + 1);
  }

  function goToPreviousPage() {
    setSkip((skip) => skip - 1);
  }

  const handlePageSize = (e) => {
    setLimit(Number(e.target.value));
  };

  // const getPaginatedData = () => {
  //   // not yet implemented
  // };

  // const getPaginationGroup = () => {
  //   // not yet implemented
  // };

  return (
    <div className="sm:w-full lg:w-full rounded-lg overflow-auto">
      <table className="w-full">
        <thead className="text-gray-500 bg-blue-50 mb-2 sm:mb-0">
          <tr>
            {columns.map((column, i) => {
              return (
                <th
                  className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-left"
                  key={i}
                >
                  {column.Header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td className="py-4 px-6 text-gray-900 font-medium">
                  {item.profilePic ? (
                    <div className="flex items-center">
                      <img
                        className="rounded-full w-9 h-9 object-cover"
                        src={item.profilePic}
                        alt={item.userName}
                      />
                      <div className="ml-4">
                        <Link href={`/admin/users/${item._id}`}>
                          <p>
                            <p className=" font-semibold text-blue-600 cursor-pointer">
                              {item.userName}
                            </p>
                          </p>
                        </Link>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span
                        alt={item.userName}
                        className="capitalize rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold w-9 h-9"
                      >
                        {item.userName.charAt(0)}
                      </span>
                      <div className="ml-4">
                        <Link href={`/admin/users/${item._id}`}>
                          <p>
                            <p className=" font-semibold text-blue-600 cursor-pointer lowercase">
                              {item.userName}
                            </p>
                          </p>
                        </Link>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  <p className="truncate w-64">{item.address}</p>
                  <p>{item.phoneNumber}</p>
                </td>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  {item.isAcitve ? (
                    <span className="bg-green-100 text-green-600 py-1 px-4 text-xs font-medium rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 py-1 px-4 text-xs font-medium rounded-full">
                      In Active
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 text-gray-700 font-medium">
                  <div className="flex items-center">
                    <Link
                      href={`/admin/users/${item._id}?edit=${item.userName}`}
                    >
                      <p
                        href={`/admin/users/${item._id}?edit=${item.userName}`}
                      >
                        <span
                          title="Edit User"
                          className="focus:outline-none text-gray-500 hover:text-blue-500"
                        >
                          <Edit fontSize="small" />
                        </span>
                      </p>
                    </Link>
                    <button
                      title={`${item.isAcitve ? "Suspend User" : "Make user Active"
                        }`}
                      className={`focus:outline-none text-gray-500 ml-4 ${item.isAcitve
                          ? "hover:text-red-500"
                          : "hover:text-green-500"
                        } ml-4`}
                      onClick={() => {
                        suspendUser(item._id);
                      }}
                    >
                      {loading ? (
                        <Puff
                          visible={true}
                          color="#2563EB"
                          height={20}
                          width={20}
                          ariaLabel="puff-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : item.isAcitve ? (
                        <Block fontSize="small" />
                      ) : (
                        <CheckCircle fontSize="small" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className="bg-gray-50 px-4 py-3 flex items-center justify-between sm:px-6 text-xs"
        style={{ minWidth: "720px" }}
      >
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            onClick={goToPreviousPage}
            disabled={skip === 0}
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={skip === totalPages - 1}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
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

export default TableView;
