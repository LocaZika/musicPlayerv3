import { Component, createContext } from 'react';
export const StateContext = createContext();
export default class StateProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      currentSong: {},
      indexCurrentSong: 0,
      isPlaying: false,
      isMuted: false,
      isRepeat: false,
      duration: 0,
      thumbRotate: false,
    };
    this.dispatch = {
      setSongs: this.setSongs,
      setCurrentSong: this.setCurrentSong,
      setIsPlaying: this.setIsPlaying,
      setIsMuted: this.setIsMuted,
      setIsRepeat: this.setIsRepeat,
      setDuration: this.setDuration,
      setIndexCurrentSong: this.setIndexCurrentSong,
      setVolume: this.setVolume,
      setThumbRotate: this.setThumbRotate,
    };
    this.audio = new Audio();
    this.volume = 0.5;
  }
  setSongs = songs => this.setState({songs});
  setCurrentSong = currentSong => this.setState({currentSong});
  setIsPlaying = (isPlaying) => {
    this.setState({isPlaying});
    isPlaying === true ?
      document.title = 'Music Player - Playing':
      document.title = 'Music Player - Paused';
  }
  setIsMuted = isMuted => this.setState({isMuted});
  setIsRepeat = isRepeat => this.setState({isRepeat});
  setDuration = duration => this.setState({duration});
  setIndexCurrentSong = indexCurrentSong => this.setState({indexCurrentSong});
  setVolume = volumePercent => this.volume = volumePercent / 100;
  setThumbRotate = thumbRotate => this.setState({thumbRotate});
  render() {
    const {children} = this.props;
    return (
      <StateContext.Provider
        value={{
          data: this.state,
          dispatch: this.dispatch,
          audio: this.audio,
          volume: this.volume,
        }}>
        {children}
      </StateContext.Provider>
    )
  }
}
