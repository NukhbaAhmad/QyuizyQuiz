import { FormLabelPropsT } from "../../types";

const Label: React.FC<FormLabelPropsT> = ({ title }) => {
  return (
    <label
      htmlFor="Number of Questions"
      className="block mb-1 mt-8 text-sm font-medium text-gray-900 dark:text-white"
    >
      {title}
    </label>
  );
};

export default Label;
