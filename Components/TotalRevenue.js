import { BarChart } from "@mui/icons-material";
import React from "react";
import { Bar } from "react-chartjs-2";
import getSymbolFromCurrency from "currency-symbol-map";

function TotalRevenue({ data, options }) {
  return (
    <div className="shadow-lg rounded-lg p-5 bg-white dark:bg-gray-700 w-full">
      <div className="lg:flex text-center lg:text-left">
        <div className="w-full grid grid-cols-2 gap-4 items-center lg:block lg:w-4/12">
          <div className="flex items-center justify-center md:justify-start">
            <span className="rounded-xl relative p-2 bg-green-100">
              <BarChart style={{ color: "green" }} />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-md text-gray-900 ml-2">
                Total Revenue
              </span>
              <span className="text-sm text-gray-500 ml-2">
                Overview of latest month
              </span>
            </div>
          </div>
          <div className="lg:mt-6 currentMonth">
            <h3 className="font-bold text-lg md:text-3xl text-gray-700">
              {getSymbolFromCurrency("INR")}3468.96
            </h3>
            <p className="text-sm text-gray-500">Current Month Earnings</p>
          </div>
          <div className="lg:mt-6 currentMonth">
            <h3 className="font-bold text-lg md:text-3xl text-gray-700">86</h3>
            <p className="text-sm text-gray-500">Current Month Sales</p>
          </div>
          <div className="lg:mt-6 currentMonth">
            <button className="bg-red-500 text-white p-4 rounded-md">
              Last Month Summary
            </button>
          </div>
        </div>

        <div className="w-full md:w-8/12 mt-4 md:mt-0">
          <div className="flex rangeFilter">
            <button className="bg-transparent mr-6 text-sm">DAILY</button>
            <button className="bg-transparent mr-6 text-sm">WEEKLY</button>
            <button className="bg-transparent mr-6 text-sm">MONTHLY</button>
            <button className="bg-transparent text-sm">YEARLY</button>
          </div>
          <div className="chart mt-3">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalRevenue;
