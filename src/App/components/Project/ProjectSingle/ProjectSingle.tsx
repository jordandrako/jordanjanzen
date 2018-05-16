import * as React from 'react';
import { isLoggedIn } from '../../../../base';
import { palette } from '../../../../styling';
import Loading from '../../../containers/Loading';
import Button, { ButtonType } from '../../Button';
import CloudImage from '../../CloudImage';
import { IProjectSingleProps } from '../Project.types';
import * as Styled from './ProjectSingle.styles';

interface IProjectSingleState {
  delete?: string;
}

export default class ProjectSingle extends React.Component<
  IProjectSingleProps,
  IProjectSingleState
> {
  public static getDerivedStateFromProps(
    nextProps: IProjectSingleProps,
    prevState: IProjectSingleState
  ) {
    if (nextProps.index !== prevState.delete) {
      return { delete: undefined };
    }
    return null;
  }
  constructor(props: IProjectSingleProps) {
    super(props);
    this.state = {
      delete: undefined,
    };
  }

  public render(): JSX.Element {
    const { projects, details, index, isMobile } = this.props;

    const total = Object.keys(projects).length - 1;

    const current = Object.keys(projects).indexOf(index);

    const nextIndex = current === total ? 0 : current + 1;

    const prevIndex = current === 0 ? total : current - 1;

    const prevId = Object.keys(projects)[nextIndex];

    const nextId = Object.keys(projects)[prevIndex];

    if (details && index) {
      return (
        <div key={index}>
          <Styled.ClickOutside to="/portfolio/" />
          <Styled.Container>
            <Styled.Single>
              <Styled.Frame>
                <Styled.Title>{details.name || 'Name'}</Styled.Title>
                <Button
                  to="/portfolio"
                  buttonType={ButtonType.Delete}
                  style={{ margin: 0 }}
                />
              </Styled.Frame>
              <Styled.Content>
                <p>{details.long_desc}</p>
                {Object.keys(details.images).map((image, imageIndex) => (
                  <CloudImage
                    key={details.images[image].id}
                    name={`Feature ${imageIndex} ${details.images[image].id}`}
                    publicId={details.images[image].id}
                    format={details.images[image].format}
                    width={isMobile ? '400' : '800'}
                    crop="limit"
                    link={true}
                  />
                ))}
              </Styled.Content>
              <Styled.Frame>
                <Button
                  to={`/portfolio/${prevId}`}
                  small={true}
                  buttonType={ButtonType.Secondary}
                >
                  <i className="fa fa-arrow-left" aria-hidden="true" />
                  {this.props.isMobile ? '' : ' prev'}
                </Button>
                {details.link !== '' ? (
                  <Button
                    href={details.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    small={true}
                    buttonType={ButtonType.Secondary}
                  >
                    {this.props.isMobile ? (
                      ''
                    ) : (
                      <i className="fa fa-external-link" aria-hidden="true" />
                    )}{' '}
                    Visit Site
                  </Button>
                ) : null}
                {details.repo !== '' ? (
                  <Button
                    href={details.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    small={true}
                    buttonType={ButtonType.Secondary}
                  >
                    <i className="fa fa-github" aria-hidden="true" /> View Repo
                  </Button>
                ) : null}
                {isLoggedIn() ? (
                  <Button
                    small={true}
                    buttonType={ButtonType.Secondary}
                    bg={palette.red}
                    onClick={this._handleDelete}
                  >
                    {this.state.delete ? 'Confirm?' : 'Delete'}
                  </Button>
                ) : null}
                <Button
                  to={`/portfolio/${nextId}`}
                  small={true}
                  buttonType={ButtonType.Secondary}
                >
                  {this.props.isMobile ? '' : 'next '}
                  <i className="fa right fa-arrow-right" aria-hidden="true" />
                </Button>
              </Styled.Frame>
            </Styled.Single>
          </Styled.Container>
        </div>
      );
    }
    return <Loading isLoading={true} />;
  }

  private _removeProject = (key: string) => {
    const state = { ...this.state };
    this.setState({ ...state, delete: undefined });
    this.props.removeProject(key);
    return this.props.history.push('/portfolio');
  };

  private _handleDelete = () => {
    const { index } = this.props;
    if (this.state.delete === undefined) {
      return this.setState({ delete: index });
    }
    return this._removeProject(index);
  };
}
