import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { SurveyModel } from '../data/models/surveys/SurveyModel';

interface IProps {
  children: React.ReactNode;
}

export interface IProject {
  surveys: any;
  id: number;
  name: string;
  location_name: string;
  project_date: string;
  description: string;
  updated_at: string;
  background_id: number;
}

interface IProjects {
  projects: IProject[] | null;
  setProjects: Dispatch<SetStateAction<IProject[] | null>>;
  surveys: SurveyModel[] | null;
  setSurveys: Dispatch<SetStateAction<SurveyModel[] | null>>;
  projectSurveys: SurveyModel[] | null;
  setProjectSurveys: Dispatch<SetStateAction<SurveyModel[] | null>>;
}

export const ProjectsContext = createContext<IProjects | null>(null);

const ProjectProvider = ({ children }: IProps) => {
  const [projects, setProjects] = useState<IProject[] | null>([]);
  const [surveys, setSurveys] = useState<SurveyModel[] | null>([]);
  const [projectSurveys, setProjectSurveys] = useState<SurveyModel[] | null>([]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        surveys,
        setSurveys,
        projectSurveys,
        setProjectSurveys,
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);

export default ProjectProvider;
