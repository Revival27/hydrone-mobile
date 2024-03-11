export interface AddSurveyModel {
  name: string;
  description: string;
  survey_class: string;
  latitude: number;
  longitude: number;
  background_id: number;
  project_id?: number;
}
