import * as Yup from 'yup';

import { EquipmentFormValues } from '../../../interface/equipmentInterface';

export const chaleurEauOptions = ['1', '2', '4', '8'];

export const endroit_mapping = new Map([
  [
    1,
    [
      { value: '', label: 'Select a endroit' },
      { value: 1, label: 'Unité intérieure' },
      { value: 2, label: 'Unité extérieure' },
    ],
  ],

  [
    2,
    [
      { value: '', label: 'Select type' },
      { value: 3, label: 'Module intérieur (système bi-bloc)' },
      { value: 4, label: 'Unité extérieure ' },
      // { value: 5, label: 'Unité extérieure (système bi-bloc)' },
    ],
  ],
  [
    3,
    [
      { value: '', label: 'Select type' },
      { value: 6, label: 'Ballon (système monobloc)' },
      { value: 7, label: 'Ballon (système bi-bloc)' },
      { value: 8, label: 'Unité extérieure (système bi-bloc)' },
    ],
  ],
]);

export const equipment_type_id_mapping = new Map([
  [
    '11',
    [
      { value: '', label: 'Select type' },
      { value: 1, label: 'Cassette' },
      { value: 2, label: 'Console' },
      { value: 3, label: 'Gainable' },
      { value: 4, label: 'Monobloc' },
      { value: 5, label: 'Murale' },
      { value: 6, label: 'Plafonnier' },
    ],
  ],
  [
    '12',
    [
      { value: '', label: 'Select type' },
      { value: 7, label: 'Unité simple ventilateur' },
      { value: 8, label: 'Unité double ventilateur' },
      { value: 9, label: 'Unité VRV' },
    ],
  ],
  ['23', [{ value: 10, label: 'Module intérieure' }]],
  [
    '24',
    [
      { value: '', label: 'Select type' },
      { value: 11, label: 'Unité monobloc (simple ventilateur)' },
      { value: 12, label: 'Unité monobloc (double ventilateur)' },
      { value: 13, label: 'Unité bi-bloc double ventilateur' },
      { value: 14, label: 'Unité bi-bloc monobloc' },
    ],
  ],
  [
    '38',
    [
      { value: '', label: 'Select type' },
      { value: 17, label: 'Unité simple ventilateur' },
      { value: 18, label: 'Unité double ventilateur' },
    ],
  ],
]);

export const parametrageFormConfig = {
  site_id: {
    label: 'Sur quel site est le produit?',
    initialValue: '',
    validationSchema: Yup.number().required('Site requis').integer(),
    type: 'select', // Input type
    options: [
      { value: '', label: 'Choissisez le site' },
      { value: 1, label: 'Individual' },
      { value: 2, label: 'Professional' },
    ],
  },
  equipment_type: {
    label: 'Sur quel produit est installé la puce?',
    initialValue: '',
    validationSchema: Yup.number().required(' Type requis').integer(),
    type: 'select', // Input type
    options: [
      { value: '', label: 'Select a role' },
      { value: 1, label: 'CLIMATISATION' },
      { value: 2, label: 'POMPE A CHALEUR' },
      { value: 3, label: 'CHAUFFE-EAU THERMODYNAMIQUE' },
    ],
  },
  endroit: {
    label: 'A quel endroit?',
    initialValue: '',
    validationSchema: Yup.number().required(' Type requis').integer(),
    type: 'select', // Input type
    options: (values: Record<string, any>) => {
      return endroit_mapping.get(parseInt(values.equipment_type, 10));
    },
  },
  equipment_type_id: {
    label: "Type d'unite?",
    initialValue: '',
    validationSchema: Yup.number().required(' Type requis').integer(),
    visibleWhen: (values: EquipmentFormValues) =>
      chaleurEauOptions.includes(values.endroit),
    type: 'select', // Input type
    options: (values: Record<string, any>) => {
      return equipment_type_id_mapping.get(
        `${values.equipment_type}${values.endroit}`
      );
    },
    image: true,
  },
};
