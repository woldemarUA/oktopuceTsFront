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

const pompeChaleurCongfig = () => {
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

  //   const remote_control_number = {
  //     label: 'Référence de télécommande',
  //     initialValue: '',
  //     validationSchema: Yup.string().required('Référence de télécommande requis'),
  //     type: 'text',
  //   };
  return {
    3: {
      location_id: {
        label: 'Emplacement',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
        type: 'select', // Input type
        options: locationsOptions,
      },
      equipment_brand_id,
      equipment_model,
      serial_number,
      finalites: {
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
      },
    },
    4: {},
  };
};

export default pompeChaleurCongfig;
