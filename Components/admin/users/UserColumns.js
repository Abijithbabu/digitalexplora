import { Block, CheckCircle, Edit } from "@mui/icons-material";
import Router from "next/router";
import Link from "next/link";
import { userService } from "../../../services";

export const UserColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => (
      <Link href={`/admin/users/${row.original._id}`}>
        <p
          className="flex items-center"
          onClick={() => Router.push(`/admin/users/${row.original._id}`)}
        >
          {row.original.picture ? (
            <span
              className="rounded-md"
              src={row.original.image}
              alt={row.original.userName}
            />
          ) : (
            <span
              alt={row.original.userName}
              className="capitalize rounded-md flex items-center justify-center bg-gray-800 text-white font-bold w-8 h-8 border-2 border-red-500"
            >
              {row.original.userName.charAt(0)}
            </span>
          )}
          <span className="ml-3 text-left text-sm">
            <span className="name text-blue-500 font-bold capitalize block">
              {row.original.userName}
            </span>
            <span className="email text-gray-800 font-medium block">
              {row.original.email}
            </span>
          </span>
        </p>
      </Link>
    ),
  },
  {
    Header: "Contact",
    accessor: "phone",
    Cell: ({ row }) => (
      <div>
        <p className="text-gray-800 font-medium block">
          {row.original.phoneNumber}
        </p>
        <p className=" text-gray-800 font-medium block">
          5 Middle River Drive Hudsonville, MI 49426
          {/* {row.original.address} */}
        </p>
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => (
      <div>
        {row.original.isAcitve ? (
          <span className="capitalize py-1 px-4 text-xs bg-gray-800 text-green-300 font-medium rounded-full">
            active
          </span>
        ) : (
          <span className="capitalize py-1 px-4 text-xs bg-gray-800 text-red-300 font-medium rounded-full">
            in active
          </span>
        )}
      </div>
    ),
  },
  {
    Header: "Actions",
    accessor: "id",
    Cell: ({ row }) => (
      <div className="actions">
        <Link
          href={`/admin/users/${row.original._id}?edit=${row.original.userName}`}
        >
          <p
            href={`/admin/users/${row.original._id}?edit=${row.original.userName}`}
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
          title={`${
            row.original.isAcitve ? "Suspend User" : "Make user Active"
          }`}
          className={`focus:outline-none text-gray-500 ${
            row.original.isAcitve
              ? "hover:text-red-500"
              : "hover:text-green-500"
          } ml-4`}
          onClick={async () => {
            userService
              .suspendUser(row.original._id)
              .then((res) => {
                if (res.ok) {
                  return res.json();
                } else {
                  throw res;
                }
              })
              .then(async (resJson) => {
                console.log(resJson.message);
              });
          }}
        >
          {row.original.isAcitve ? (
            <Block fontSize="small" />
          ) : (
            <CheckCircle fontSize="small" />
          )}
        </button>
      </div>
    ),
  },
];
