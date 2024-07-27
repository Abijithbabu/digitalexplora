import Link from "next/link";
import ELoading from "./ELoading";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

function Breadcrump({
  baseLink,
  baseTitle,
  id,
  edit,
  item,
  itemName,
  innerPage,
}) {
  return (
    <div className="block lg:flex justify-between items-center">
      <div className="flex breadcrumbs items-center py-4">
        <Link href={baseLink}>
          <p className="text-gray-800 font-semibold uppercase tracking-wider text-xs">
            {baseTitle}
          </p>
        </Link>

        <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-4" />

        <div className="currentPage">
          {edit || innerPage ? (
            <Link href={`${baseLink}/${id}`}>
              <p className="cursor-pointer text-gray-800 font-semibold uppercase tracking-wider text-xs">
                {itemName ?? <ELoading />}
              </p>
            </Link>
          ) : (
            <div className="text-gray-400 font-semibold uppercase tracking-wider text-xs">
              {itemName ?? <ELoading />}
            </div>
          )}
        </div>

        {innerPage && (
          <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-4" />
        )}

        {innerPage && (
          <div className="currentPage">
            <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs">
              {item}
            </h3>
          </div>
        )}

        {edit && <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-4" />}

        {edit && (
          <div className="currentPage">
            <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs">
              Edit
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Breadcrump;
