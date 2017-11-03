import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CloudImage from './CloudImage';
import Button from './Button';

import { Row } from '../theme/grid';
import { colors, theme, typography } from '../theme/variables';

const ClickOutside = styled(Link)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  width: 100%;
  z-index: 999;
  border-bottom: 0;
`;

const Single = styled.div`
  position: fixed;
  top: 8vh;
  left: 8vw;
  width: 84vw;
  height: 84vh;
  background: ${theme.siteBackground};
  border: 5px solid ${colors.black};
  box-shadow: 0 -3px 0 ${theme.primaryColor}, 0 0 9px #000;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Frame = styled.div`
  width: 100%;
  padding: 0.5em;
  background: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;

  &:last-child {
    margin-top: auto;
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  font-family: ${typography.monospace};
  color: ${colors.lightwhite};
  font-size: 1.15rem;
  margin: 0;
  line-height: 1;
`;

const Close = styled(Link)`
  position: absolute;
  top: 5px;
  right: 8px;
  border-bottom: 0;
  margin: 0;
  padding: 0;

  button {
    margin: 0;
    padding: 0;
  }
`;

class ProjectSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: 0,
      acticeImage: null,
    };
  }

  render() {
    const { details, index } = this.props;
    // const { id, format } = details.images[this.state.activeImageIndex];
    // const image = details.images;

    // console.log(image);
    // this.setState({
    //   ...this.state,
    //   activeImage: id,
    // });

    if (details && index) {
      return (
        <div key={index}>
          <ClickOutside to="/portfolio/" />
          <Single>
            <Frame>
              <Title>{details.name || 'Name'}</Title>
              <Close to="/portfolio">
                <Button type="delete" />
              </Close>
            </Frame>
            <Row>
              {Object.keys(details.images).map((image) => (
                <CloudImage
                  publicId={details.images[image].id}
                  format={details.images[image].format}
                  width="800"
                  height="450"
                  crop="limit"
                />
              ))}
            </Row>
            <Frame>
              <Button small type="secondary">
                Previous
              </Button>
              <Button small type="secondary">
                Next
              </Button>
            </Frame>
          </Single>
        </div>
      );
    }
    return null;
  }
}

ProjectSingle.propTypes = {
  index: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
};

export default ProjectSingle;
