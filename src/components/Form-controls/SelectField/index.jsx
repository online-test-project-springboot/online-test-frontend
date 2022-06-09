import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function SelectField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = !!errors[name];
  const answerList = [
    { value: 'A', text: 'Đáp án 1' },
    { value: 'B', text: 'Đáp án 2' },
    { value: 'C', text: 'Đáp án 3' },
    { value: 'D', text: 'Đáp án 4' },
  ];
  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
    <InputLabel htmlFor={`${name}-select`}>{label}</InputLabel>
    <Controller
      control={form.control}
      name={name}
      as={
        <Select id={`${name}-select`} native>
          {answerList.map((answer) => (
            <option key={answer.value} value={answer.value}>
              {answer.text}
            </option>
          ))}
        </Select>
      }
      label={label}
      disabled={disabled}
      error={hasError}
      helpertext={errors[name]?.message}
    />
  </FormControl>
  );
}
export default SelectField;