import { AttachMoney } from "@mui/icons-material";
import { Bar } from "react-chartjs-2";
import { TotalPayout_Options } from "./admin/TotalPayout_Data";

function TotalPayout({ TotalPayout_Data }) {
  return (
    <div className="shadow-lg rounded-lg p-6 bg-white dark:bg-gray-700 w-full">
      <div className="flex items-center mb-10">
        <span className="rounded-xl relative p-2 bg-blue-100">
          <AttachMoney style={{ color: "blue" }} />
        </span>
        <div className="flex flex-col">
          <span className="font-semibold text-md text-gray-900 ml-2">
            Total payout
          </span>
          <span className="text-sm text-gray-500 ml-2">
            Overview of latest month
          </span>
        </div>
      </div>

      {/* chart */}
      <div className="chart">
        <Bar data={TotalPayout_Data} options={TotalPayout_Options} />
      </div>

      <div className="flex justify-between mt-10">
        <div className="values">
          <div className="value text-3xl text-gray-700 font-bold">34%</div>
          <div className="title text-sm text-gray-400">
            <span className="w-1 h-1 mr-1 bg-red-600 rounded-full"></span> This
            month
          </div>
        </div>
        <div className="values">
          <div className="value text-3xl text-gray-700 font-bold">20%</div>
          <div className="title text-sm text-gray-400">
            <span className="w-1 h-1 mr-1 bg-yellow-400 rounded-full"></span>
            This week
          </div>
        </div>
        <div className="values">
          <div className="value text-3xl text-gray-700 font-bold">14%</div>
          <div className="title text-sm text-gray-400">
            <span className="w-1 h-1 mr-1 bg-blue-800 rounded-full"></span>
            Last month
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalPayout;
