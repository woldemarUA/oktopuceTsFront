import { useSites } from '../../../context/SitesProvider';

import * as Yup from 'yup';
import { EquipmentFormValues } from '../../../interface/equipment_interface.ts';

// regulates equipment_type_id visiblity
export const chaleurEauOptions = ['1', '2', '4', '8'];

// regulates equipment_type_id asignement (used in select Field) values.endroit
export const eqTypeIdAssign: Record<string, string>[] = [
  { endroit: '3', equipment_type_id: '10' },
  { endroit: '6', equipment_type_id: '15' },
  { endroit: '7', equipment_type_id: '16' },
];

export const eqTypeId: Record<string, string> = {
  '3': '10',
  '6': '15',
  '7': '16',
};

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
      { value: 3, label: 'Module intérieur ' },
      { value: 4, label: 'Unité extérieure ' },
      // { value: 5, label: 'Unité extérieure (système mono-bloc)' },
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

  [
    '24',
    [
      { value: '', label: 'Select type' },
      { value: 11, label: 'Systeme monobloc (simple ventilateur)' },
      { value: 12, label: 'Systeme monobloc (double ventilateur)' },
      { value: 13, label: 'Systeme bi-bloc double ventilateur' },
      { value: 14, label: 'Systeme bi-bloc monobloc' },
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

export const equipment_type = {
  label: 'Sur quel produit est installé la puce?',
  initialValue: '',
  validationSchema: Yup.number().required(' Type requis').integer(),
  type: 'select', // Input type
  options: [
    { value: '', label: 'Choissisez' },
    { value: 1, label: 'CLIMATISATION' },
    { value: 2, label: 'POMPE A CHALEUR' },
    { value: 3, label: 'CHAUFFE-EAU THERMODYNAMIQUE' },
  ],
};

export const endroit = {
  label: 'A quel endroit?',
  initialValue: '',
  validationSchema: Yup.number().required(' Type requis').integer(),
  type: 'select', // Input type
  options: (values: Record<string, any>) => {
    return endroit_mapping.get(parseInt(values.equipment_type, 10));
  },
  visibleWhen: (values: EquipmentFormValues) => values.equipment_type,
};

export const equipment_type_id = {
  label: "Type d'unite?",
  initialValue: '',
  validationSchema: Yup.number().required(' Type requis').integer(),
  visibleWhen: (values: EquipmentFormValues) =>
    values.equipment_type && chaleurEauOptions.includes(values.endroit),
  type: 'select', // Input type
  options: (values: EquipmentFormValues) => {
    return equipment_type_id_mapping.get(
      `${values.equipment_type}${values.endroit}`
    );
  },
  image: true,
};

// for (const item of endroit_mapping.entries()) console.log(item);
// // for (const equipment_type of item) console.log(equipment_type.value);

function parametrageConfComp() {
  const { sites } = useSites();

  const sitesOptions = sites.map((site: Record<string, any>) => ({
    value: site.id,
    label: `${site.name}`,
  }));

  const formConf = {
    site_id: {
      label: 'Sur quel site est le produit?',
      initialValue: '',
      validationSchema: Yup.number().required('Site requis').integer(),
      type: 'select', // Input type
      options: [
        { value: '', label: 'Choissisez' },
        ...sitesOptions,
        { value: 'add', label: 'Ajouter Site', from: 'Equipment', to: 'Site' },
      ],
    },
    equipment_type,
    endroit,
    equipment_type_id,
  };

  return formConf;
}

export default parametrageConfComp;
