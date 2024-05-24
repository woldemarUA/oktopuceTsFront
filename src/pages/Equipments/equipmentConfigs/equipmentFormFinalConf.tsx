import * as Yup from 'yup';

import { useEquipments } from '../../../context/EquipmentProvider';
import { EquipmentFormValues } from '../../../interface/equipment_interface';

import {
  brandIds,
  equipment_model,
  serial_number,
  remote_control_number,
  gas_type_id,
  gas_weight,
  has_leak_detection,
  leak_detection_periodicity,
  finalites,
  ballon_capacite,
  installation_date,
  nfc_tag_id,
} from './equipmentConfigSharedFields';

import parametrageConfComp from './parametrageConfComp';

const interieurEndroits = ['1', '3'];

const marqueEndroits = ['3', '6', '7'];
const gasEndroits = ['2', '4', '6', '8'];
const finalitiesEquipmentIds = ['10', '11', '12'];
const ballonCapaciteEndroits = ['6', '7'];

const equipmentFormFinalConf = () => {
  const { equipmentLocations, equipmentBrands, gas_types } = useEquipments();

  const parametrage = parametrageConfComp();

  return {
    ...parametrage,

    location_id: {
      label: 'Emplacement',
      initialValue: '',
      validationSchema: Yup.number().required('Emplacement requis').integer(),
      type: 'select', // Input type
      options: [{ value: '', label: 'Choissisez' }, ...equipmentLocations],
      visibleWhen: (values: EquipmentFormValues) =>
        values.equipment_type && interieurEndroits.includes(values.endroit),
    },
    precisionCheck: {
      label: 'Précision',
      initialValue: false,
      validationSchema: Yup.boolean(),
      type: 'checkbox',
      visibleWhen: (values: EquipmentFormValues) =>
        values.equipment_type && interieurEndroits.includes(values.endroit),
    },

    precision: {
      label: 'Preicsez',
      initialValue: '',
      validationSchema: Yup.string().notRequired(),
      type: 'text',
      visibleWhen: (values: EquipmentFormValues) => values.precisionCheck,
    },
    equipment_brand_id: {
      ...brandIds,
      options: [{ value: '', label: 'Choissisez' }, ...equipmentBrands],
      visibleWhen: (values: EquipmentFormValues) =>
        values.equipment_type_id || marqueEndroits.includes(values.endroit),
    },
    equipment_model: {
      ...equipment_model,
      visibleWhen: (values: EquipmentFormValues) => values.equipment_brand_id,
    },
    serial_number: {
      ...serial_number,
      visibleWhen: (values: EquipmentFormValues) => values.equipment_model,
    },
    ballon_capacite: {
      ...ballon_capacite,
      visibleWhen: (values: EquipmentFormValues) =>
        ballonCapaciteEndroits.includes(values.endroit),
    },
    remote_control_number: {
      ...remote_control_number,
      visibleWhen: (values: EquipmentFormValues) =>
        values.equipment_model && values.endroit === '1',
    },
    finalites: {
      ...finalites,
      visibleWhen: (values: EquipmentFormValues) =>
        values.serial_number &&
        (finalitiesEquipmentIds.includes(values.equipment_type_id) ||
          (values.endroit === '3' && values.equipment_type === '2')),
    },
    // TYPE DE GAZ
    gas_type_id: {
      ...gas_type_id,
      options: [{ value: '', label: 'Choissisez' }, ...gas_types],
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serial_number,
    },
    gas_weight: {
      ...gas_weight,
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serial_number,
    },
    has_leak_detection: {
      ...has_leak_detection,
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serial_number,
    },
    leak_detection_periodicity: {
      ...leak_detection_periodicity,
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serial_number,
    },
    installation_date,
    nfc_tag_id,
  };
};

export default equipmentFormFinalConf;
