import * as Yup from 'yup';

import { useEquipments } from '../../../context/EquipmentProvider';

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
const climatisationConfig = () => {
  const { equipmentLocations, equipmentBrands, gas_types } = useEquipments();

  const equipmentBrandsOptions = convertToOptions(equipmentBrands);
  const locationsOptions = convertToOptions(equipmentLocations);
  const gas_types_options = convertToOptions(gas_types);
  const equipment_brand_id = {
    label: 'Marque',
    initialValue: '',
    validationSchema: Yup.number().required('Marque requis').integer(),
    type: 'select', // Input type
    options: equipmentBrandsOptions,
  };

  const equipment_model = {
    label: 'Modèle',
    initialValue: '',
    validationSchema: Yup.string().required('Modèle requis'),
    type: 'text',
  };

  const serial_number = {
    label: 'Numéro de série',
    initialValue: '',
    validationSchema: Yup.string().required('Numéro de série requis'),
    type: 'text',
  };

  const remote_control_number = {
    label: 'Référence de télécommande',
    initialValue: '',
    validationSchema: Yup.string().required('Référence de télécommande requis'),
    type: 'text',
  };
  return {
    1: {
      location_id: {
        label: 'Emplacement',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
        type: 'select', // Input type
        options: locationsOptions,
      },
      precisionCheck: {
        label: 'Précision',
        initialValue: false,
        validationSchema: Yup.boolean(),
        type: 'checkbox',
      },

      precision: {
        label: 'Preicsez',
        initialValue: '',
        validationSchema: Yup.string().notRequired(),
        type: 'text',
        visibleWhen: (values: Record<string, any>) =>
          values.precisionCheck === true,
      },
      equipment_brand_id,
      equipment_model,
      serial_number,
      remote_control_number,
    },
    2: {
      equipment_brand_id,
      unite_exterieur_type_id: {
        label: 'Type',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
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
        ],
      },
      equipment_model,
      gas_type_id: {
        label: 'Type de gaz',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
        type: 'select', // Input type
        options: gas_types_options,
      },
      gas_weight: {
        label: 'Poids de gaz',
        initialValue: '',
        validationSchema: Yup.string().required('Poids de gaz requis'),
        type: 'text', // Input type
      },
      has_leak_detection: {
        label: 'Détecteur de fuite',
        initialValue: false,
        validationSchema: Yup.boolean(),
        type: 'checkbox',
      },
      leak_detection_periodicity: {
        label: 'Contrôle d’étanchéité obligatoire',
        initialValue: '',
        validationSchema: Yup.string(),
        type: 'text', // Input type
      },
    },
  };
};

export default climatisationConfig;
