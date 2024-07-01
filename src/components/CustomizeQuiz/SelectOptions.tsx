import { SelectOptionsCompPropsT } from "../../types";

const SelectOptions: React.FC<SelectOptionsCompPropsT> = ({
  name,
  options,
  optionLabel,
  value,
  onChange,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 pe-3"
    >
      <option value="any" hidden disabled>{optionLabel}</option>
      {options
        .map((option) => (
          <option key={option.type} value={option.type}>
            {option.val}
          </option>
        ))}
    </select>
  );
};
export default SelectOptions;
