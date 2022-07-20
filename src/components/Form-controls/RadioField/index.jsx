import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

RadioField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function RadioField(props) {
  const { form, name, label, disabled, answerList } = props;
  const { errors } = form;
  const hasError = !!errors[name];

  const labelAnswer = ['Chọn đáp án A', 'Chọn đáp án B', 'Chọn đáp án C', 'Chọn đáp án D'];

  return (
    <div>
      <FormControl component="fieldset">
        <Controller
          name={name}
          control={form.control}
          as={
            <RadioGroup aria-label="answer" name="answer">
              {answerList.map((answer, index) => (
                <FormControlLabel
                  key={answer.code}
                  value={answer.code}
                  control={<Radio />}
                  label={labelAnswer[index]}
                />
              ))}
            </RadioGroup>
          }
          id={name}
          label={label}
          disabled={disabled}
        />
      </FormControl>
    </div>
  );
}

export default RadioField;
