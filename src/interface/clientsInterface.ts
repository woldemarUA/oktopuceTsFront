export default interface ClientsInterface {
  id: number;
  type_id: number;
  first_name: string;
  last_name: string;
  contact_name: string | null;
  address: string;
  postal_code: string;
  city: string;
  phone_number: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientFormValues {
  type_id: string;
  first_name?: string;
  last_name?: string;
  contact_name?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  phone_number?: string;
  email?: string;
  language?: string; // Add all other fields as necessary
}

export interface ClientType {
  id: number;
  name: string;
  clients: any[]; // Adjust the type of `clients` if you have a specific type for it
}
