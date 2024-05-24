import * as Yup from 'yup';
import { useEquipments } from '../../../context/EquipmentProvider';

import {
  brandIds,
  equipment_model,
  serial_number,
  gas_type_id,
  gas_weight,
  has_leak_detection,
  leak_detection_periodicity,
  ballon_capacite,
  installation_date,
  nfc_tag_id,
} from '../equipmentConfigs/equipmentConfigSharedFields';

const thermodynamiqueConfig = () => {
  const { equipmentBrands, gas_types } = useEquipments();

  return {
    6: {
      nfc_tag_id,
      equipment_brand_id: {
        ...brandIds,
        options: [{ value: '', label: 'Choissisez' }, ...equipmentBrands],
      },
      equipment_model,
      serial_number,
      ballon_capacite,
      gas_type_id: {
        ...gas_type_id,
        options: [{ value: '', label: 'Choissisez' }, ...gas_types],
      },
      gas_weight,
      has_leak_detection,
      leak_detection_periodicity,
      installation_date,
    },
    7: {
      nfc_tag_id,
      equipment_brand_id: {
        ...brandIds,
        options: [{ value: '', label: 'Choissisez' }, ...equipmentBrands],
      },
      equipment_model,
      serial_number,
      ballon_capacite,
      installation_date,
    },
    8: {
      nfc_tag_id,
      equipment_brand_id: {
        ...brandIds,
        options: [{ value: '', label: 'Choissisez' }, ...equipmentBrands],
      },
      equipment_model,
      serial_number,
      gas_type_id: {
        ...gas_type_id,
        options: [{ value: '', label: 'Choissisez' }, ...gas_types],
      },
      gas_weight,
      has_leak_detection,
      leak_detection_periodicity,
      installation_date,
    },
  };
};

export default thermodynamiqueConfig;
