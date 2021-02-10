import React from 'react';
import * as Yup from 'yup';

import {SQFormDialog, SQFormDropdown} from '../src';

export default {
  title: 'SQFormTest'
};

const options = [
  {label: 'Yes', value: 'Yes'},
  {label: 'No', value: 'No'}
];

const initialValues = {
  someName: ''
};

const validationSchema = {
  someName: Yup.string()
    .matches('Yes', 'Should be yes')
    .required('Required')
};

export const test = () => {
  return (
    <SQFormDialog
      isOpen
      onClose={() => {}}
      title="Test"
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <SQFormDropdown label="Some Label" name="someName" isRequired>
        {options}
      </SQFormDropdown>
    </SQFormDialog>
  );
};
