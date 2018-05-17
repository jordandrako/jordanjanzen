import { History } from 'history';
import { IProject, IProjects } from '../../App.types';

export interface IProjectProps {
  details: IProject;
  index: string;
  hasBeenVisible?: boolean;
  style?: {};
}

export interface IProjectStyleProps {}

export interface IProjectSingleProps extends IProjectProps {
  removeProject: (key: string) => void;
  history: History;
  projects: IProjects;
  isMobile: boolean;
}
