export default interface InterventionInterface {
  id: number; // Not optional since it's not nullable and has an auto-increment
  intervention_type_id: number;
  site_id: number;
  intervention_date: string; // Date type is represented as a string
  company_name: string;
  technician_name: string;
  int_type_name?: string;
  site_name?: string;
  answers: any; // JSON type can be represented as any or a more specific type depending on the structure
  additional_information: string | null; // Text can be large, hence string
  created_at: string | null; // Using string to represent timestamp
  updated_at: string | null; // Using string to represent timestamp
}

export interface InterventionsFormProps {
  additional_information: string | null;
  company_name: string;
  intervention_date: string;
  intervention_type_id: number;
  is_electrical_connections_done: boolean;
  is_functionality_tested: boolean;
  is_network_leakage_tested: boolean;
  is_refrigerant_connections_done: boolean;
  is_unit_installed: boolean;
  site_id: number;
  technician_name: string;
}
