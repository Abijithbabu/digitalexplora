import React from "react";
import UpArrow from "@mui/icons-material/ArrowUpward";
import DownArrow from "@mui/icons-material/ArrowDownward";
import Select from "react-dropdown-select";
import styles from "./sidebar.module.css";

function Sidebar() {
  const categories = [
    {
      value: "designing",
      label: "Designing",
    },
    {
      value: "development",
      label: "Development",
    },
    {
      value: "marketing",
      label: "Marketing",
    },
  ];

  return (
    <div className={styles.sidebar}>
      <label htmlFor="categories">All categories</label>
      <Select
        dropdownHandleRenderer={({ state }) => (
          // if dropdown is open show "–" else show "+"
          <span>{state.dropdown ? <UpArrow /> : <DownArrow />}</span>
        )}
        style={{ marginBottom: "20px" }}
        values={[]}
        options={categories}
        onChange={(value) => console.log(value)}
      />

      <p>Skill Levels</p>
      <div className="radio__group mb-3 d-flex items-center bg-transparent hover:bg-gray-300">
        <input
          type="radio"
          aria-label="skill"
          name="skill"
          id="kickstarter"
          value="kickstarter"
          className="w-4 h-4 border-2 cursor-pointer border-red-600 mr-2"
        />
        <label htmlFor="kickstarter" className="cursor-pointer">
          Affiliate Kickstarter
        </label>
      </div>
      <div className="radio__group mb-3 d-flex items-center bg-transparent hover:bg-gray-300">
        <input
          type="radio"
          aria-label="skill"
          name="skill"
          id="accelerator"
          value="accelerator"
          className="w-4 h-4 border-2 cursor-pointer border-red-600 mr-2"
        />
        <label htmlFor="accelerator" className="cursor-pointer">
          Affiliate Accelerator
        </label>
      </div>
      <div className="radio__group d-flex items-center bg-transparent hover:bg-gray-300">
        <input
          type="radio"
          aria-label="skill"
          name="skill"
          id="uplevel"
          value="uplevel"
          className="w-4 h-4 border-2 cursor-pointer border-red-600 mr-2"
        />
        <label htmlFor="uplevel" className="cursor-pointer">
          Affiliate Uplevel
        </label>
      </div>
    </div>
  );
}

export default Sidebar;
