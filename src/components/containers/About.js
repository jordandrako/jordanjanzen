import React from 'react';
import DocumentTitle from 'react-document-title';

import { MainColumn, Main, Row } from '../Grid';
import PageTitle from '../PageTitle';

const About = () => (
  <DocumentTitle title="Jordan Janzen | About">
    <MainColumn>
      <PageTitle title="About" />
      <Main>
        <Row>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quis vitae sequi sit
            dicta, ipsam nobis aliquid! Inventore dolore modi mollitia, maxime dolor illo! Quibusdam
            laboriosam quidem asperiores vero rerum quisquam ratione error soluta ipsa qui porro
            quasi quis, quos nostrum assumenda exercitationem, cum facilis saepe ipsum voluptate?
            Laboriosam temporibus dicta minima, dolorem a aperiam unde doloribus natus assumenda
            provident commodi officia mollitia hic exercitationem animi recusandae necessitatibus,
            deserunt accusamus id excepturi maiores velit explicabo? Vitae incidunt quidem esse
            libero.
          </p>
        </Row>
      </Main>
    </MainColumn>
  </DocumentTitle>
);

export default About;
