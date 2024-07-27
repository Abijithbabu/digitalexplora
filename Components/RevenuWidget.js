import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import React from "react";

function RevenuWidget({ title, Icon, value, valueIncreased }) {
  return (
    <div className="revenueWidget">
      <div className="lg:flex items-center justify-center lg:justify-between">
        <div>
          <h3 className="text-gray-600 uppercase text-xs font-semibold">
            {title}
          </h3>
          <p className="value font-bold text-gray-800 text-lg">{value}</p>
        </div>

        <Icon className="w-8 h-8 text-blue-800 mb-4 lg:mb-0" />
      </div>

      <p className="text-sm text-gray-500 mt-4 flex items-center">
        {Math.sign(valueIncreased) === 1 ? (
          <span className="text-green-500 mr-2 flex items-center font-semibold">
            <ArrowUpIcon className="inherit w-4 h-4" /> {valueIncreased}%
          </span>
        ) : Math.sign(valueIncreased) === -1 ? (
          <span className="text-red-500 mr-2 flex items-center font-semibold">
            <ArrowDownIcon className="inherit w-4 h-4" /> {valueIncreased}%
          </span>
        ) : (
          <span className="text-gray-500 mr-2 flex items-center font-semibold">
            0%
          </span>
        )}
        <span className="whitespace-nowrap">Since last month</span>
      </p>
    </div>
  );
}

export default RevenuWidget;
