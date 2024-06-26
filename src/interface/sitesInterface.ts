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
  clientContactName: string | undefined;
  clientEmail: string;
  clientFirstName: string;
  clientPhone: string;
  clientSecondName: string | undefined;
}

export interface SitesFormValues {
  client_id: string;
  name: string;
  address: string;
  postal_code: string;
  city: string;
  phone_number: string;
  email: string;
  maintenance_provider: string;
  main_nom?: string;
  main_telephone?: string;
  main_mail?: string;
}
