import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
const renderSwitch = ({ input, label, ...rest }) => (
    <FormControlLabel
      control={
        <Switch
          {...input}
          {...rest}
          valueSelected={input.value}
          onChange={(event, value) => input.onChange(value)}
        />
      }
      label={label}
    />
  );

  export default renderSwitch