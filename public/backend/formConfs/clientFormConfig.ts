// clientsFormConfig.ts
import * as Yup from 'yup';

interface FormValues {
  type_id: string;
  first_name?: string;
  last_name?: string;
  contact_name?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  phone_number?: string;
  email?: string;
  language?: string; // Add all other fields as necessary
}

export const clientsFormConfig = {
  language: {
    label: 'Langue',
    initialValue: 'fr-fr',
    validationSchema: Yup.string().required('Type requis'),

    type: 'select', // Input type
    options: [
      { value: 'fr-fr', label: 'Français' },
      { value: 'de-de', label: 'Deutsch' },
      { value: 'en', label: 'Anglais' },
    ],
  },
  type_id: {
    label: 'Type',
    initialValue: 0,
    validationSchema: Yup.number()
      .required('Type requis')
      // .positive('Must be a positive number')
      .integer(),
    type: 'select', // Input type
    options: [
      { value: '', label: 'Select a role' },
      { value: 1, label: 'Individual' },
      { value: 2, label: 'Professional' },
    ],
  },
  first_name: {
    label: 'Nom',
    initialValue: '',
    validationSchema: Yup.string().required('Prenom est requis').max(100),
    type: 'text',
  },
  last_name: {
    label: 'Prenom',
    initialValue: '',
    validationSchema: Yup.string().when('type_id', {
      is: (type_id: number) => type_id === 1,
      then: () => Yup.string().required('Prenom est requis').max(100),
      otherwise: () => Yup.string().notRequired(),
    }),
    type: 'text',
    visibleWhen: (values: FormValues) => values.type_id === '1',
  },
  contact_name: {
    label: 'Contact ',
    initialValue: '',
    validationSchema: Yup.string().when('type_id', {
      is: (type_id: number) => type_id === 2,
      then: () => Yup.string().required('Contact  est requis').max(100),
      otherwise: () => Yup.string().notRequired(),
    }),
    type: 'text',
    visibleWhen: (values: FormValues) => values.type_id === '2',
  },
  address: {
    label: 'Address',
    initialValue: '',
    validationSchema: Yup.string().required('Address est requis').max(200),
    type: 'text',
  },
  postal_code: {
    label: 'Postal Code',
    initialValue: '',
    validationSchema: Yup.string()
      .required('Postal code est requis')
      .matches(/^[0-9a-zA-Z]+$/, 'Invalid postal code'),
    type: 'text',
  },
  city: {
    label: 'City',
    initialValue: '',
    validationSchema: Yup.string().required('City est requis').max(100),
    type: 'text',
  },
  phone_number: {
    label: 'Phone Number',
    initialValue: '',
    validationSchema: Yup.string()
      .required('Phone number est requis')
      .matches(/^\+?([0-9]{1,3})\)?([0-9]{6,10})$/, 'Invalid phone number'),
    type: 'text',
  },
  email: {
    label: 'Email',
    initialValue: '',
    validationSchema: Yup.string()
      .required('Email est requis')
      .email('Invalid email address'),
    type: 'email',
  },
};
