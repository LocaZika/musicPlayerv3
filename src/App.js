import { Component } from "react";
import withContext from "./components/stateGlobal/withContext";
import { get } from "./api/RESTfulApi";
import Loader from "./services/Loader";
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
        <Loader />
      </div>
    );
  }
}
export default withContext(App);
