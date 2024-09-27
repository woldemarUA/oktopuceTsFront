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
  unite_exterieur_type_id,
  unite_interieur_type_id,
} from './equipmentConfigSharedFields';

import parametrageConfComp from './parametrageConfComp';

const interieurEndroits = ['1', '3'];

import { convertOptions } from '../../../utilities/convertors';

// const marqueEndroits = ['3', '6', '7'];
const gasEndroits = ['2', '4', '6', '8'];
const finalitiesEquipmentIds = ['10', '11', '12'];
const ballonCapaciteEndroits = ['6', '7'];

const equipmentFormFinalConf = () => {
  const {
    equipmentLocations,
    equipmentBrands,
    gas_types,
    int_types,
    ext_types,
    nfcList,
  } = useEquipments();

  const equipmentLocationsOptions = convertOptions(equipmentLocations);
  const brandsOptions = convertOptions(equipmentBrands);
  const gasTypesOptions = convertOptions(gas_types);
  const nfcOptions = convertOptions(nfcList);

  const intTypesOptions = convertOptions(int_types);
  const extTypeOptions = convertOptions(ext_types);

  const parametrage = parametrageConfComp();

  return {
    ...parametrage,
    uniteExterieurType: {
      ...unite_exterieur_type_id,
      options: [{ value: '', label: ' Choissisez' }, ...extTypeOptions],
      visibleWhen: (values: Record<string, any>) =>
        values.equipment_type_id === '13' || values.equipment_type_id === '14',
    },
    uniteInterieurType: {
      ...unite_interieur_type_id,
      options: [{ value: '', label: ' Choissisez' }, ...intTypesOptions],
      visibleWhen: (values: Record<string, any>) =>
        values.equipment_type_id === '10',
    },

    location: {
      label: 'Emplacement',
      initialValue: '',
      validationSchema: Yup.number().required('Emplacement requis').integer(),
      type: 'select', // Input type
      options: [
        { value: '', label: 'Choissisez' },
        ...equipmentLocationsOptions,
      ],
      visibleWhen: (values: EquipmentFormValues) =>
        values.equipmentType && interieurEndroits.includes(values.endroit),
    },
    precisionCheck: {
      label: 'Précision',
      initialValue: false,
      validationSchema: Yup.boolean(),
      type: 'checkbox',
      visibleWhen: (values: EquipmentFormValues) =>
        values.equipmentType && interieurEndroits.includes(values.endroit),
    },

    locationPrecision: {
      label: 'Preicsez',
      initialValue: '',
      validationSchema: Yup.string().notRequired(),
      type: 'text',
      visibleWhen: (values: EquipmentFormValues) => values.precisionCheck,
    },
    equipmentBrand: {
      ...brandIds,
      options: [{ value: '', label: 'Choissisez' }, ...brandsOptions],
      visibleWhen: (values: EquipmentFormValues) => values.equipmentType, //|| marqueEndroits.includes(values.endroit),
    },
    equipmentModel: {
      ...equipment_model,
      visibleWhen: (values: EquipmentFormValues) => values.equipmentBrand,
    },
    serialNumber: {
      ...serial_number,
      visibleWhen: (values: EquipmentFormValues) => values.equipmentModel,
    },
    ballonCapacite: {
      ...ballon_capacite,
      visibleWhen: (values: EquipmentFormValues) =>
        ballonCapaciteEndroits.includes(values.endroit),
    },
    remoteControlNumber: {
      ...remote_control_number,
      visibleWhen: (values: EquipmentFormValues) =>
        values.equipmentModel && values.endroit === '1',
    },
    finalites: {
      ...finalites,
      visibleWhen: (values: EquipmentFormValues) =>
        values.serialNumber &&
        (finalitiesEquipmentIds.includes(values.equipmentType) ||
          (values.endroit === '3' && values.equipmentType === '2')),
    },
    // TYPE DE GAZ
    gasType: {
      ...gas_type_id,
      options: [{ value: '', label: 'Choissisez' }, ...gasTypesOptions],
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serialNumber,
    },
    gasWeight: {
      ...gas_weight,
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serialNumber,
    },
    hasLeakDetection: {
      ...has_leak_detection,
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serialNumber,
    },
    leakDetectionPeriodicity: {
      ...leak_detection_periodicity,
      visibleWhen: (values: EquipmentFormValues) =>
        gasEndroits.includes(values.endroit) && values.serialNumber,
    },
    installationDate: { ...installation_date },
    nfcTag: {
      label: 'Numero de NFC',
      initialValue: '',
      validationSchema: Yup.number()
        .required('Numero de NFC est requis')
        .integer(),
      type: 'select', // Input type
      options: [{ value: '', label: 'Choissisez' }, ...nfcOptions],
    },
  };
};

export default equipmentFormFinalConf;
