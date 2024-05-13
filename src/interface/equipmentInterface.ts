export default interface EquipmentInterface {
  id: number; // Not optional since it's not nullable and has an auto-increment
  parent_equipment_id: number | null;
  site_id: number;
  location_id: number;
  nfc_tag_id: number;
  gas_type_id: number;
  equipment_brand_id: number;
  equipment_type_id: number;
  installation_date: string; // Using string to represent datetime
  serial_number: string;
  remote_control_number: string;
  gas_weight: number;
  has_leak_detection: boolean;
  last_leak_detection: string | null; // Using string to represent timestamp
  next_leak_detection: string | null; // Using string to represent timestamp
  created_at: string | null; // Using string to represent timestamp
  updated_at: string | null; // Using string to represent timestamp
}

export interface EquipmentLocationsInterface {
  id: number;
  name: string;
}
export interface EquipmentBrandsInterface {
  id: number;
  name: string;
}

export interface EquipmentFormValues {
  parent_equipment_id: number | null;
  site_id: number;
  location_id: number;
  nfc_tag_id: number;
  gas_type_id: number;
  equipment_brand_id: number;
  equipment_type_id: number;
  // n'xsiste dans le api
  precisionCheck: boolean;
  unite_exterieur_type_id: number;
  equipment_model: string;
  leak_detection_periodicity: string;
  // fin n'xsiste dans le api
  endroit: string;
  installation_date: string; // Using string to represent datetime
  serial_number: string;
  remote_control_number: string;
  gas_weight: number;
  has_leak_detection: boolean;
  last_leak_detection: string | null; // Using string to represent timestamp
  next_leak_detection: string | null; // Using string to represent timestamp
  created_at: string | null; // Using string to represent timestamp
  updated_at: string | null; // Using string to represent timestamp
}
