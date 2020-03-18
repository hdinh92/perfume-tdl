import { Checkbox, FormControlLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);
renderCheckbox.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
};
export default renderCheckbox;
