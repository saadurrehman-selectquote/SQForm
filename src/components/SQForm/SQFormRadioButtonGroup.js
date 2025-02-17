import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import {SQFormRadioButtonGroupItem} from '../../../src';
import {useForm} from './useForm';

function SQFormRadioButtonGroup({
  name,
  onChange,
  isRequired = false,
  shouldDisplayInRow = false,
  size = 'auto',
  groupLabel,
  children
}) {
  const {
    formikField: {field},
    fieldHelpers: {handleChange, HelperTextComponent}
  } = useForm({
    name,
    isRequired,
    onChange
  });

  const childrenToRadioGroupItems = () => {
    return children.map(radioOption => {
      const {label, value, isDisabled, inputProps} = radioOption;
      return (
        <SQFormRadioButtonGroupItem
          label={label}
          value={value}
          isDisabled={isDisabled}
          isRowDisplay={shouldDisplayInRow}
          inputProps={inputProps}
          key={`SQFormRadioButtonGroupItem_${value}`}
        />
      );
    });
  };

  return (
    <Grid item sm={size}>
      <InputLabel id={groupLabel.toLowerCase()}>{groupLabel}</InputLabel>
      <RadioGroup
        value={field.value}
        row={shouldDisplayInRow}
        aria-label={`SQFormRadioButtonGroup_${name}`}
        name={name}
        onChange={handleChange}
      >
        {childrenToRadioGroupItems()}
      </RadioGroup>
      <FormHelperText required={isRequired}>
        {HelperTextComponent}
      </FormHelperText>
    </Grid>
  );
}

SQFormRadioButtonGroup.propTypes = {
  /** Name of the radio group */
  name: PropTypes.string.isRequired,
  /** Function to call on value change */
  onChange: PropTypes.func,
  /** Whether this radio selection is required */
  isRequired: PropTypes.bool,
  /** Whether to display group in row */
  shouldDisplayInRow: PropTypes.bool,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Label to display above the group */
  groupLabel: PropTypes.string.isRequired,
  /** Children must be an array of objects with radio button label and value information */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      isDisabled: PropTypes.bool,
      inputProps: PropTypes.object
    }).isRequired
  ).isRequired
};

export default SQFormRadioButtonGroup;
