import * as Yup from 'yup';

import { useEquipments } from '../../../context/EquipmentProvider';

import {
  brandIds,
  equipment_model,
  serial_number,
  finalites,
  gas_type_id,
  gas_weight,
  has_leak_detection,
  leak_detection_periodicity,
  unite_exterieur_type_id,
  convertToOptions,
  installation_date,
  nfc_tag_id,
} from './equipmentConfigSharedFields';

const pompeChaleurCongfig = () => {
  const { equipmentLocations, equipmentBrands, gas_types } = useEquipments();

  const equipmentBrandsOptions = convertToOptions(equipmentBrands);
  const locationsOptions = convertToOptions(equipmentLocations);
  const gas_types_options = convertToOptions(gas_types);

  // const equipment_brand_id = { ...brandIds, options: equipmentBrandsOptions };

  return {
    3: {
      unite_interieur_type_id: {
        label: 'Type',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
        type: 'select', // Input type
        options: [
          { value: '', label: 'Choissisez' },
          { value: 301, label: 'MONOBLOCK' },
          { value: 302, label: 'BI-BLOCK' },
        ],
      },
      location_id: {
        label: 'Emplacement',
        initialValue: '',
        validationSchema: Yup.number().required('Emplacement requis').integer(),
        type: 'select', // Input type
        options: locationsOptions,
      },
      nfc_tag_id,
      equipment_brand_id: { ...brandIds, options: equipmentBrandsOptions },
      equipment_model,
      serial_number,
      finalites,
      installation_date,
    },
    4: {
      // equipment_type_id, visibiltiy
      // equipment_brand_id,
      nfc_tag_id,
      equipment_brand_id: { ...brandIds, options: equipmentBrandsOptions },
      unite_exterieur_type_id: {
        ...unite_exterieur_type_id,
        visibleWhen: (values: Record<string, any>) =>
          values.equipment_type_id === '13' ||
          values.equipment_type_id === '14',
      },
      equipment_model,
      serial_number,
      finalites: {
        ...finalites,
        visibleWhen: (values: Record<string, any>) =>
          values.equipment_type_id === '11' ||
          values.equipment_type_id === '12',
      },
      gas_type_id: { ...gas_type_id, options: gas_types_options },
      gas_weight,
      has_leak_detection,
      leak_detection_periodicity,
      installation_date,
    },
  };
};

export default pompeChaleurCongfig;
