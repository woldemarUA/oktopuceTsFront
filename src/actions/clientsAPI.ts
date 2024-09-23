import axios from 'axios';
import ClientsInterface from '../interface/clientsInterface';

import { ClientFormValues, ClientType } from '../interface/clientsInterface';

const BASE_PATH: string = import.meta.env.VITE_API_PATH + 'clients';

const CLIENT_TYPES_API: string = import.meta.env.VITE_API_PATH + 'client_types';

export const addClient = async (userInfo: ClientFormValues) => {
  try {
    const response = await axios.post(`${BASE_PATH}`, userInfo, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return {
      msg: 'Client était ajouté avec succès',
      addedItem: response.data,
    };
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `Ajouter le client a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchClientTypes = async (): Promise<ClientType[]> => {
  try {
    const response = await axios.get<ClientType[]>(`${CLIENT_TYPES_API}`);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `La récupération des types de clients a échoué avec le statut: ${error.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

export const fetchClients = async (): Promise<ClientsInterface[]> => {
  try {
    const response = await axios.get<ClientsInterface[]>(`${BASE_PATH}`);

    return response.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(
        `La récupération des clients a échoué avec le statut: ${err.response?.status}`
      );
    } else {
      throw new Error('Une erreur inattendue est apparue');
    }
  }
};

// export const getClientById = async (id: number): Promise<ClientsInterface> => {
//   try {
//     const response = await axios.get<ClientsInterface[]>(
//       `${BASE_PATH}/clients/${id}`
//     );
//     return response.data.data;
//   } catch (err) {
//     console.error(err);
//     if (axios.isAxiosError(err)) {
//       throw new Error(
//         `La récupération des clients a échoué avec le statut: ${err.response?.status}`
//       );
//     } else {
//       throw new Error('Une erreur inattendue est apparue');
//     }
//   }
// };
