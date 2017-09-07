import React from 'react';
import DocumentTitle from 'react-document-title';
import styled from 'styled-components';
import { layout } from '../theme/variables';

import PageTitle from '../components/PageTitle';

const Main = styled.main`flex: ${layout.mainFlex};`;

const About = () => (
  <DocumentTitle title="Jordan Janzen | About Me">
    <Main>
      <PageTitle title="About" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum quasi et eveniet, aut,
        eligendi pariatur voluptatum facilis officia, ad expedita nihil neque optio totam error
        nobis atque odio doloribus tempora.
      </p>
    </Main>
  </DocumentTitle>
);

export default About;
