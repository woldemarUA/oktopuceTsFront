// clientsFormConfig.ts
import * as Yup from 'yup';

import { SitesFormValues } from '../../../interface/sitesInterface';

import { useClients } from '../../../context/ClientsProvider';

const sitesFormComponentConfig = () => {
  const { clients } = useClients();
  const clientsOptions = clients.map((client) => ({
    value: client.id,
    label: `${client.first_name} ${client.last_name || client.contact_name}`,
  }));

  return {
    client_id: {
      label: 'Client',
      initialValue: '',
      validationSchema: Yup.string().required('L’ID du client est requis'),
      type: 'select', // Input type
      options: [
        { value: '', label: 'Choissisez' },
        ...clientsOptions,
        { value: 'add', label: 'Ajouter Client', from: 'Site', to: 'Client' },
      ],
    },
    name: {
      label: 'Nom',
      initialValue: '',
      validationSchema: Yup.string()
        .required('Le nom est requis')
        .max(255, 'Le nom doit contenir moins de 256 caractères'),
      type: 'text',
    },
    address: {
      label: 'N° et nom de la rue',
      initialValue: '',
      validationSchema: Yup.string()
        .required('L’adresse est requise')
        .max(255, 'L’adresse doit contenir moins de 256 caractères'),
      type: 'text',
    },
    postal_code: {
      label: 'Code Postal',
      initialValue: '',
      validationSchema: Yup.string()
        .required('Le code postal est requis')
        .matches(/^[0-9a-zA-Z]+$/, 'Code postal invalide')
        .max(255, 'Le code postal doit contenir moins de 256 caractères'),
      type: 'text',
    },
    city: {
      label: 'Ville',
      initialValue: '',
      validationSchema: Yup.string()
        .required('La ville est requise')
        .max(255, 'La ville doit contenir moins de 256 caractères'),
      type: 'text',
    },
    phone_number: {
      label: 'Numéro de téléphone',
      initialValue: '',
      validationSchema: Yup.string()
        .required('Le numéro de téléphone est requis')
        .matches(
          /^\+?([0-9]{1,3})\)?([0-9]{6,10})$/,
          'Numéro de téléphone invalide'
        )
        .max(
          255,
          'Le numéro de téléphone doit contenir moins de 256 caractères'
        ),
      type: 'text',
    },
    email: {
      label: 'Email',
      initialValue: '',
      validationSchema: Yup.string()
        .required('L’email est requis')
        .email('Adresse email invalide')
        .max(255, 'L’email doit contenir moins de 256 caractères'),
      type: 'email',
    },
    maintenance_provider: {
      label: 'Prestataire maintenance',
      initialValue: '1',
      type: 'select',
      options: [
        { value: '1', label: 'non' },
        { value: '2', label: 'oui' },
      ],
      validationSchema: Yup.string().notRequired(),
    },
    main_nom: {
      label: 'Nom',
      initialValue: '',
      type: 'text',
      validationSchema: Yup.string().when('maintenance_provider ', {
        is: (maintenance_provider: { value: string; label: string }) =>
          maintenance_provider.value === '2',
        then: () =>
          Yup.string()
            .required('Le nom est requis')
            .max(255, 'Le nom doit contenir moins de 256 caractères'),
        otherwise: () => Yup.string().notRequired(),
      }),
      visibleWhen: (values: SitesFormValues) =>
        values.maintenance_provider === '2',
    },
    main_telephone: {
      label: 'Téléphone',
      initialValue: '',
      type: 'text',
      validationSchema: Yup.string().when('maintenance_provider ', {
        is: (maintenance_provider: { value: string; label: string }) =>
          maintenance_provider.value === '2',
        then: () =>
          Yup.string()
            .required('Le numéro de téléphone est requis')
            .matches(
              /^\+?([0-9]{1,3})\)?([0-9]{6,10})$/,
              'Numéro de téléphone invalide'
            )
            .max(
              255,
              'Le numéro de téléphone doit contenir moins de 256 caractères'
            ),
        otherwise: () => Yup.string().notRequired(),
      }),
      visibleWhen: (values: SitesFormValues) =>
        values.maintenance_provider === '2',
    },
    main_mail: {
      label: 'Email',
      initialValue: '',
      type: 'email',
      validationSchema: Yup.string().when('maintenance_provider ', {
        is: (maintenance_provider: { value: string; label: string }) =>
          maintenance_provider.value === '2',
        then: () =>
          Yup.string()
            .required('L’email est requis')
            .email('Adresse email invalide')
            .max(255, 'L’email doit contenir moins de 256 caractères'),
        otherwise: () => Yup.string().notRequired(),
      }),
      visibleWhen: (values: SitesFormValues) =>
        values.maintenance_provider === '2',
    },
  };
};

export default sitesFormComponentConfig;
