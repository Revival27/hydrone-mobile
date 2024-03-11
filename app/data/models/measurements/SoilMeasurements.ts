export interface SoilMeasurement {
  id: number;
  measurement_id: number;
  measurement_name: string;
  composition_surface_id: number;
  composition_surface_name: string;
  composition_half_meter_id: number;
  composition_half_meter_name: string;
  composition_one_meter_id: number;
  composition_one_meter_name: string;
  type_id: number;
  type_name: string;
  compactness_id: number;
  compactness_name: string;
  general_quality: number;
  description: string;
  updated_at: string;
}

export interface AddSoilMeasurement {
  measurement_id: number;
  composition_surface_id: number;
  composition_half_meter_id: number;
  composition_one_meter_id: number;
  type_id: number;
  compactness_id: number;
  general_quality: number;
  description: string;
}

export interface EditSoilMeasurement {
  measurement_id: number;
  composition_surface_id: number;
  composition_half_meter_id: number;
  composition_one_meter_id: number;
  type_id: number;
  compactness_id: number;
  general_quality: number;
  description: string;
}

export interface SoilTypes {
  id: number;
  name: string;
  slug: string;
}

export interface SoilCompactness {
  id: number;
  name: string;
  slug: string;
}

export interface SoilCompositions {
  id: number;
  name: string;
  slug: string;
}
