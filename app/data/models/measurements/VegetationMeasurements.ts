export interface VegetationMeasurement {
  id: number;
  measurement_id: number;
  measurement_name: string;
  foliage: number;
  undergrowth: number;
  wildlife: number;
  replantation: number;
  description: string;
  updated_at: string;
}

export interface AddVegetationMeasurement {
  measurement_id: number;
  foliage: number;
  undergrowth: number;
  wildlife: number;
  replantation: number;
  description: string;
}

export interface EditVegetationMeasurement {
  measurement_id: number;
  foliage: number;
  undergrowth: number;
  wildlife: number;
  replantation: number;
  description: string;
}
