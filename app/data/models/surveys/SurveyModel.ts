export interface SurveyModel {
  id: number;
  name: string;
  description: string;
  survey_class: string;
  latitude: number;
  longitude: number;
  updated_at: string;
  measurements_image_count: number | 0;
  measurements_video_count: number | 0;
  measuremens: any[];
}
