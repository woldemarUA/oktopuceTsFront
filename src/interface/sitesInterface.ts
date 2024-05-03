export default interface SitesInterface {
  id?: number;
  client_id: number;
  name: string;
  address: string;
  postal_code: string;
  city: string;
  phone_number: string;
  email: string;
  interventions?: string[];
  has_maintenance_provider: boolean;
  maintenance_provider?: {
    main_nom: string | undefined;
    main_telephone: string | undefined;
    main_mail: string | undefined;
  } | null;
}
