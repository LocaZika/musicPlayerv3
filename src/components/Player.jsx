import { Component, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRepeat,
  faBackwardStep,
  faPlay,
  faPause,
  faForwardStep,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark 
} from '@fortawesome/free-solid-svg-icons';
import TimeLine from './TimeLine';
import withContext from './stateGlobal/withContext';
import { isEmpty, isEqual } from 'lodash';
import Audio from './Audio';

class Player extends Component {
  constructor(props) {
    super(props);
    this.thumbRef = createRef();
    this.volumeRef = createRef();
    this.audioRef = createRef();
  }
  handleSetSrc = () => {
    const {currentSong} = this.props.context.data;
    let src = '';
    let duration = 0;
    if(isEmpty(currentSong) === false){
      src = currentSong.src;
      duration = this.audioRef.current.duration
      this.props.context.dispatch.setDuration(duration);
    }else src = '#';
    return src;
  }

// Play button event

  handleClickPlay = () => {
    const {isPlaying} = this.props.context.data;
    const {dispatch} = this.props.context;
    let isPlayingCheck = isPlaying;
    if(isPlayingCheck === true){
      this.audioRef.pause();
    }else{
      this.audioRef.play();
    }
    isPlayingCheck = !isPlaying;
    dispatch.setIsPlaying(isPlayingCheck);
  }
  handleSetFirstAndLastSong = () => {
    const {currentSong, songs} = this.props.context.data;
    const {setPrevSong, setNextSong} = this.props.context.dispatch;
    const currentSongID = currentSong.id;
    const findSongIndex = songs.findIndex(song => song.id === currentSongID);
    if(findSongIndex === 1){
      let lastSong = songs[songs.length - 1];
      setPrevSong(lastSong);
    }else{
      setPrevSong(findSongIndex - 1);
    }
    if(findSongIndex + 1 === songs.length){
      setNextSong(songs[0]);
    }else{
      setNextSong(findSongIndex + 1);
    }
  }
  handlePrevSongClick = () => {
    const {prevSong} = this.props.context.data;
    const {setCurrentSong} = this.props.context.dispatch;
    setCurrentSong(prevSong);
  }
  handleNextSongClick = () => {
    const {nextSong} = this.props.context.data;
    const {setCurrentSong} = this.props.context.dispatch;
    setCurrentSong(nextSong);
  }
  handleVolumeClick = () => {
    const {setVolume} = this.props.context.dispatch;
    setVolume(0);
  }
  handleVolumeChange = (e) => {
    const {setVolume} = this.props.context.dispatch;
    let volumeRange = e.target.value;
    setVolume(volumeRange);
  }
  render() {
    const { currentSong, isPlaying, audio, nextSong, volume } = this.props.context.data;
    const { setCurrentSong } = this.props.context.dispatch;
    return (
      <div className='player glass'>
        <div
        ref={this.thumbRef}
        className={
          isPlaying === true ? 'player__thumb playing' : 'player__thumb'
        }
        style={
          isEmpty(currentSong) === true ? null :
          {
            backgroundImage: `url(${currentSong.img})`,
          }
        }>
          </div>
        <div className="player__info">
          <h2>{isEmpty(currentSong) === true ? null : currentSong.name}</h2>
          <h4>{isEmpty(currentSong) === true ? null : currentSong.singer}</h4>
        </div>
        <div className="player-controls">
          <TimeLine />
          <div className="player-controls__buttons">
            <button>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
            <button onClick={this.handlePrevSongClick}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button onClick={this.handleClickPlay}>
              <FontAwesomeIcon icon={
                isPlaying === true ? faPause : faPlay
              } />
            </button>
            <button onClick={this.handleNextSongClick}>
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
            <div className="player-controls__buttons__volume">
              <div className="player-controls__buttons__volume--status">
                <button onClick={this.handleVolumeClick}>
                  <FontAwesomeIcon icon={
                    volume >= 0.5 ?
                    faVolumeHigh :
                    volume > 0 ?
                    faVolumeLow :
                    faVolumeXmark
                  } />
                </button>
              </div>
              <div className="player-controls__buttons__volume__range">
                <input type="range" name="volume" ref={this.volumeRef} />
              </div>
            </div>
          </div>
        </div>
        <Audio context={this.props.context} ref={this.audioRef} onSetSrc={this.handleSetSrc} />
      </div>
    )
  }
}
export default withContext(Player);