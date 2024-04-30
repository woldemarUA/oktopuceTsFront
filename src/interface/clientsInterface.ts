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
