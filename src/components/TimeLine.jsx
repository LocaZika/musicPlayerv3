import { isEmpty, isNull } from 'lodash';
import { Component, createRef } from 'react'
import withContext from './stateGlobal/withContext'

class TimeLine extends Component {
  constructor(props){
    super(props);
    this.state = {
      clientX: 0,
      percent: 0,
      isMouseDown: false,
    }
    this.timelineRef = createRef();
  }
  handleSetTimeSong(seconds){
    let minutes = Math.floor(seconds / 60);
    let second = Math.floor(seconds % 60);
    let minutesTimer = '';
    let secondTimer = '';
    minutes < 10 ? minutesTimer = `0${minutes}` : minutesTimer = minutes;
    second < 10 ? secondTimer = `0${second}` : secondTimer = second;
    return `${minutesTimer}:${secondTimer}`;
  }
  handleCurrentTime = () => {
    const { audio } = this.props.context;
    audio.addEventListener('timeupdate', () => {
      const currentTime = this.handleCurrentTime(audio.currentTime);
      // this.timelineRef.current.setAttribute('currenttime', currentTime);
    })
    console.log(this.timelineRef);
  };
  handleDuration = () => {
    const { audio, data } = this.props.context;
    let duration = '';
    if(isNull(audio) === false) {
      duration = this.handleSetTimeSong(audio.duration);
    }else{duration = '00:00';}
    return duration;
  }
  handleMouseUp = () => {
    this.setState({isMouseDown: false});
    this.timelineRef.current.style.userSelect = 'text';
  }
  handleMouseDown = (e) => {
    const timelineRef = this.timelineRef.current;
    let timelineWidth = timelineRef.clientWidth;
    let offsetX = e.offsetWidth;
    let percent = Math.floor((offsetX / timelineWidth) * 100);
    timelineRef.style.setProperty('--process-width', `${percent}%`);
    this.setState({clientX: e.clientWidth, percent, isMouseDown: true});
  }
  handleMouseMove = (e) => {
    if(this.state.isMouseDown === true){
      this.timelineRef.current.style.userSelect = 'none';
      let currentClientX = e.clientWidth;
      let move = currentClientX - this.state.clientX;
      let percent = Math.floor((move / this.timelineRef.current.clientWidth) * 100);
      if(percent < 0) percent = 0;
      if(percent > 100) percent = 100;
      this.setState({percent});
      // this.timelineRef.current.style.setProperty();
      console.log(this.state.percent);
    }
  }
  render() {
    // this.handleDuration();
    // this.handleCurrentTime();
    const {audio} = this.props.context;
    // audio.addEventListener("timeupdate", () => {
    //   this.timelineRef.current.setAttribute('currenttime', this.handleSetTimeSong(audio.currentTime))
    // })
    return (
      <div
        className='timeline'
        duration={
          this.handleDuration
        }
        ref={this.timelineRef}
      >
      <div
        className="process"
        // onMouseMove={this.handleMouseMove}
      ></div>
      <span
        className="slider-track"
        // onMouseDown={this.handleMouseDown}
        // onMouseUp={this.handleMouseUp}
      ></span>
      </div>
    )
  }
}
export default withContext(TimeLine);
