import React from "react";
import { Dropdown } from "semantic-ui-react";

interface IProps {
  input: any;
  meta: any;
  [key: string]: any; // Allow other props for flexibility
}

const DropdownInput: React.FC<IProps> = ({ input, meta, ...rest }) => {
  return (
    <Dropdown
      {...rest}
      value={input.value}
      onChange={(e, { value }) => input.onChange(value)}
      onBlur={() => input.onBlur(input.value)} // Ensure final-form validation is triggered
      onFocus={input.onFocus}
    />
  );
};

export default DropdownInput;
