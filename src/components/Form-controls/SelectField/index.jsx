import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  selectList: PropTypes.array,
};

function SelectField(props) {
  const { form, name, label, disabled, selectList } = props;
  const { errors } = form;
  const hasError = !!errors[name];

  return (
    <FormControl variant="outlined" margin="normal" fullWidth error={hasError}>
      {label && <InputLabel htmlFor={`${name}-select`}>{label}</InputLabel>}
      <Controller
        control={form.control}
        name={name}
        as={
          <Select id={`${name}-select`} native>
            {selectList.map((answer) => (
              <option disabled={answer.disabled} key={answer.value} value={answer.value}>
                {answer.text}
              </option>
            ))}
          </Select>
        }
        label={label}
        disabled={disabled}
        error={hasError}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}
export default SelectField;
