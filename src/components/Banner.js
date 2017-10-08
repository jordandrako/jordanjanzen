import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { goBack } from 'react-router-dom';
import styled from 'styled-components';

import { colors, typography } from '../theme/variables';
import { toTitleCase } from '../helpers';

const Alert = styled.div`
  background: ${(props) => {
    const type = props.type;
    if (type === 'alert') {
      return colors.yellow;
    } else if (type === 'success') {
      return colors.green;
    } else if (type === 'error') {
      return colors.red;
    }
    return colors.lightblack;
  }};
  padding: 1em 2em 1em 1em;
  margin: 0 0 1.5em;
  border-radius: 0.25em;
  border: inset solid 3px rgba(255, 255, 255, 0.5);
  font-family: ${typography.monospace};
  position: relative;

  .showHide {
    position: absolute;
    top: 1em;
    right: 1em;
    width: 2em;
    height: 2em;
    padding: 0;
    border: 2px solid ${colors.black};
    border-radius: 50%;
    background: transparent;
    span {
      display: block;
      position: absolute;
      width: 80%;
      height: 3px;
      background: ${colors.black};
      transition: all 0.1s ease-in-out;
      transform-origin: 50% 50%;
      left: 10%;
      top: 50%;
      margin-top: -1.5px;
    }
  }

  h4,
  .actionButton {
    height: auto;
    display: block;
    opacity: 1;
    transition: all 0.5s ease-in-out;
  }

  h4 {
    margin: 0;
  }

  .actionButton {
    margin: 0.5em 0 0;
    background: transparent;
    border: 2px solid ${colors.black};
    font-family: ${typography.monospace};
    padding: 0.4em 1em;
  }

  &.closed {
    h4,
    .actionButton {
      height: 0;
      display: none;
      opacity: 0;
    }
    .showHide {
      .vertical {
        transform: rotate(90deg);
      }
    }
  }
`;

class Banner extends Component {
  constructor() {
    super();
    this.showHide = this.showHide.bind(this);
    this.doAction = this.handleAction.bind(this);

    this.state = {
      closed: false,
      action: null,
    };
  }

  showHide() {
    this.setState({
      closed: !this.state.closed,
    });
  }

  handleAction() {
    const action = this.props.action;
    if (typeof action === 'function') {
      this.props.action();
    }
    if (action === 'hide') {
      console.log('hide');
      this.showHide();
    }
    if (action === 'reload') {
      console.log('forceUpdate');
      return this.forceUpdate();
    }
    if (action === 'back') {
      // TODO: make router go back
      console.log('Going back');
      return this.context.router.goBack();
    }
    this.setState.action = 'Unknown action';
    return null;
  }

  render() {
    const action = this.props.action;
    const closed = this.state.closed ? 'closed' : null;
    const showHideButton = (
      <button className="showHide" onClick={this.showHide}>
        <span className="horizontal" />
        <span className="vertical" />
      </button>
    );
    const actionButton = (
      <button
        className="actionButton"
        onClick={action === 'hide' ? this.showHide : this.handleAction}
      >
        {toTitleCase(this.props.actionText)}
      </button>
    );

    return (
      <Alert type={this.props.type} className={closed}>
        {this.state.closed ? `${toTitleCase(this.props.type)} Message` : null}
        {showHideButton}
        <h4>{this.props.children}</h4>
        {actionButton}
      </Alert>
    );
  }
}

Banner.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  action: PropTypes.oneOfType([
    PropTypes.oneOf(['hide', 'reload', 'back']),
    PropTypes.func,
  ]).isRequired,
  actionText: PropTypes.string,
};

Banner.defaultProps = {
  type: 'info',
  actionText: 'Hide',
};

export default Banner;
