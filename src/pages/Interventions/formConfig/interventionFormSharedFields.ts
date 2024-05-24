import * as Yup from 'yup';

import { InterventionFormInterface } from './interventionsFormConfigFin';

export const temperatureOptions = (
  start: number,
  end: number,
  step: number = 1
) => {
  const range: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      range.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i > end; i += step) {
      range.push(i);
    }
  }
  const options: Record<string, any>[] = [];
  range.forEach((r) => options.push({ value: r, label: r }));
  return options;
};

// const ouiNonOptions = {
//   type: 'select',
//   options: [
//     { value: false, label: 'Non' },
//     { value: true, label: 'Oui' },
//   ],
// };
const ouiNonOptions = {
  type: 'checkbox',
  validationSchema: Yup.bool(),
};

const climaIntEquipmentTypes = ['1', '2', '3', '4', '5', '6'];
const endroitServiceOptions = ['1', '3'];

export const misEnServiceOptions = {
  is_unit_installed: {
    label: 'Pose de l’unité ?',
    initialValue: false,
    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.intervention_type_id === '1' &&
      endroitServiceOptions.includes(values.endroit),
  },
  is_electrical_connections_done: {
    label: 'Réalisation des raccords électriques ?',
    initialValue: false,

    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.intervention_type_id === '1' &&
      endroitServiceOptions.includes(values.endroit),
  },
  is_refrigerant_connections_done: {
    label: 'Réalisation des raccords frigorifiques ?',
    initialValue: false,

    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.intervention_type_id === '1' &&
      endroitServiceOptions.includes(values.endroit),
  },
  is_network_leakage_tested: {
    label: 'Contrôle étanchéité des réseaux ?',
    initialValue: false,

    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.intervention_type_id === '1' &&
      endroitServiceOptions.includes(values.endroit),
  },
  is_waterproof: {
    label: 'Réseaux étanches?',
    initialValue: false,

    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.is_network_leakage_tested,
  },
  is_functionality_tested: {
    label: 'Essais de fonctionnement ?',
    initialValue: false,

    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.intervention_type_id === '1' &&
      endroitServiceOptions.includes(values.endroit),
  },
  clima_functionality_mode: {
    label: 'Contrôle des températures de soufflage',
    initialValue: false,

    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.is_functionality_tested &&
      climaIntEquipmentTypes.includes(values.equipment_type_id),
  },
};

export const soufflageDelta = {
  soufflage_type: {
    label: 'Soufflage mode',
    initialValue: '',
    validationSchema: Yup.number(),
    type: 'select',
    options: [
      { value: '', label: 'Choissisez' },
      { value: 1, label: 'Chaud' },
      { value: 2, label: 'Froid' },
    ],
    visibleWhen: (values: InterventionFormInterface) =>
      values.clima_functionality_mode,
  },
  // is_soufflage_temp_relevee: {
  //   label: 'Température relevée ?',
  //   initialValue: false,
  //   ...ouiNonOptions,
  //   visibleWhen: (values: InterventionFormInterface) =>
  //     values.functionality_mode,
  // },
  soufflage_relevee: {
    label: 'Température relevée  par, °C:',
    initialValue: '',
    validationSchema: Yup.number(),
    type: 'select',
    options: [
      { value: '', label: 'Choissisez' },
      ...temperatureOptions(-5, 61),
    ],
    visibleWhen: (values: InterventionFormInterface) =>
      values.clima_functionality_mode,
  },
  is_controle_reprise: {
    label: 'Contrôle des température de reprise ?',
    ...ouiNonOptions,
    visibleWhen: (values: InterventionFormInterface) =>
      values.clima_functionality_mode,
  },
  reprise_relevee: {
    label: 'Température relevée  par, °C:',
    initialValue: '',
    validationSchema: Yup.number(),
    type: 'select',
    options: [
      { value: '', label: 'Choissisez' },
      ...temperatureOptions(-5, 41),
    ],
    visibleWhen: (values: InterventionFormInterface) =>
      values.is_controle_reprise,
  },
  soufflage_delta: {
    label: 'Delta de soufflage',
    initialValue: '',
    validationSchema: Yup.string(),
    type: 'text', // Input type
    visibleWhen: (values: InterventionFormInterface) =>
      values.reprise_relevee && values.soufflage_relevee,
  },
};

export const additional_information = {
  label: 'Informations complémentaires (facultatif)',
  initialValue: '',
  validationSchema: Yup.string(),
  type: 'textarea',
};

export const intFormFinalPart = {
  // Signature client : Zone de dessin
  signature_client: {
    label: 'Signature client',
    initialValue: '',
    type: 'signature',
    visibleWhen: (values: InterventionFormInterface) => values.signatures,
  },
  signature_techicien: {
    label: 'Signature technicien',
    initialValue: '',
    type: 'signature',
    visibleWhen: (values: InterventionFormInterface) => values.signatures,
  },
  document_upload: {
    label: 'Ajout document',
    type: 'file',
    visibleWhen: (values: InterventionFormInterface) => values.signatures,
  },
  // Signature technicien : Zone de dessin
  // Ajout document : Permet de joindre des photos ou documents d’un téléphone
};
