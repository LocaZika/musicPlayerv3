import React from 'react'
import Player from './Player';
import PlayList from './Playlist';

export default function MusicPlayer() {
  return (
    <div className="music-player">
      <Player />
      <PlayList />
    </div>
  )
}
