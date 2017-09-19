import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { colors, typography } from '../theme/variables';
import Navigation from './Navigation';

const LeftColumn = styled.aside`
  padding-top: 30px;
  background: ${colors.black};
  color: ${colors.white};
  height: 100%;
  min-width: 260px;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-right: 2px solid ${colors.darkblack};
`;

const Top = styled.section`flex-shrink: 0;`;

const Bottom = styled.section`
  flex-grow: 1;
  overflow-y: auto;
`;

const Logo = styled.h2`
  text-transform: uppercase;
  font-weight: 300;
  color: ${colors.brightwhite};
  margin: 0;
  text-align: center;
  line-height: 1.2;
  font-size: 2.5rem;

  span:first-child {
    letter-spacing: 1px;
  }

  span:last-child {
    letter-spacing: 1.6px;
  }
`;

const Tagline = styled.h3`
  font-family: ${typography.monospace};
  color: ${colors.black};
  background: ${colors.lightblue};
  padding: 4px 0;
  text-align: center;
  width: 100%;
  font-size: 1.1rem;
  text-transform: lowercase;
  margin: 15px 0 0;
`;

const Sidebar = () => (
  <LeftColumn>
    <Top>
      <Logo>
        <span>JORDAN</span>
        <br />
        <span>JANZEN</span>
      </Logo>
      <Tagline>Never Stop Learning</Tagline>
    </Top>
    <Bottom>
      <Navigation navType="main-nav" />
    </Bottom>
  </LeftColumn>
);

export default Sidebar;
