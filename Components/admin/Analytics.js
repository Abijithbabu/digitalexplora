import { useSelector } from "react-redux";
import RevenuWidget from "../RevenuWidget";
import LineChart from "../LineChart";
import BarChart from "../BarChart";

import getSymbolFromCurrency from "currency-symbol-map";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { PeopleOutlined } from "@mui/icons-material";

function Analytics({ data }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="analytics">
      <div className="flex items-center mb-6 justify-center lg:justify-between">
        <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
      </div>

      {/* <div className="md:grid md:grid-cols-2 md:gap-4 items-center">
        <div className="dashboard_userProfile text-center">
          <img
            src={
              checkUrl(user?.profilePic)
                ? user?.profilePic
                : "/img/no_image.jpg"
            }
            className="w-24 h-24 object-cover rounded-full mx-auto mb-6"
            alt={user?.userName}
          />
          <h4 className="font-bold mb-2">
            {user?.firstName} {user?.lastName}
          </h4>
          <p className="text-gray-400 font-medium">{user?.email}</p>
          <p className="text-gray-400 font-medium">
            {user?.countryCode}-{user?.phoneNumber}
          </p>
        </div>
      </div> */}

      <div className="md:grid md:grid-cols-5 md:gap-6 mb-6">
        <div
          className="shadow-md rounded-lg p-8 mb-4 lg:mb-0 flex flex-col justify-end"
          style={{
            background:
              "url('https://swall.teahub.io/photos/small/95-956642_white-minimalist-mac.jpg') center center no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h3 className="text-2xl font-bold">
            {getSymbolFromCurrency("INR")}
            {data?.totalEarned ? data?.totalEarned.toFixed(2) : 0}
          </h3>
          <p className="font-medium">Total Revenue</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-4 lg:mb-0">
          <RevenuWidget
            title="Today Earned"
            value={`${getSymbolFromCurrency("INR")}${
              data?.todayEarned ? data?.todayEarned.toFixed(2) : 0
            }`}
            valueIncreased={
              data?.todayIncreased ? Math.ceil(data?.todayIncreased) : 0
            }
            Icon={CurrencyDollarIcon}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-4 lg:mb-0">
          <RevenuWidget
            title="Monthly Earned"
            value={`${getSymbolFromCurrency("INR")}${
              data?.monthEarned ? data?.monthEarned.toFixed(2) : 0
            }`}
            valueIncreased={
              data?.monthIncreased ? Math.ceil(data?.monthIncreased) : 0
            }
            Icon={CurrencyDollarIcon}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-4 lg:mb-0">
          <RevenuWidget
            title="Team Revenue"
            value={`${getSymbolFromCurrency("INR")}${
              data?.teamEarned ? data?.teamEarned.toFixed(2) : 0
            }`}
            Icon={CurrencyDollarIcon}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <RevenuWidget
            title="Number of teams"
            value={data?.teamTotal ? data?.teamTotal.toFixed(2) : 0}
            Icon={PeopleOutlined}
          />
        </div>
      </div>

      <div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="mb-12 lg:mb-0 col-span-8">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-700">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-gray-300 mb-1 text-xs font-semibold">
                      Overview
                    </h6>
                    <h2 className="text-white text-xl font-semibold">
                      Sales value
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-auto">
                <div className="relative">
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full col-span-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h6 className="uppercase text-gray-400 mb-1 text-xs font-semibold">
                      Performance
                    </h6>
                    <h2 className="text-gray-700 text-xl font-semibold">
                      Total orders
                    </h2>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-auto">
                <div className="relative">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
