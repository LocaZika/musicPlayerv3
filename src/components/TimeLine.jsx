import { isNull } from 'lodash';
import { Component, createRef } from 'react'
import withContext from './stateGlobal/withContext'

class TimeLine extends Component {
  constructor(props){
    super(props);
    this.isMouseDown = false;
    this.clientX = 0;
    this.percent = 0;
    this.timelineRef = createRef();
  }

// Handle Time Song

  handleTimeSong(seconds){
    let minutes = Math.floor(seconds / 60);
    let second = Math.floor(seconds % 60);
    let minutesTimer = '';
    let secondTimer = '';
    minutes < 10 ? minutesTimer = `0${minutes}` : minutesTimer = minutes;
    second < 10 ? secondTimer = `0${second}` : secondTimer = second;
    return `${minutesTimer}:${secondTimer}`;
  }

// Set Current Time

  setCurrentTime = (timelineRef) => {
    const { audio } = this.props.context;
    const currentTime = this.handleTimeSong(audio.currentTime);
    timelineRef.current.setAttribute('currenttime', currentTime);
    timelineRef.current.style.setProperty('--process-width', this.setProcessTimeline(audio));
  };

// Set Duration

  setDuration = () => {
    const { audio, data } = this.props.context;
    if(isNull(audio.src) === false) {
       return this.handleTimeSong(data.duration);
    }else{
      return '00:00';
    }
  }
  

// Set Timeline Processing

  setProcessTimeline = (audio) => {
    let percent;
    percent = Math.floor((audio.currentTime / audio.duration) * 100);
    if(isNaN(percent) === true) percent = 0;
    return `${percent}%`;
  }

// Handle Drag Or Click Timeline

  handleMouseUp = () => {
    const {audio} = this.props.context;
    this.isMouseDown = false;
    audio.currentTime = (audio.duration * this.percent) / 100;
  }
  handleMouseDown = (e) => {
    const timelineRef = this.timelineRef.current;
    let timelineWidth = timelineRef.clientWidth;
    let offsetX = e.nativeEvent.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * 100);
    timelineRef.style.setProperty('--process-width', `${percent}%`);
    this.isMouseDown = true;
    this.percent = percent;
  }
  handleMouseMove = (e) => {
    if(this.isMouseDown === true){
      const timelineRef = this.timelineRef.current;
      let currentClientX = e.clientX;
      let move = currentClientX - this.clientX;
      let percent = Math.floor((move / timelineRef.clientWidth) * 100);
      if(percent < 0) percent = 0;
      if(percent > 100) percent = 100;
      this.percent = percent;
      timelineRef.style.setProperty('--process-width', `${percent}%`);
    }
  }
  handleMouseDownTrack = (e) => {
    e.stopPropagation();
    this.isMouseDownload = true;
  }
  render() {
    const {audio} = this.props.context;
    audio.addEventListener('timeupdate', () => {this.setCurrentTime(this.timelineRef)});
    return (
      <div
        id='timeline'
        className='timeline'
        ref={this.timelineRef}
        duration={this.setDuration()}
        currenttime={'00:00'}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
      >
        <div className="process">
          <span className="slider-track" onMouseDown={this.handleMouseDownTrack}></span>
        </div>
      </div>
    )
  }
}
export default withContext(TimeLine);
