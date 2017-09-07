import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors, typography } from '../theme/variables';

const NavList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    text-align: center;
    padding: 15px;
    width: 100%;

    font-family: ${typography.monospace};
    text-transform: lowercase;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${colors.white};
  &.active {
    color: ${colors.red};
    font-size: 1.15em;

    &:before {
      content: '==';
      display: inline-block;
      padding-right: 0.2em;
    }
    &:after {
      content: '=>';
      display: inline-block;
      padding-left: 0.2em;
    }
  }
`;

const Navigation = props => (
  <nav>
    <NavList className={props.navType}>
      <li>
        <Link exact to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/portfolio">Portfolio</Link>
      </li>
    </NavList>
  </nav>
);

Navigation.propTypes = {
  navType: PropTypes.string.isRequired,
};

export default Navigation;
