import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function MultiSelect({ options, defaultValue, handleSelect }) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={defaultValue}
      className="capitalize"
      isMulti
      options={options}
      onChange={handleSelect}
    />
  );
}

export default MultiSelect;
