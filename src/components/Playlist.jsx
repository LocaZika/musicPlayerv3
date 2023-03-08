import { Component } from 'react';
import withContext from './stateGlobal/withContext';


class Playlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      duration: 0,
    }
  }
  handleClickSong = (song) => {
    const { setCurrentSong, setIsPlaying } = this.props.context.dispatch;
    setCurrentSong(song);
    setIsPlaying(true);
  }
  render() {
    const { songs } = this.props.context.data;
    return (
      <ul className='play-list glass'>
      {
        songs.map(({id, name, singer, img, src}) => {
          return (
            <li
              key={id}
              onClick={() => this.handleClickSong({id, name, singer, img, src})}
            >
              <div className="song-img" style={{backgroundImage: `url(${img})`}}></div>
              <p>{name} / {singer}</p>
            </li>
          )
        })
      }
    </ul>
    )
  }
}
export default withContext(Playlist);