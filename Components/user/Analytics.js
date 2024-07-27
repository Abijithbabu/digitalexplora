import { useEffect, useState } from "react";
import LineChart from "../LineChart";
import BarChart from "../BarChart";
import RevenuWidget from "../RevenuWidget";
import useFetchById from "@/hooks/useFetchById";
import getSymbolFromCurrency from "currency-symbol-map";
import { userRequests } from "@/config/requests";
import Brokenpage from "../Brokenpage";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "@/store";
import { userService } from "@/services";
import { BanknotesIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { PeopleOutlined } from "@mui/icons-material";

function Analytics() {
  const [alert, setAlert] = useState(null);
  const state = useFetchById(userRequests.getAnalytics);

  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  if (state.error) return <Brokenpage state={state} />;

  useEffect(() => {
    getKyc();
  }, []);

  const getKyc = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await userService.getKycStatus(user._id);
      const resJson = await res.json();

      if (res.ok) {
        setAlert(null);
      } else {
        setAlert(resJson.message);
      }
    } catch (error) {
      setMessage({ sc: "", er: error.message });
      setAlert(true);
    }

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:py-8 lg:px-0">
      {alert && (
        <div
          className="bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900 px-4 py-3 shadow-md mb-6"
          role="alert"
        >
          <div className="flex items-center">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-yellow-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">KYC alert</p>
              <p className="text-sm">{alert}</p>
            </div>
          </div>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-4 lg:gap-4 mb-6">
        <div className="bg-white shadow-xl rounded p-6 mb-4 lg:mb-0">
          <RevenuWidget
            title="Today Earned"
            value={`${getSymbolFromCurrency("INR")}${
              state?.data ? state?.data.todayEarned.toFixed(2) : "..."
            }`}
            Icon={CurrencyDollarIcon}
          />
        </div>

        <div className="bg-white shadow-xl rounded p-6 mb-4 lg:mb-0">
          <RevenuWidget
            title="Total Revenue"
            value={`${getSymbolFromCurrency("INR")}${
              state?.data ? state?.data?.totalEarned.toFixed(2) : "..."
            }`}
            Icon={BanknotesIcon}
          />
        </div>

        <div className="bg-white shadow-xl rounded p-6 mb-4 lg:mb-0">
          <RevenuWidget
            title="Team Revenue"
            value={`${getSymbolFromCurrency("INR")}${
              state?.data ? state?.data?.teamEarned.toFixed(2) : "..."
            }`}
            Icon={CurrencyDollarIcon}
          />
        </div>

        <div className="bg-white shadow-xl rounded p-6 mb-4 lg:mb-0">
          <RevenuWidget
            title="Number of teams"
            value={state?.data ? state?.data?.teamTotal.toFixed(2) : "..."}
            Icon={PeopleOutlined}
          />
        </div>
      </div>

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
  );
}

export default Analytics;
