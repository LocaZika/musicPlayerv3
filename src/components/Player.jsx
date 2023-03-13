import { Component, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRepeat,
  faBackwardStep,
  faPlay,
  faPause,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import TimeLine from './TimeLine';
import VolumeControl from './VolumeControl';
import withContext from './stateGlobal/withContext';
import { isEmpty } from 'lodash';

class Player extends Component {
  constructor(props) {
    super(props);
    this.thumbRef = createRef();
    this.repeatRef = createRef();
    this.state = {
      src: '',
    }
  }

// Play/Paused Event

  handleClickPlay = () => {
    const { data, dispatch, audio, volume} = this.props.context;
    let isPlayingCheck = data.isPlaying;
    if(isPlayingCheck === true){
      audio.pause();
    }else{
      audio.play();
    }
    audio.volume = volume;
    isPlayingCheck = !data.isPlaying;
    dispatch.setIsPlaying(isPlayingCheck);
    dispatch.setThumbRotate(isPlayingCheck);
  }

// Set src when click next or prev

  setSrc = (song) => {
    const {data, audio, dispatch} = this.props.context;
    dispatch.setCurrentSong(song);
    audio.src = song.src;
    if(data.isPlaying === true) {
      audio.play();
    }
  }

// Prev Event

  handlePrevSongClick = () => {
    const {data, dispatch} = this.props.context;
    let index = data.indexCurrentSong - 1;
    if(index < 0){
      index = data.songs.length - 1;
    }
    const prevSong = data.songs[index];
    dispatch.setIndexCurrentSong(index);
    this.setSrc(prevSong);
  }

// Next Event

  handleNextSongClick = () => {
    const {data, dispatch} = this.props.context;
    let index = data.indexCurrentSong + 1;
    if(index === data.songs.length){
      index = 0;
    }
    const nextSong = data.songs[index];
    dispatch.setIndexCurrentSong(index);
    this.setSrc(nextSong);
  }

// Repeat Event

  handleRepeatClick = () => {
    const {audio, data, dispatch} = this.props.context;
    let isRepeat = data.isRepeat;
    if(isRepeat === false) {
      this.repeatRef.current.style.color = '#2980b9';
    }
    console.log(this.repeatRef);
    isRepeat = !isRepeat;
    dispatch.setIsRepeat(isRepeat);
    audio.loop = isRepeat;
  }
  render() {
    const { data, audio } = this.props.context;
    audio.addEventListener('ended', () => this.handleNextSongClick());
    return (
      <div className='player glass'>
        <div
        ref={this.thumbRef}
        className={
          data.thumbRotate === true ? 'player__thumb playing' : 'player__thumb'
        }
        style={
          isEmpty(data.currentSong) === true ? null :
          {
            backgroundImage: `url(${data.currentSong.img})`,
          }
        }>
          </div>
        <div className="player__info">
          <h2>{isEmpty(data.currentSong) === true ? null : data.currentSong.name}</h2>
          <h4>{isEmpty(data.currentSong) === true ? null : data.currentSong.singer}</h4>
        </div>
        <div className="player-controls">
          <TimeLine />
          <div className="player-controls__buttons">
            <button ref={this.repeatRef} onClick={this.handleRepeatClick}>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
            <button onClick={this.handlePrevSongClick}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button onClick={this.handleClickPlay}>
              <FontAwesomeIcon icon={
                data.isPlaying === true ? faPause : faPlay
              } />
            </button>
            <button onClick={this.handleNextSongClick}>
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
            <VolumeControl />
          </div>
        </div>
      </div>
    )
  }
}
export default withContext(Player);