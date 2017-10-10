import styled from 'styled-components';

import { mediaMax } from '../theme/style-utils';

export const MainContainer = styled.main`
  flex: 4;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  ${mediaMax.tablet`
    overflow-y: auto;
  `};
`;

export const Main = styled.div`
  padding: 2em;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  ${mediaMax.tablet`
    overflow-y: initial
    padding: 1.5em 1em;
  `};
`;

export const Row = styled.section`
  max-width: 1000px;
  margin-bottom: 2.5em;
`;
