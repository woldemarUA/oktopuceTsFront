import * as Yup from 'yup';

// export interface FormConfigRecord {
//   label: string;
//   initialValue: string | number;
//   type: string;
//   validationSchema: Record<string, any>;
//   options?: { value: string | number; label: string }[];
// }

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
  validationSchema: Yup.number().required('Emplacement requis').integer(),
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
  options: [
    { value: '', label: ' Choissisez' },
    { value: 1, label: 'MONO-SPLIT' },
    { value: 2, label: 'BI-SPLIT' },
    { value: 3, label: 'TRI-SPLIT' },
    { value: 4, label: 'QUADRI-SPLIT' },
    { value: 5, label: '5 POSTES' },
    { value: 6, label: 'DRV / VRV' },
    { value: 7, label: 'GROUPE A EAU GLACEE (CHILLER)' },
    { value: 8, label: 'GROUPE A E' },
    { value: 9, label: 'AUTRE' },
  ],
};
export const ballon_capacite = {
  label: 'Capacité du ballon',
  initialValue: '',
  validationSchema: Yup.number().required('Capacite requis').integer(),
  type: 'select', // Input type
  options: [
    { value: '', label: ' Choissisez' },
    { value: 301, label: '80L' },
    { value: 302, label: '100L' },
    { value: 303, label: '150L' },
    { value: 304, label: '200L' },
    { value: 305, label: '215L' },
    { value: 306, label: '240L' },
    { value: 307, label: '260L' },
    { value: 308, label: '270L' },
    { value: 309, label: '300L' },
    { value: 310, label: 'NE SAIS PAS' },
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

export const convertToOptions = (options: Record<string, any>[]) => {
  return [
    { value: '', label: 'Choissisez' },
    ...options.map((option) => {
      const optionFin: Record<string, string | number> = {};
      optionFin.value = option.id;
      optionFin.label = option.name;
      if (option?.global_warming_potential !== undefined) {
        optionFin.potentiel = option.global_warming_potential;
      }
      // return { value: option.id, label: option.name };
      return optionFin;
    }),
  ];
};
