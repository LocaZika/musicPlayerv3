import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark 
} from '@fortawesome/free-solid-svg-icons';
import withContext from './stateGlobal/withContext';

class VolumeControl extends Component {
  constructor(props){
    super(props);
    this.volumeValue = 0;
    this.state = {
      faIcon: <FontAwesomeIcon icon={faVolumeHigh} />,
    }
  }
  handleVolumeClick = () => {
    const {audio, data, dispatch, volume} = this.props.context;
    let isMuted = data.isMuted;
    if(data.isMuted === false) {
      audio.volume = 0;
    }else{
      audio.volume = volume;
    }
    isMuted = !isMuted;
    dispatch.setIsMuted(isMuted);
  }
  handleVolumeChange = (e) => {
    const {audio, dispatch} = this.props.context;
    this.volumeValue = e.target.value;
    let icon;
    this.volumeValue >= 50 ?
      icon = faVolumeHigh :
      this.volumeValue <= 0 ?
        icon = faVolumeXmark :
        icon = faVolumeLow;
    const template = <FontAwesomeIcon icon={icon} />;
    this.setState({faIcon: template});
    dispatch.setVolume(this.volumeValue);
    audio.volume = this.volumeValue / 100;
  }
  render() {
    return (
      <>
        <div className="player-controls__buttons__volume">
          <div className="player-controls__buttons__volume--status">
            <button onClick={this.handleVolumeClick} >
              {this.state.faIcon}
            </button>
          </div>
          <div className="player-controls__buttons__volume__range">
            <input
              type="range"
              name="volume"
              defaultValue={50}
              onChange={this.handleVolumeChange}
            />
          </div>
        </div>
      </>
    )
  }
}
export default withContext(VolumeControl);