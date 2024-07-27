import { DesktopComputerIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";

import Brokenpage from "../../Brokenpage";
import SearchInput from "../../SearchInput";
import AddWebinarModal from "./AddWebinarModal";
import NoData from "../../NoData";

function checkUrl(url) {
  if (!url) return null;
  return url.match(/\.(jpeg|jpg|gif|png|JPG)$/) != null;
}

function Webinar() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { webinars, totalWebinars, error } = useSelector(
    (state) => state.webinar
  );
  const { fetchAllWebinars } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (!searchTerm) {
      fetchAllWebinars(skip, limit);
    } else {
      console.log(searchTerm);
    }
  }, [skip, limit, searchTerm]);

  function handleSearch(e) {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm.toLowerCase());
  }

  const handleClick = () => {
    setShowModal(true);
  };

  if (error) return <Brokenpage error={error} />;

  return (
    <div>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Webinars</h3>

        <SearchInput
          placeholder="Search webinar..."
          onChange={handleSearch}
          value={searchTerm}
        />

        <button
          className="userBtn w-full font-medium sm:w-auto sm:ml-2 py-2"
          onClick={handleClick}
        >
          Add Webinar page
        </button>
      </div>

      <div className="block sm:grid gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {webinars ? (
          <>
            {webinars?.length > 0 ? (
              <>
                {webinars.map((webinar) => (
                  <Link
                    href={`/admin/webinar/${webinar.slug}`}
                    key={webinar._id}
                  >
                    <p>
                      <div className="bg-white rounded shadow hover:shadow-xl transition-all ease-in-out duration-300 overflow-hidden mb-2 lg:mb-0 cursor-pointer">
                        <img
                          src={
                            checkUrl(webinar.featuredImage)
                              ? webinar.featuredImage
                              : "https://dummyimage.com/300x150"
                          }
                          alt={webinar.webinarName}
                          className="object-cover w-full h-32"
                        />
                        <div className="content p-6">
                          <h2
                            className="capitalize text-gray-700 font-bold truncate w-full"
                            title={webinar.webinarName}
                          >
                            {webinar.webinarName}
                          </h2>
                          <p className="text-sm text-gray-500 mt-2">
                            {webinar.description}
                          </p>
                        </div>
                      </div>
                    </p>
                  </Link>
                ))}
              </>
            ) : (
              <NoData />
            )}
          </>
        ) : (
          "Loading"
        )}
      </div>

      <AddWebinarModal
        showModal={showModal}
        setShowModal={setShowModal}
        skip={skip}
        limit={limit}
      />
    </div>
  );
}

export default Webinar;
