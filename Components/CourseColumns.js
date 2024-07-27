import { Delete, Edit } from "@mui/icons-material";
import Link from "next/link";

export const COLUMNS = [
  {
    Header: "Course Name",
    accessor: "name",
    Cell: ({ row }) => (
      <Link href={`/admin/courses/${row.id}?=${row.original.name}`}>
        <p className="text-blue-600">{row.original.name}</p>
      </Link>
    ),
  },
  {
    Header: "Created Date",
    accessor: "createdDate",
  },
  {
    Header: "Total Modules",
    accessor: "totalModules",
  },
  {
    Header: "Total Lessons",
    accessor: "totalLessons",
  },
  {
    Header: "Actions",
    accessor: "id",
    Cell: ({ row }) => (
      <div className="actions">
        <Link href={`/admin/courses/${row.id}?edit=${row.original.name}`}>
          <p>
            <button className="focus:outline-none text-gray-400 hover:text-indigo-600">
              <Edit fontSize="small" />
            </button>
          </p>
        </Link>
        <button
          className="focus:outline-none text-gray-400 hover:text-indigo-600 ml-2"
          onClick={deleteCourse(row.id)}
        >
          <Delete fontSize="small" />
        </button>
      </div>
    ),
  },
];
