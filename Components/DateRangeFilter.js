import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store";

function DateRangeFilter({ dateRange, className }) {
  const dispatch = useDispatch();
  const { setDateRange } = bindActionCreators(actionCreators, dispatch);

  return (
    <DateRangePicker
      className={className}
      ranges={dateRange}
      onChange={(item) => setDateRange([item.selection])}
      moveRangeOnFirstSelection={false}
    />
  );
}

export default DateRangeFilter;
