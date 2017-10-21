import React from 'react';
import styled from 'styled-components';

import codeLoader from '../images/codeLoader.svg';
import { colors } from '../theme/variables';

const Loader = styled.div`
  border: 3px solid ${colors.black};
  border-top: 0;
  padding: 0 1.2em;
  position: relative;
  max-width: 420px;
  overflow: hidden;
  background: ${colors.lightwhite};
`;

const Frame = styled.div`
  background: ${colors.black};
  width: 100%;
  height: 28px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  &:after {
    content: '\00d7';
    color: ${colors.red};
    display: block;
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: 24px;
    line-height: 1;
  }
`;

const Scrollbar = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  height: 100%;
  background: ${colors.white};

  &:after {
    content: '';
    display: block;
    width: 17px;
    height: 60px;
    position: absolute;
    top: 32px;
    right: 3px;
    border-radius: 9px;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const StyledLoader = () => (
  <Loader>
    <Frame />
    <object type="image/svg+xml" data={codeLoader}>
      loading...
    </object>
    <Scrollbar />
  </Loader>
);

export default StyledLoader;
