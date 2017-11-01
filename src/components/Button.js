import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, theme, typography } from '../theme/variables';

const BtnColor = (props) => props.color || theme.buttonText;
const Background = (props) => {
  if (props.bg) {
    return props.bg;
  } else if (props.type === 'success' || props.type === 'submit') {
    return colors.green;
  } else if (props.type === 'warn') {
    return colors.red;
  } else if (props.type === 'login') {
    return colors.lightblack;
  }
  return theme.buttonColor;
};

const Round = (props) => {
  if (props.circle || props.type === 'delete' || props.delete) {
    return '100%';
  } else if (props.pill) {
    return '5em';
  }
  return 0;
};

const Btn = styled.button`
  border: none;
  border-radius: ${Round};
  padding: ${(props) =>
    props.arrows ? '0.25em 0.8em 0.25em 1.5em' : '.5em .8em'};
  position: relative;
  color: ${BtnColor};
  font-family: ${typography.monospace};
  background: ${Background};
  display: flex;
  justify-content: space-around;

  opacity: ${(props) => (props.type === 'secondary' ? 0.75 : 1)};
  transform: translateY(0);

  width: ${(props) => (props.wide ? '100%' : 'auto')};
  font-size: ${(props) => {
    if (props.small) {
      return '.8rem';
    } else if (props.large) {
      return '1.7rem';
    }
    return '1.1rem';
  }};

  transition: all 0.25s ease-in-out;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  &.disabled {
    background: ${colors.grey};
    color: ${colors.black};
  }

  i.fa {
    padding-right: 0.75em;
    margin-right: auto;
    align-self: flex-start;
  }

  &:before,
  &:after {
    content: '';
    display: ${(props) => (props.arrows ? 'block' : 'none')};
    position: absolute;
    top: 50%;
    width: 1.2em;
    height: 1.2em;
    transition: all 0.25s ease-in;
  }

  &:before {
    transform: translateY(-50%) scaleX(0.75) rotate(45deg);
    background: ${(props) => props.arrows || BtnColor};
    left: -0.6em;
  }

  &:after {
    transform: translateY(-50%) scaleX(0.75) rotate(45deg);
    background: ${Background};
    right: -0.6em;
  }
`;

const DelBtn = styled.button`
  position: relative;
  top: 3px;
  font-size: 26px;
  margin: 0 0.5em;
  padding: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  opacity: 0.85;
  color: ${colors.red};
  background: ${colors.black};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    opacity: 1;
  }
`;

const Button = (props) => {
  if (props.type === 'delete') {
    return <DelBtn {...props} className="fa fa-times-circle close" />;
  }
  return <Btn {...props}>{props.text || props.children || 'Button'}</Btn>;
};

Button.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'login',
    'success',
    'warn',
    'danger',
    'delete',
    'submit',
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  text: PropTypes.string,
  color: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  wide: PropTypes.bool,
  arrows: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  pill: PropTypes.bool,
  circle: PropTypes.bool,
  delete: PropTypes.bool,
  bg: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

Button.defaultProps = {
  type: 'primary',
  children: null,
  text: null,
  color: theme.buttonText,
  bg: null,
  small: false,
  large: false,
  wide: false,
  arrows: false,
  pill: false,
  circle: false,
  delete: false,
  onClick: null,
  style: null,
};

export default Button;
