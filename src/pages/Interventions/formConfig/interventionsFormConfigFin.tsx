import * as Yup from 'yup';

import { useSites } from '../../../context/SitesProvider';

import {
  equipment_type,
  endroit,
  equipment_type_id,
} from '../../Equipments/equipmentConfigs/parametrageConfComp';

import {
  misEnServiceOptions,
  soufflageDelta,
  additional_information,
  intFormFinalPart,
} from './interventionFormSharedFields';

export interface InterventionFormInterface {
  site_id: number;
  company_name: string;
  intervention_date: string;
  equipment_type: string;
  endroit: string;
  equipment_type_id: string;
  intervention_type_id: string;
  additional_information: string | null;
  is_electrical_connections_done: boolean;
  is_network_leakage_tested: boolean;
  is_refrigerant_connections_done: boolean;
  is_unit_installed: boolean;
  is_functionality_tested: boolean;
  clima_functionality_mode: boolean;
  technician_name: string;
  soufflage_type?: string;
  // is_soufflage_temp_relevee: boolean;
  soufflage_relevee?: number;
  is_controle_reprise: boolean;
  reprise_relevee?: number;
  soufflage_delta?: string;
  signature_client: string;
  signature_techicien: string;
  document_upload?: string;
  signatures: boolean;
}

const interventionsFormConfigFin = () => {
  const { sites } = useSites();

  const sitesOptions = sites.map((site) => ({
    value: site.id,
    label: site.name,
  }));

  return {
    site_id: {
      label: 'Site',
      initialValue: '',
      validationSchema: Yup.number().required('Site requis').integer(),
      type: 'select', // Input type
      options: [
        { value: '', label: 'choissisez' },
        ...sitesOptions,
        {
          value: 'add',
          label: 'Ajouter Site',
          from: 'Intervention',
          to: 'Site',
        },
      ],
    },
    company_name: {
      label: "Nom d'entreprise",
      initialValue: '',
      validationSchema: Yup.string().required("Nom d'entreprise nom requis"),
      type: 'text',
    },
    technician_name: {
      label: 'Technicien nom',
      initialValue: '',
      validationSchema: Yup.string().required('Technicien nom requis'),
      type: 'text',
    },
    intervention_date: {
      label: "Date d'intevention",
      initialValue: '',
      validationSchema: Yup.string().required("Nom d'entreprise nom requis"),
      type: 'date',
    },

    equipment_type,
    endroit,
    equipment_type_id,

    intervention_type_id: {
      label: `Type d'intervention`,
      type: 'select',
      initialValue: '',
      validationSchema: Yup.number().required(`Type d'intervention`).integer(),
      options: [
        { value: '', label: 'Choissisez' },
        { value: 1, label: 'Mise en Service' },
        { value: 2, label: 'Entretien' },
        { value: 3, label: 'Depannage' },
        { value: 4, label: 'Depose/repose temporaire' },
        { value: 5, label: 'Depose definitive' },
      ],
      visibleWhen: (values: InterventionFormInterface) => values.equipment_type,
    },
    ...misEnServiceOptions,
    ...soufflageDelta,

    additional_information,
    signatures: {
      label: 'Voulez-vous signer?',
      initialValue: false,
      type: 'checkbox',
      validationSchema: Yup.bool(),
    },
    ...intFormFinalPart,
  };
};

export default interventionsFormConfigFin;
