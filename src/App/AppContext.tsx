import * as React from 'react';
import { auth, base, database, isLoggedIn, provider } from '../base';
import { ITheme, loadTheme, screenSizesPx } from '../styling';
import { setLocalStorage, slugify } from '../utilities';
import {
  ILocalStorage,
  IProject,
  IProjects,
  ISkill,
  ISkills,
  ITodo,
  ITodos,
  TAddProject,
  TAddSkill,
  TAddTodo,
  TRemoveProject,
  TRemoveSkill,
  TRemoveTodo,
  TUpdateTodo,
} from './App.types';

interface IAppContextState {
  context: {
    auth: {
      login?: () => void;
      logout?: () => void;
    };
    addProject?: TAddProject;
    addSkill?: TAddSkill;
    addTodo?: TAddTodo;
    isMobile: boolean;
    projects: IProjects;
    removeProject?: TRemoveProject;
    removeSkill?: TRemoveSkill;
    removeTodo?: TRemoveTodo;
    skills: ISkills;
    theme: ITheme;
    todos: ITodos;
    updateTodo?: TUpdateTodo;
  };
}

// tslint:disable-next-line:interface-name
interface RebaseBinding {}

const appTheme = loadTheme({});

const localStorageData: ILocalStorage = {
  projects: localStorage.getItem('projects'),
  skills: localStorage.getItem('skills'),
  todos: localStorage.getItem('todos'),
};

const defaultState: IAppContextState = {
  context: {
    auth: {},
    isMobile: window.innerWidth <= screenSizesPx.tablet,
    projects: localStorageData.projects
      ? JSON.parse(localStorageData.projects)
      : {},
    skills: localStorageData.skills ? JSON.parse(localStorageData.skills) : {},
    theme: appTheme,
    todos: localStorageData.todos ? JSON.parse(localStorageData.todos) : {},
  },
};

export const AppContext = React.createContext(defaultState.context);

export class AppProvider extends React.Component<{}, IAppContextState> {
  public componentDidMount(): void {
    auth.onAuthStateChanged(
      user => {
        if (user) {
          this.authHandler({ user });
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.getBinding().then(result => {
      setTimeout(() => {
        setLocalStorage('projects', { ...this.state.context.projects });
        setLocalStorage('skills', { ...this.state.context.skills });
        setLocalStorage('todos', { ...this.state.context.todos });
      }, 2000);
    });
  }

  public render() {
    return (
      <AppContext.Provider value={this.state.context}>
        {this.props.children}
      </AppContext.Provider>
    );
  }

  public getBinding = (): Promise<RebaseBinding[]> => {
    return new Promise(resolve => {
      const bind = (state: string): RebaseBinding => {
        return base.bindToState(state, {
          context: this,
          state: `context.${state}`,
        });
      };

      const sync = (state: string): RebaseBinding => {
        return isLoggedIn()
          ? base.syncState(state, {
              context: this,
              onFailure: () => {
                bind(state);
              },
              state: `context.${state}`,
            })
          : bind(state);
      };

      resolve([sync('projects'), sync('skills'), sync('todos')]);
    });
  };

  public addProject = (project: IProject): void => {
    const projects = { ...this.state.context.projects };
    const timestamp = Date.now();
    projects[`project-${timestamp}`] = project;
    this.updateData('projects', { ...projects });
  };

  public addSkill = (skill: ISkill): void => {
    const skills = { ...this.state.context.skills };
    const name = slugify(skill.name);
    skills[`skill-${name}`] = skill;
    this.updateData('skills', { ...skills });
  };

  public addTodo = (todo: ITodo): void => {
    const todos = { ...this.state.context.todos };
    const timestamp = Date.now();
    todos[`todo-${timestamp}`] = { ...todo };
    this.updateData('todos', { ...todos });
  };

  public removeProject = (key: string): void => {
    const projects = { ...this.state.context.projects };
    delete projects[key];
    this.updateData('projects', { ...projects });
  };

  public removeSkill = (key: string): void => {
    const skills = { ...this.state.context.skills };
    delete skills[key];
    this.updateData('skills', { ...skills });
  };

  public removeTodo = (key: string): void => {
    const todos = { ...this.state.context.todos };
    delete todos[key];
    this.updateData('todos', { ...todos });
  };

  public updateTodo = (key: string, updatedProp: ITodo): void => {
    const todos = { ...this.state.context.todos };
    const todo = todos[key];
    const updatedTodo = {
      ...todo,
      ...updatedProp,
    };
    todos[key] = updatedTodo;
    this.updateData('todos', { ...todos });
  };

  public updateData = (
    state: string,
    data: IProjects | ISkills | ITodos
  ): void => {
    setLocalStorage(state, data);
    this.setState({
      context: {
        ...this.state.context,
        [state]: { ...data },
      },
    });
  };

  public authHandler = (authData: any): Promise<any> => {
    const uid = authData.user.uid || authData.uid;
    const rootRef = database.ref();
    return new Promise((resolve, reject) => {
      rootRef.once('value').then(snapshot => {
        const data = snapshot.val() || {};

        if (!data.owner) {
          rootRef
            .set({
              ...data,
              owner: uid,
            })
            .then(() => resolve(this.getBinding()))
            .catch((error: any) => {
              console.error(error);
            });
        } else if (data.owner === uid) {
          resolve(this.getBinding());
        } else {
          reject('Log in denied. You are not the owner of this site.');
        }
      });
    });
  };

  public isLoggedIn = (): boolean => {
    return !!auth.currentUser;
  };

  public login = (): void => {
    auth
      .signInWithPopup(provider)
      .then(result => this.authHandler(result))
      .catch((error: any) => console.error(error));
  };

  public logout = (): void => {
    auth
      .signOut()
      .then(() => this.getBinding())
      .catch((error: any) => console.error(error));
  };

  // tslint:disable-next-line:member-ordering
  public state: IAppContextState = {
    ...defaultState,

    context: {
      ...defaultState.context,
      addProject: this.addProject,
      addSkill: this.addSkill,
      addTodo: this.addTodo,
      auth: {
        ...defaultState.context.auth,
        login: this.login,
        logout: this.logout,
      },
      removeProject: this.removeProject,
      removeSkill: this.removeSkill,
      removeTodo: this.removeTodo,
      updateTodo: this.updateTodo,
    },
  };
}

export function withProjects(Component: any) {
  return function ComponentWithProjects(props: any) {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <Component
              {...props}
              projects={context.projects}
              addProject={context.addProject}
              removeProject={context.removeProject}
            />
          );
        }}
      </AppContext.Consumer>
    );
  };
}

export function withSkills(Component: any) {
  return function ComponentWithSkills(props: any) {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <Component
              {...props}
              skills={context.skills}
              addSkill={context.addSkill}
              removeSkill={context.removeSkill}
            />
          );
        }}
      </AppContext.Consumer>
    );
  };
}

export function withTodos(Component: any) {
  return function ComponentWithTodos(props: any) {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <Component
              {...props}
              todos={context.todos}
              addTodo={context.addTodo}
              removeTodo={context.removeTodo}
              updateTodo={context.updateTodo}
            />
          );
        }}
      </AppContext.Consumer>
    );
  };
}

export function withAuth(Component: any) {
  return function ComponentWithAuth(props: any) {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <Component
              {...props}
              login={context.auth.login}
              logout={context.auth.logout}
            />
          );
        }}
      </AppContext.Consumer>
    );
  };
}