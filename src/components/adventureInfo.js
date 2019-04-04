import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import EditAdventureForm from './editAdventureForm'
import {
  getAdventureById,
  toggleAdventureDeleting,
  toggleAdventureEditing,
  deleteAdventure
} from '../actions/createAdventure'


export class AdventureInfo extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(getAdventureById(id));
    if (this.props.isEditing) {
      this.props.dispatch(toggleAdventureEditing())
    }
  }

  displayAdventureDeleting() {
    return this.props.dispatch(toggleAdventureDeleting())
  }

  onClickDelete() {
    let adId = this.props.currentAdventure.id;
    return this.props.dispatch(deleteAdventure(adId))
      .then(() => {
        this.props.dispatch(toggleAdventureDeleting())
        this.props.history.push('/dashboard')

      })
  }

  toggleAdventureEditForm() {
    return this.props.dispatch(toggleAdventureEditing())
  }

  AdventureDetails(props) {
    const adventure = this.props.currentAdventure
    if (!adventure) {
      return <div>loading...</div>
    } else if (adventure && this.props.isDeleting) {
      return (
        <div className="confirm-delete-adventure">
          <h3>Are you sure you want to delete this Entire Adventure?</h3>
          <h2>All data will be lost. This cannot be undone</h2>
          <div className="buttons">
            <button
              className="delete-it"
              type='button'
              onClick={() => this.onClickDelete()}
            >Delete It
            </button>
            <button
              className="keep-it"
              type='button'
              onClick={() => this.displayAdventureDeleting()}
            >Keep It
            </button>
          </div>
        </div>
      )
    } else if (adventure && adventure.startVideoURL && !this.props.isEditing) {
      let videoPlay = this.validateURL(this.props.currentNode.videoURL);
      let nodeVideo = (<iframe title='node-video' width="420" height="315" src={videoPlay}></iframe>)
      return (
        <div className='adventure-info'>
          <h2 className="adventure-title">{adventure.title}</h2>
          <h3 className="info-category">Adventure Intro</h3> <p>{adventure.startContent}</p>
          <h3 className="info-category">Opening Video</h3> <div>{nodeVideo}</div>
          <h3 className="info-category">Starting Scenario</h3> <p>{adventure.textContent}</p>
          <h3 className="info-category">Adventure Code:</h3> <p>{adventure.id}</p>
          <div className="buttons">
            <button onClick={() => this.props.history.push(`/adventure/adventurebuilder/${adventure.id}`)} >Build your Adventure</button>
            <button
              type='button'
              onClick={() => this.toggleEditing()}
            >Edit adventure Starting Info
              </button>
            <button className="delete-it"
              type='button'
              onClick={() => this.displayAdventureDeleting()}
            >Delete adventure
              </button>
          </div>
        </div >
      );
    } else if (adventure && !adventure.startVideoURL && !this.props.isEditing) {
      return (
        <div className='single-adventure-home'>
          <div className='adventure-info'>
            <h2 className="adventure-title">{adventure.title}</h2>
            <h3 className="info-category">Adventure Intro</h3> <p>{adventure.startContent}</p>
            <h3 className="info-category">Starting Scenario</h3> <p>{adventure.textContent}</p>
            <h3 className="info-category">Adventure Code:</h3> <p>{adventure.id}</p>
            <div className="buttons">
              <button onClick={() => this.props.history.push(`/adventure/adventurebuilder/${adventure.id}`)} >Build your Adventure</button>
              <button
                type='button'
                onClick={() => this.toggleEditing()}
              >Edit adventure Starting Info
              </button>
              <button className="delete-it"
                type='button'
                onClick={() => this.displayAdventureDeleting()}
              >Delete adventure
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <EditAdventureForm />
      );
    }
  }

  render() {
    return (
      this.AdventureDetails(this.props)
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  // TO-DO ADD ADVENTURE STATE/STORE
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    currentAdventure: state.adventure.currentAdventure,
    isDeleting: state.adventure.isDeleting,
    isEditing: state.adventure.isEditing
  };
};

export default requiresLogin()(connect(mapStateToProps)(AdventureInfo));
