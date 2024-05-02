// loginFormConfig.ts
import * as Yup from 'yup';

export const loginFormConfig = {
  ticketNumber: {
    label: 'Ticket Number',
    initialValue: '',
    validationSchema: Yup.string().when('role', {
      is: (role: string) => role === 'student', // Conditional logic needs to return a boolean
      then: () =>
        Yup.string().required('Ticket number is required for students'), // Wrap in a function
      otherwise: () => Yup.string().notRequired(), // Wrap in a function
    }),
    type: 'text',
    condition: 'student', // Indicates this field should only appear for students
  },

  diplomaTitle: {
    label: 'Diploma Title',
    initialValue: '',
    validationSchema: Yup.string().when('role', {
      is: (role: string) => role === 'graduate', // Conditional logic needs to return a boolean
      then: () =>
        Yup.string().required('Diploma title is required for graduates'), // Wrap in a function
      otherwise: () => Yup.string().notRequired(), // Wrap in a function
    }),
    type: 'text',
    condition: 'graduate', // Indicates this field should only appear for graduates
  },
  role: {
    label: 'Role',
    initialValue: '',
    validationSchema: Yup.string().required('Role selection is required'),
    type: 'select',
    options: [
      { value: '', label: 'Select a role' },
      { value: 'student', label: 'Student' },
      { value: 'graduate', label: 'Graduate' },
    ],
  },
};
