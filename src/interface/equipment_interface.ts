export interface Finalites {
  is_plancher_chauffant?: boolean;
  is_plancher_raffraichssant?: boolean;
  is_radiateurs?: boolean;
  ventilo_convecteurs?: boolean;
}

export interface EquipmentInterface {
  id: bigint;
  parent_equipment_id?: bigint | null;
  site_id: bigint;
  location_id: bigint;
  nfc_tag_id: bigint;
  gas_type_id?: bigint | null;
  equipment_type_id: bigint;
  equipment_brand_id: bigint;
  installation_date: Date;
  location_precision?: string | null;
  serial_number: string;
  remote_control_number: string;
  gas_weight?: number | null;
  is_plancher_chauffant?: boolean | null;
  is_plancher_raffraichssant?: boolean | null;
  is_radiateurs?: boolean | null;
  ventilo_convecteurs?: boolean | null;
  has_leak_detection: boolean;
  last_leak_detection?: Date | null;
  next_leak_detection?: Date | null;
  unite_exterieur_type_id?: number | null;
  equipment_model: string;
  leak_detection_periodicity?: string | null;
  ballon_capacite?: number | null;
  unite_interieur_type_id?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
// export interface EquipmentInterface {
//   id?: number;
//   site_id: number;
//   location_id: number;
//   parent_equipment_id?: number;
//   nfc_tag_id: number;
//   gas_type_id?: number;
//   equipment_brand_id: number;
//   equipment_type_id: number;
//   installation_date?: string;
//   serial_number: string;
//   remote_control_number?: string;
//   gas_weight?: number;
//   last_leak_detection?: string;
//   next_leak_detection?: string;
//   equipment_model: string;
//   precision?: string;
//   unite_exterieur_type_id?: number;
//   unite_interieur_type_id?: number;
//   ballon_capacite?: number;
//   finalites?: Finalites;
// }

interface Equipment {
  id: bigint;
  parent_equipment_id?: bigint | null;
  site_id: bigint;
  location_id: bigint;
  nfc_tag_id: bigint;
  gas_type_id?: bigint | null;
  equipment_type_id: bigint;
  equipment_brand_id: bigint;
  installation_date: Date;
  location_precision?: string | null;
  serial_number: string;
  remote_control_number: string;
  gas_weight?: number | null;
  is_plancher_chauffant?: boolean | null;
  is_plancher_raffraichssant?: boolean | null;
  is_radiateurs?: boolean | null;
  ventilo_convecteurs?: boolean | null;
  has_leak_detection: boolean;
  last_leak_detection?: Date | null;
  next_leak_detection?: Date | null;
  unite_exterieur_type_id?: number | null;
  equipment_model: string;
  leak_detection_periodicity?: string | null;
  ballon_capacite?: number | null;
  unite_interieur_type_id?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface EquipmentFormValues {
  equipment_type: string;
  endroit: string;
  site_id: number;
  location_id: number;
  parent_equipment_id?: number;
  nfc_tag_id: number;
  gas_type_id?: number;
  equipment_brand_id: number;
  equipment_type_id: string;
  installation_date?: string;
  serial_number: string;
  remote_control_number?: string;
  gas_weight?: number;
  last_leak_detection?: string;
  next_leak_detection?: string;
  equipment_model: string;
  precision?: string;
  precisionCheck?: boolean;
  unite_exterieur_type_id?: number;
  unite_interieur_type_id?: number;
  ballon_capacite?: number;
  finalites?: boolean;
  is_plancher_chauffant?: boolean;
  is_plancher_raffraichssant?: boolean;
  is_radiateurs?: boolean;
  ventilo_convecteurs?: boolean;
}
