import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import {useForm} from './useForm';

function SQFormMultiSelect({
  children,
  isDisabled = false,
  isRequired = false,
  label,
  name,
  onBlur,
  onChange,
  size = 'auto'
}) {
  const {
    formikField: {field},
    fieldState: {isFieldError},
    fieldHelpers: {handleBlur, handleChange, HelperTextComponent}
  } = useForm({
    name,
    isRequired,
    onBlur,
    onChange
  });
  const labelID = label.toLowerCase();

  const handleMultiSelectChange = evt => {
    const selectAllWasChecked = evt.target.value.includes('ALL');
    const selectNoneWasChecked = evt.target.value.includes('NONE');

    const values = selectAllWasChecked
      ? children.map(option => option.value)
      : selectNoneWasChecked
      ? []
      : evt.target.value;
    evt.target.value = values;
    handleChange(evt);
  };

  return (
    <Grid item sm={size}>
      <InputLabel id={labelID}>{label}</InputLabel>
      <Select
        multiple
        input={<Input disabled={isDisabled} name={name} />}
        value={field.value}
        onBlur={handleBlur}
        onChange={handleMultiSelectChange}
        fullWidth={true}
        labelId={labelID}
        renderValue={selected => selected.join(', ')}
      >
        <MenuItem
          value={children.length === field.value.length ? 'NONE' : 'ALL'}
        >
          <Checkbox checked={children.length === field.value.length} />
          <ListItemText primary="Select All" />
        </MenuItem>
        {children.map(option => {
          return (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={field.value.includes(option.value)} />
              <ListItemText primary={option.value} />
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText error={isFieldError} required={isRequired}>
        {HelperTextComponent}
      </FormHelperText>
    </Grid>
  );
}

SQFormMultiSelect.propTypes = {
  /** Multiselect options to select from */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Required property used to highlight input and label if not fulfilled */
  isRequired: PropTypes.bool,
  /** Label text */
  label: PropTypes.string.isRequired,
  /** Name identifier of the input field */
  name: PropTypes.string.isRequired,
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
};

export default SQFormMultiSelect;
