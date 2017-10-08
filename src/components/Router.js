import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import MyLoadable from './MyLoadable';

const AsyncHome = MyLoadable({
  loader: () => import('./containers/Home'),
});
const AsyncAbout = MyLoadable({
  loader: () => import('./containers/About'),
});
const AsyncPortfolio = MyLoadable({
  loader: () => import('./containers/Portfolio'),
});
const AsyncTodoList = MyLoadable({
  loader: () => import('./containers/TodoList'),
});
const AsyncNotFound = MyLoadable({
  loader: () => import('./containers/NotFound'),
});
const AsyncUnauthenticated = MyLoadable({
  loader: () => import('./containers/Unauthenticated'),
});

const Router = (props) => (
  <Switch>
    <Route exact path="/" component={AsyncHome} />
    <Route
      path="/about"
      render={() => (
        <AsyncAbout
          uid={props.uid}
          skills={props.skills}
          addSkill={props.addSkill}
          updateSkill={props.updateSkill}
          removeSkill={props.removeSkill}
        />
      )}
    />
    <Route
      path="/portfolio"
      render={() => (
        <AsyncPortfolio
          uid={props.uid}
          projects={props.projects}
          addProject={props.addProject}
          updateProject={props.updateProject}
          removeProject={props.removeProject}
        />
      )}
    />
    <Route
      exact
      path="/todo"
      render={() =>
        props.uid ? (
          <AsyncTodoList
            todos={props.todos}
            addTodo={props.addTodo}
            updateTodo={props.updateTodo}
            removeTodo={props.removeTodo}
          />
        ) : (
          <AsyncUnauthenticated />
        )}
    />
    {/* Unmatched URLs */}
    <Route component={AsyncNotFound} />
  </Switch>
);

Router.propTypes = {
  uid: PropTypes.string,
  todos: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  updateSkill: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

Router.defaultProps = {
  uid: null,
};

export default withRouter(Router);
