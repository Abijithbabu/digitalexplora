import { Delete, Edit } from "@mui/icons-material";
import Link from "next/link";
import people from "../people.json";

export default function UsersTable() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto mb-4 border-b border-gray-200 rounded-xl">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {people.map((person, index) => (
                  <tr key={person.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={person.picture}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <Link href={`/admin/users/${index}`}>
                            <p>
                              <div className="text-sm font-medium text-gray-900">
                                {person.name.first} {person.name.last}
                              </div>
                            </p>
                          </Link>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.phone}
                      </div>
                      <div className="text-sm text-gray-500">
                        {person.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          person.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {person.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className="text-indigo-600 hover:text-indigo-500 hover:bg-indigo-50 p-3 w-8 h-8 rounded-md">
                        <Link
                          href={`/admin/users/${index}?edit=${person.name.first}`}
                        >
                          <p>
                            <Edit fontSize="small" />
                          </p>
                        </Link>
                      </span>
                      <span className="text-red-600 hover:text-red-500 hover:bg-red-50 p-3 w-8 h-8 rounded-md">
                        <Link href={`/admin/users/${index}?=Delete`}>
                          <p>
                            <Delete fontSize="small" />
                          </p>
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
