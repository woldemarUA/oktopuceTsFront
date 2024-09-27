import { useSites } from '../../../context/SitesProvider';
import { useEquipments } from '../../../context/EquipmentProvider.tsx';

import * as Yup from 'yup';
import { EquipmentFormValues } from '../../../interface/equipment_interface.ts';

import { checkEndroit } from '../../../components/forms/FormFin.tsx';

import { convertOptions } from '../../../utilities/convertors.ts';

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
      // { value: 8, label: 'Unité extérieure (système bi-bloc)' },
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

function parametrageConfComp() {
  const { sites } = useSites();
  const { product_types, endroit_types, equipment_types } = useEquipments();

  const productOptions = convertOptions(product_types);

  const sitesOptions =
    sites.length > 0
      ? sites.map((site: Record<string, any>) => {
          return {
            value: site.id,
            label: `${site.name}`,
          };
        })
      : [{ value: 'nodate', label: 'Aucun site fetch error' }];

  const formConf = {
    site: {
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
    equipmentProduct: {
      label: 'Sur quel produit est installé la puce?',
      initialValue: '',
      validationSchema: Yup.number().required(' Type requis').integer(),
      type: 'select', // Input type
      options: [{ value: '', label: 'Choissisez' }, ...productOptions],
    },
    endroit: {
      label: 'A quel endroit?',
      initialValue: '',
      validationSchema: Yup.number().required(' Type requis').integer(),
      type: 'select', // Input type
      options: (values: EquipmentFormValues) => {
        const endroit_opt = values.equipmentProduct
          ? [
              { value: '', label: 'Choissisez' },
              ...endroit_types[parseInt(values.equipmentProduct, 10)],
            ]
          : [{ value: '', label: 'Choissisez' }];
        return [...endroit_opt];
      },
      visibleWhen: (values: EquipmentFormValues) => values.equipmentProduct,
    },
    equipmentType: {
      label: "Type d'unite?",
      initialValue: '',
      validationSchema: Yup.number().required(' Type requis').integer(),
      visibleWhen: (values: EquipmentFormValues) => {
        return (
          checkEndroit(values) && chaleurEauOptions.includes(values.endroit)
        );
        // return values.equipment_type && chaleurEauOptions.includes(values.endroit);
      },
      type: 'select', // Input type
      options: (values: EquipmentFormValues) => {
        const eq_opt = values.endroit
          ? [
              { value: '', label: 'Choissisez' },
              ...equipment_types[parseInt(values.endroit, 10)],
            ]
          : [{ value: '', label: 'Choissisez' }];
        return [...eq_opt];
      },
      image: true,
    },
  };

  return formConf;
}

export default parametrageConfComp;
