export interface AddMeasurement {
  survey_id: number;
  name: string;
  description: string;
  measurement_type_id: number;
  latitude: number;
  longitude: number;
  date: Date;
  time: Date;
}

interface Images {
  id: number;
  name: string;
  previewUrl: string;
  imageUrl: string;
}

interface Video {
  id: number;
  name: string;
  videoUrl: string;
}

export interface Measurement {
  id: number;
  survey_id: number;
  survey_name: string;
  name: string;
  description: string;
  measurement_type_id: number;
  measurement_type_slug: string;
  latitude: number;
  longitude: number;
  date: string;
  time: string;
  images: Array<Images>;
  videos: Array<Video>;
}

export interface EditMeasurement {
  id: number;
  survey_id: number;
  name: string;
  description: string;
  measurement_type_id: number;
  latitude: number;
  longitude: number;
}

export interface MeasurementTypes {
  id: number;
  name: string;
  slug: string;
}
