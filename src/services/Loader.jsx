import '../assets/scss/_loader.scss';
import MusicPlayer from '../components/MusicPlayer';
import { get } from '../api/RESTfulApi';
import withContext from '../components/stateGlobal/withContext';
import { Component } from 'react';
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }
  }
  getSongs = () => {
    const { dispatch, audio, data } = this.props.context;
    get().then(({ data: songs }) => {
        dispatch.setSongs(songs);
        dispatch.setCurrentSong(songs[0]);
        audio.src = songs[0].src;
        audio.addEventListener('loadedmetadata', () => {
          dispatch.setDuration(audio.duration);
        })
        setTimeout(() => this.setState({ isLoaded: true }), 1000);
      }
    )
  };
  componentDidMount(){
    this.getSongs();

  }
  render(){
    if(this.state.isLoaded === false) {
      return (
        <div className="preloader">
          <div className="loading">
            <span style={{animationDelay: '0s'}}></span>
            <span style={{animationDelay: '0.2s'}}></span>
            <span style={{animationDelay: '0.4s'}}></span>
            <span style={{animationDelay: '0.6s'}}></span>
          </div>
        </div>
      )
    }else{
      return (
        <MusicPlayer />
      )
    }
  }
}
export default withContext(Loader);