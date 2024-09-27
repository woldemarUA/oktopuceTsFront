export interface Finalites {
  is_plancher_chauffant?: boolean;
  is_plancher_raffraichssant?: boolean;
  is_radiateurs?: boolean;
  ventilo_convecteurs?: boolean;
}

// export interface EquipmentInterface {
//   id: bigint;
//   parent_equipment_id?: bigint | null;
//   site: string;
//   location_id: bigint;
//   nfc_tag: string;
//   gas_type_id?: bigint | null;
//   equipment_type_id: string;
//   equipment_brand_id: string;
//   installation_date: Date;
//   location_precision?: string | null;
//   serial_number: string;
//   remote_control_number: string;
//   gas_weight?: string;
//   is_plancher_chauffant?: boolean | null;
//   is_plancher_raffraichssant?: boolean | null;
//   is_radiateurs?: boolean | null;
//   ventilo_convecteurs?: boolean | null;
//   has_leak_detection: boolean;
//   last_leak_detection?: Date | null;
//   next_leak_detection?: Date | null;
//   unite_exterieur_type_id?: number | null;
//   equipment_model: string;
//   leak_detection_periodicity?: string | null;
//   ballon_capacite?: number | null;
//   unite_interieur_type_id?: number | null;
//   created_at?: Date | null;
//   updated_at?: Date | null;
// }

export interface EquipmentInterface {
  parent?: string | null;
  site: string;
  location?: number;
  nfcTag: string;
  gasType?: number | null;
  equipmentType: string;
  equipmentBrand: string;
  installationDate: Date;
  locationPrecision?: string | null;
  serialNumber: string;
  remoteControlNumber: string;
  gasWeight?: string;
  isPlancherChauffant?: boolean | null;
  isRadiateurs?: boolean | null;
  ventiloConvecteurs?: boolean | null;
  hasLeakDetection: boolean;
  lastLeakDetection?: Date | null;
  nextLeakDetection?: Date | null;
  uniteExterieurType?: number | null;
  equipmentModel: string;
  ballonCapacite?: number | null;
  uniteInterieurType?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  isPlancherRaffraichissant?: boolean | null;
  leakDetectionPeriodicity?: string | null;
}

export interface EquipmentFormValues {
  equipmentProduct: string;
  endroit: string;
  site: number;
  location: number;
  parent?: number;
  nfcTag: number;
  gasType?: number;
  equipmentBrand: number;
  equipmentType: string;
  installationDate?: string;
  serialNumber: string;
  remoteControlNumber?: string;
  gasWeight?: number;
  lastLeakDetection?: string;
  nextLeakDetection?: string;
  equipmentModel: string;
  locationPrecision?: string;
  precisionCheck?: boolean;
  uniteExterieurType?: number;
  uniteInterieurType?: number;
  ballonCapacite?: number;
  hasLeakDetection?: boolean;
  isPlancherChauffant?: boolean;
  isPlancherRaffraichissant?: boolean;
  isRadiateurs?: boolean;
  ventiloConvecteurs?: boolean;
  finalites?: boolean;
}
