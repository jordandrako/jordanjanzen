import * as React from 'react';
import Banner, { BannerType } from '../components/Banner';
import { SocialButton, SocialSites } from '../components/Button';
import { Page, Row } from './Grid/grid';

const NotFound = () => (
  <Page title="404">
    <Row>
      <Banner type={BannerType.Danger}>
        Sorry, I couldn't find that page.
      </Banner>
      <p>
        Think something should be here or maybe you clicked on a bugged{' '}
        <span role="img" aria-label="bug">
          🐛
        </span>{' '}
        link?<br />
        <SocialButton
          href="https://twitter.com/jordancjanzen"
          social={SocialSites.twitter}
        >
          Send me a tweet
        </SocialButton>
      </p>
    </Row>
  </Page>
);

export default NotFound;