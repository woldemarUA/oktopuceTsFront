import * as Yup from 'yup';
export const InterventionsFormConfig = {
  1: {
    site_id: {
      label: 'Site',
      initialValue: '',
      validationSchema: Yup.number().required('Site requis').integer(),
      type: 'select', // Input type
      options: [
        { value: '', label: 'Select a role' },
        { value: 1, label: 'Individual' },
        { value: 2, label: 'Professional' },
      ],
    },
    technician_name: {
      label: 'Technicien nom',
      initialValue: '',
      validationSchema: Yup.string().required('Technicien nom requis'),
      type: 'text',
    },

    intervention_type_id: {
      label: `Type d'intervention`,
      type: 'select',
      initialValue: '',
      validationSchema: Yup.number().required('Site requis').integer(),
      options: [
        { value: '', label: 'Choissisez' },
        { value: 1, label: 'Mise en Service' },
        { value: 2, label: 'Entretien' },
        { value: 3, label: 'Depannage' },
        { value: 4, label: 'Depose/repose temporaire' },
        { value: 5, label: 'Depose definitive' },
      ],
    },
  },
  2: {
    is_unit_installed: {
      label: 'Pose de l’unité ?',
      initialValue: false,
      validationSchema: Yup.bool(),
      type: 'checkbox',
    },
    is_electrical_connections_done: {
      label: 'Réalisation des raccords électriques ?',
      initialValue: false,
      validationSchema: Yup.bool(),
      type: 'checkbox',
    },
    is_refrigerant_connections_done: {
      label: 'Réalisation des raccords frigorifiques ?',
      initialValue: false,
      validationSchema: Yup.bool(),
      type: 'checkbox',
    },
    is_network_leakage_tested: {
      label: 'Contrôle étanchéité des réseaux ?',
      initialValue: false,
      validationSchema: Yup.bool(),
      type: 'checkbox',
    },
    is_functionality_tested: {
      label: 'Essais de fonctionnement ?',
      initialValue: false,
      validationSchema: Yup.bool(),
      type: 'checkbox',
    },
    additional_information: {
      label: 'Informations complémentaires (facultatif)',
      initialValue: '',
      validationSchema: Yup.string(),
      type: 'textarea',
    },
  },
};
