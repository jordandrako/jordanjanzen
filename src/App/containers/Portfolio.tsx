import * as React from 'react';
import { Route } from 'react-router-dom';
import { styled } from '../../styling';
import {
  IProjects,
  ISkills,
  TAddProject,
  TRemoveProject,
  TUpdateProject,
} from '../App.types';
import AddProjectForm from '../components/Forms/AddProjectForm/AddProjectForm';
import Project from '../components/Project/Project';
import ProjectSingle from '../components/Project/ProjectSingle/ProjectSingle';
import { Page, Row } from './Grid/grid';

const ListOfProjects = styled.ul`
  list-style-type: none;
  margin: 0 -0.5em;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

interface IPortfolioProps {
  addProject: TAddProject;
  isLoggedIn: boolean;
  isMobile: boolean;
  projects: IProjects;
  removeProject: TRemoveProject;
  skills: ISkills;
  updateProject: TUpdateProject;
  cloudinary?: {
    key?: string;
    secret?: string;
  };
}

interface IPortfolioState {
  category?: string;
}

class Portfolio extends React.Component<IPortfolioProps, IPortfolioState> {
  constructor(props: IPortfolioProps) {
    super(props);

    this.state = {
      category: 'all',
    };
  }

  public render(): JSX.Element {
    const {
      addProject,
      cloudinary,
      isLoggedIn,
      isMobile,
      projects,
      removeProject,
      skills,
      updateProject,
    } = this.props;

    return projects ? (
      <Page title="Portfolio">
        <Row>
          <ListOfProjects>
            {Object.keys(projects)
              .reverse()
              .map(key => (
                <Project
                  key={key}
                  index={key}
                  details={projects[key]}
                  updateProject={updateProject}
                />
              ))}
          </ListOfProjects>
        </Row>
        {isLoggedIn && skills ? (
          <Row>
            <AddProjectForm
              addProject={addProject}
              cloudinary={cloudinary}
              skills={skills}
            />
          </Row>
        ) : null}
        <Route
          exact={true}
          path="/portfolio/:projectId"
          /* tslint:disable-next-line jsx-no-lambda*/
          render={props => (
            <ProjectSingle
              isLoggedIn={isLoggedIn}
              isMobile={isMobile}
              projects={projects}
              index={props.match.params.projectId}
              details={projects[props.match.params.projectId]}
              updateProject={updateProject}
              removeProject={removeProject}
              {...props}
            />
          )}
        />
      </Page>
    ) : (
      <div />
    );
  }
}

export default Portfolio;
