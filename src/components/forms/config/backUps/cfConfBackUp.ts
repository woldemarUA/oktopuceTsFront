// clientsFormConfig.ts
import * as Yup from 'yup';

export const clientsFormConfig = {
  type_id: {
    label: 'Type ID',
    initialValue: 0,
    validationSchema: Yup.number()
      .required('Type ID is required')
      .positive('Must be a positive number')
      .integer(),
    type: 'number', // Input type
  },
  first_name: {
    label: 'First Name',
    initialValue: '',
    validationSchema: Yup.string().required('First name is required').max(100),
    type: 'text',
  },
  last_name: {
    label: 'Last Name',
    initialValue: '',
    validationSchema: Yup.string().required('Last name is required').max(100),
    type: 'text',
  },
  contact_name: {
    label: 'Contact Name',
    initialValue: '',
    validationSchema: Yup.string().nullable(true).max(100),
    type: 'text',
  },
  address: {
    label: 'Address',
    initialValue: '',
    validationSchema: Yup.string().required('Address is required').max(200),
    type: 'text',
  },
  postal_code: {
    label: 'Postal Code',
    initialValue: '',
    validationSchema: Yup.string()
      .required('Postal code is required')
      .matches(/^[0-9a-zA-Z]+$/, 'Invalid postal code'),
    type: 'text',
  },
  city: {
    label: 'City',
    initialValue: '',
    validationSchema: Yup.string().required('City is required').max(100),
    type: 'text',
  },
  phone_number: {
    label: 'Phone Number',
    initialValue: '',
    validationSchema: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?([0-9]{1,3})\)?([0-9]{6,10})$/, 'Invalid phone number'),
    type: 'text',
  },
  email: {
    label: 'Email',
    initialValue: '',
    validationSchema: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    type: 'email',
  },
};
