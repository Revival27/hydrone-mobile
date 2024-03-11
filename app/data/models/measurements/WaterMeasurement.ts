export interface WaterMeasurement {
  id: number;
  measurement_id: number;
  measurement_name: string;
  water_level_id: number;
  water_level_slug: string;
  water_level_name: string;
  water_discharge_id: number;
  water_discharge_speed: number;
  water_discharge_slug: string;
  water_discharge_name: string;
  river_width_enough: number;
  river_width_length: number;
  river_bed: string;
  river_wall: string;
  river_wall_color: string;
  wildlife: number;
  description: string;
  updated_at: string;
}

export interface AddWaterMeasurement {
  measurement_id: number;
  water_level_id: number;
  water_discharge_id: number;
  water_discharge_speed: number;
  river_width_enough: number;
  river_width_length: number;
  river_bed: string;
  river_wall: string;
  river_wall_color: string;
  wildlife: number;
  description: string;
}

export interface EditWaterMeasurement {
  measurement_id: number;
  water_level_id: number;
  water_discharge_id: number;
  water_discharge_speed: number;
  river_width_enough: number;
  river_width_length: number;
  river_bed: string;
  river_wall: string;
  river_wall_color: string;
  wildlife: number;
  description: string;
}

export interface WaterDischarge {
  id: number;
  name: string;
  slug: string;
}

export interface WaterLevel {
  id: number;
  name: string;
  slug: string;
}
