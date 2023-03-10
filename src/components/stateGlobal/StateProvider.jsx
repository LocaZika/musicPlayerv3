import { Component, createContext } from 'react';
export const StateContext = createContext();
export default class StateProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      currentSong: {},
      prevSong: {},
      nextSong: {},
      isPlaying: false,
      isMute: false,
      isRepeat: false,
      duration: 0,
      volume: 0.5,
    };
    this.dispatch = {
      setSongs: this.setSongs,
      setCurrentSong: this.setCurrentSong,
      setIsPlaying: this.setIsPlaying,
      setIsMute: this.setIsMute,
      setIsRepeat: this.setIsRepeat,
      setDuration: this.setDuration,
      setPrevSong: this.setPrevSong,
      setNextSong: this.setNextSong,
      // setVolume: this.setVolume,
    };
    this.audio = new Audio();
  }
  setSongs = (songs) => {
    this.setState({songs});
  }
  setCurrentSong = (currentSong) => {
    this.setState({currentSong});
  }
  setIsPlaying = (isPlaying) => {
    this.setState({isPlaying});
  }
  setIsMute = (isMute) => {
    this.setState({isMute});
  }
  setIsRepeat = (isRepeat) => {
    this.setState({isRepeat});
  }
  setDuration = (duration) => {
    this.setState({duration});
  }
  setPrevSong = (prevSong) => {
    this.setState({prevSong});
  }
  setNextSong = (nextSong) => {
    this.setState({nextSong});
  }
  setVolume = (volumePercent) => {
    let volume = volumePercent / 100;
    this.setState({volume});
  }
  render() {
    const {children} = this.props;
    return (
      <StateContext.Provider
        value={{
          data: this.state,
          dispatch: this.dispatch,
          audio: this.audio
        }}>
        {children}
      </StateContext.Provider>
    )
  }
}
