import DateRangeFilter from "../../DateRangeFilter";
import { CalendarIcon } from "@heroicons/react/24/solid";
import getSymbolFromCurrency from "currency-symbol-map";
import { useState } from "react";
import SearchInput from "@/Components/SearchInput";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "@/store";
import { bindActionCreators } from "redux";
import { Slider } from "@mui/material";

function valuetext(value) {
  return `${getSymbolFromCurrency("INR")}${value}`;
}

function TableFilter({ applyFilters, resetFilters }) {
  const { rowsData, dateRange, referralValue, searchQuery } = useSelector(
    (state) => state.table
  );
  const [dateFilter, setDateFilter] = useState(false);

  const dispatch = useDispatch();
  const { handlePaidStatus, setReferralValue, setDateRange, setSearchTerm } =
    bindActionCreators(actionCreators, dispatch);

  return (
    <div className="flex items-center mb-6">
      <div className="dateFilter relative flex items-center field2 rounded-none text-sm w-auto">
        <button
          className="flex items-center focus:outline-none"
          onClick={() => setDateFilter((prevState) => !prevState)}
        >
          <label className="mb-0 text-xs">
            {dateRange[0]?.startDate ? (
              <>
                {dateRange[0]?.startDate.getDate()}-
                {dateRange[0]?.startDate?.getMonth() + 1}-
                {dateRange[0]?.startDate?.getFullYear()}
              </>
            ) : (
              "Start date"
            )}
            {"  "}|
          </label>

          <label className="mb-0 text-xs ml-1">
            {dateRange[0]?.endDate ? (
              <>
                {dateRange[0]?.endDate?.getDate()}-
                {dateRange[0]?.endDate?.getMonth() + 1}-
                {dateRange[0]?.endDate?.getFullYear()}
              </>
            ) : (
              "End date"
            )}
          </label>
          <CalendarIcon className="w-5 h-5 text-gray-400 ml-4" />
        </button>
        {dateFilter && (
          <DateRangeFilter
            className="absolute top-full left-0 w-full z-30 dateRangeFilter"
            dateRange={dateRange}
          />
        )}
      </div>
      <div className="amountFilter ml-4 flex items-center">
        <p className="text-xs font-semibold text-gray-500 mr-4 block w-8">
          {referralValue[0]}
        </p>
        <div>
          <label htmlFor="Price range" className="mb-0 text-xs">
            Referral Earnings:
          </label>
          <Slider
            min={0}
            max={100000}
            getAriaLabel={() => "Price range"}
            value={referralValue}
            onChange={(event, newValue) => setReferralValue(newValue)}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </div>
        <p className="text-xs font-semibold text-gray-500 ml-4 block">
          {referralValue[1]}
        </p>
      </div>

      <button
        className="userBtn py-2 text-xs border-0 ml-4"
        onClick={applyFilters}
      >
        Apply
      </button>

      <button
        className="btn bg-gray-500 text-white py-2 ml-2 text-xs border-0"
        onClick={resetFilters}
      >
        Reset
      </button>

      {rowsData?.length > 0 && (
        <div className="ml-3 flex items-center">
          <button
            className="btn bg-blue-600 text-white text-xs font-semibold py-2"
            onClick={() => handlePaidStatus(rowsData, 2)}
          >
            Set Paid
          </button>
          <button
            className="btn bg-yellow-400 text-xs font-semibold py-2 ml-2"
            onClick={() => handlePaidStatus(rowsData, 1)}
          >
            Set Pending
          </button>
          <button
            className="btn bg-green-600 text-white text-xs font-semibold py-2 ml-2"
            onClick={() => handlePaidStatus(rowsData, 3)}
          >
            Set Refund
          </button>
        </div>
      )}

      <SearchInput
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchTerm(e.target.value)}
        classList="focus-within:border-gray-800 field2 flex rounded-none lg:w-44 items-center text-sm ml-auto"
      />
    </div>
  );
}

export default TableFilter;
