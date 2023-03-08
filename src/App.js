import MusicPlayer from "./components/MusicPlayer";
import { Component } from "react";
import withContext from "./components/stateGlobal/withContext";
import { get } from "./api/RESTfulApi";
class App extends Component {
  constructor(props) {
    super(props);
  }
  getSongs = async () => {
    const { dispatch } = this.props.context;
    await get().then((songs) => dispatch.setSongs(songs));
  };
  componentDidMount() {
    this.getSongs();
  }
  render() {
    return (
      <div className="app">
        <MusicPlayer />
      </div>
    );
  }
}
export default withContext(App);
