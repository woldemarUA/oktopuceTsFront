import * as Yup from 'yup';

export interface FormConfigProps {
  label: string;
  initialValue: string | number;
  type: string;
  validationSchema: Record<string, any>;
  options?: { value: string | number; label: string }[];
}

export const brandIds = {
  label: 'Marque',
  initialValue: '',
  validationSchema: Yup.number().required('Marque requis').integer(),
  type: 'select', // Input type
  //   options: equipmentBrandsOptions,
};

export const equipment_model = {
  label: 'Modèle',
  initialValue: '',
  validationSchema: Yup.string().required('Modèle requis'),
  type: 'text',
};

export const serial_number = {
  label: 'Numéro de série',
  initialValue: '',
  validationSchema: Yup.string().required('Numéro de série requis'),
  type: 'text',
};

export const finalites = {
  label: 'Finalité(s)',
  // initialValue: false,
  // validationSchema: Yup.boolean().required('Finalité requis'),
  type: 'multicheck', // Input type
  options: [
    {
      value: false,
      label: `Plancher chauffant`,
      name: 'is_plancher_chauffant',
    },
    {
      value: false,
      label: `Plancher chauffant/raffraichssant`,
      name: 'is_plancher_raffraichssant',
    },
    { value: false, label: `Radiaterus`, name: 'is_radiateurs' },
    {
      value: false,
      label: `Ventilo-convecteurs`,
      name: 'ventilo_convecteurs',
    },
  ],
};

export const remote_control_number = {
  label: 'Référence de télécommande',
  initialValue: '',
  validationSchema: Yup.string().required('Référence de télécommande requis'),
  type: 'text',
};

export const gas_type_id = {
  label: 'Type de gaz',
  initialValue: '',
  validationSchema: Yup.number().required('Gas type requis').integer(),
  type: 'select', // Input type
  // options: gas_types_options,
};
export const gas_weight = {
  label: 'Poids de gaz',
  initialValue: '',
  validationSchema: Yup.string().required('Poids de gaz requis'),
  type: 'text', // Input type
};
export const has_leak_detection = {
  label: 'Détecteur de fuite',
  initialValue: false,
  validationSchema: Yup.boolean(),
  type: 'checkbox',
};
export const leak_detection_periodicity = {
  label: 'Contrôle d’étanchéité obligatoire',
  initialValue: '',
  validationSchema: Yup.string(),
  type: 'text', // Input type
};

export const unite_exterieur_type_id = {
  label: 'Type',
  initialValue: '',
  validationSchema: Yup.number().integer(),
  type: 'select', // Input type
};

export const unite_interieur_type_id = {
  label: 'Type',
  initialValue: '',
  validationSchema: Yup.number().integer(),
  type: 'select', // Input type
};
export const ballon_capacite = {
  label: 'Capacité du ballon',
  initialValue: '',
  validationSchema: Yup.number().required('Capacite requis').integer(),
  type: 'select', // Input type
  options: [
    { value: '', label: ' Choissisez' },
    { value: 80, label: '80L' },
    { value: 100, label: '100L' },
    { value: 150, label: '150L' },
    { value: 200, label: '200L' },
    { value: 215, label: '215L' },
    { value: 240, label: '240L' },
    { value: 260, label: '260L' },
    { value: 270, label: '270L' },
    { value: 300, label: '300L' },
    { value: 1, label: 'NE SAIS PAS' },
  ],
};

export const installation_date = {
  label: 'Installation Date',
  initialValue: '',
  validationSchema: Yup.string().required('Date est requis'),
  type: 'date',
};

export const nfc_tag_id = {
  label: 'Numero de NFC',
  initialValue: '',
  validationSchema: Yup.number().required('Numero de NFC est requis'),
  type: 'number',
};
