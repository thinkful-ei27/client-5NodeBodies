import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './requires-login';
import EditAdventureForm from './editAdventureForm'
import Analytics from './analytics'
import {
  getAdventureById,
  toggleAdventureDeleting,
  toggleAdventureEditing,
  deleteAdventure,
  toggleAnalyticsDisplay
} from '../actions/createAdventure'
import { toggleOnboarding } from '../actions/auth'



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

  showAnalytics() {
    return this.props.dispatch(toggleAnalyticsDisplay())
  }

  toggleOnboardingClick() {
    this.props.dispatch(toggleOnboarding())
  }

  AdventureDetails() {
    const adventure = this.props.currentAdventure
    let analytics, password;
    if (this.props.showAnalytics) {
      analytics = <Analytics />
    }
    let onboarding;
    if (this.props.onboarding) {
      onboarding = <div className="wideOnboarding arrowBox_Top onboarding">
        <span>This page contains the basic info for you LearnVenture. You can use the buttons at the bottom of the info
        section to go to the <strong>LearnVenture Builder</strong> to begin or continue building the checkpoints and pathways,
        <strong>Edit LearnVenture Starting Info</strong> to change the information you see here, <strong>Delete LearnVenture</strong>
          to permanently delete this LearnVenture, or <strong>Show Analytics</strong> to view info about how learners have used this
        LearnVenture.</span>
        <button className="close-onboarding" onClick={() => this.toggleOnboardingClick()}>Close</button>
      </div>
    } else {
      onboarding = null
    }
    if (!adventure) {
      return <div>loading...</div>
    } else if (adventure && this.props.isDeleting) {
      return (
        <div className="confirm-delete-adventure">
          <h3>Are you sure you want to delete this Entire LearnVenture?</h3>
          <h2>All data will be lost. This cannot be undone</h2>
          <div className="buttons">
            <button
              className="delete-button on-left delete-it"
              type='button'
              onClick={() => this.onClickDelete()}
            >Delete It
            </button>
            <button
              className="on-right keep-it"
              type='button'
              onClick={() => this.displayAdventureDeleting()}
            >Keep It
            </button>
          </div>
        </div>
      )
    } else if (adventure && adventure.startVideoURL && !this.props.isEditing) {
      if (adventure.hasPassword) {
        console.log('has pass')
        password = <span>This LearnVenture is password protected</span>
      }
      let videoPlay = adventure.startVideoURL;
      let nodeVideo = (<iframe title='node-video' width="420" height="315" src={videoPlay}></iframe>)
      return (
        <div className='adventure-info'>
          <h2 className="adventure-title">{adventure.title}</h2>
          <h3 className="info-category">LearnVenture Intro</h3> <p>{adventure.startContent}</p>
          <h3 className="info-category">Opening Video</h3> <div>{nodeVideo}</div>
          <h3 className="info-category">Starting Scenario</h3> <p>{adventure.textContent}</p>
          <h3 className="info-category">LearnVenture Code:</h3> <p>{adventure.id}</p>
          {password}
          <div className="buttons">
            <button onClick={() => this.props.history.push(`/adventure/adventurebuilder/${adventure.id}`)} >Build your Adventure</button>
            <button
              type='button'
              onClick={() => this.toggleAdventureEditForm()}
            >Edit LearnVenture Starting Info
              </button>
            <button className="delete-it"
              type='button'
              onClick={() => this.displayAdventureDeleting()}
            >Delete this LearnVenture
              </button>
            <button className="analyze-it"
              type='button'
              onClick={() => this.showAnalytics()}
            >{this.props.showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
            </button>
          </div>
          {analytics}
          {onboarding}
        </div >
      );
    } else if (adventure && !adventure.startVideoURL && !this.props.isEditing) {
      if (this.props.currentAdventure.hasPassword) {
        password = <span>This LearnVenture is password protected</span>
      }
      return (
        <div className='single-adventure-home'>
          <div className='adventure-info'>
            <h2 className="adventure-title">{adventure.title}</h2>
            <h3 className="info-category">Adventure Intro</h3> <p>{adventure.startContent}</p>
            {/* <h3 className="info-category">Starting Scenario</h3> <p>{adventure.textContent}</p> */}
            <h3 className="info-category">Adventure Code:</h3> <p>{adventure.id}</p>
            {password}
            <div className="buttons">
              <button
                className='on-left'
                onClick={() => this.props.history.push(`/adventure/adventurebuilder/${adventure.id}`)} >Build your Adventure</button>
              <button
                className='on-left on-right'

                type='button'
                onClick={() => this.toggleAdventureEditForm()}
              >Edit LearnVenture Info
              </button>

              <button 
                className='on-left on-right'
                type='button'
                onClick={() => this.displayAdventureDeleting()}
              >Delete LearnVenture
              </button>
              <button
                className='on-right'
                type='button'
                onClick={() => this.showAnalytics()}
              >{this.props.showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
              </button>
            </div>
          </div>
          {analytics}
          {onboarding}
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
      this.AdventureDetails()
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
    isEditing: state.adventure.isEditing,
    showAnalytics: state.adventure.showAnalytics,
    onboarding: state.auth.onboarding
  };
};

export default RequiresLogin()(connect(mapStateToProps)(AdventureInfo));
