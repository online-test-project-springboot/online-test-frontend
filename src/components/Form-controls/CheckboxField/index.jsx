import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

CheckboxField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  answerList: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
}));

function CheckboxField(props) {
  const { form, name, label, disabled, checked, onChange } = props;
  const { errors } = form;
  const hasError = !!errors[name];
  const classes = useStyles();
  const handleOnChange = (e) => {
    if (onChange) return onChange(e);
  };

  console.log(name);

  // <GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />;
  return (
    <Controller
      control={form.control}
      name={name}
      render={(props) => (
        <Checkbox
          color="default"
          className={classes.root}
          checked={props.value}
          onChange={(e) => props.onChange(e.target.checked)}
        />
      )}
      label={label}
      disabled={disabled}
      error={hasError}
    />

    // <FormControl variant="outlined" margin="normal" fullWidth error>
    //   {label && <InputLabel htmlFor={`${name}-select`}>{label}</InputLabel>}
    //   <Controller
    //     control={form.control}
    //     name={name}

    //     label={label}
    //     disabled={disabled}
    //     error={hasError}
    //   />
    //   <FormHelperText>{errors[name]?.message}</FormHelperText>
    // </FormControl>
  );
}
export default CheckboxField;
