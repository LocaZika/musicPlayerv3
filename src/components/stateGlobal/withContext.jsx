import { Component } from 'react'
import { StateContext } from './StateProvider';

export default function withContext(ParentComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
    }
    render(){
      return (
        <StateContext.Consumer>
          {context => <ParentComponent context={context} data={this.props} />}
        </StateContext.Consumer>
      )
    };
  };
};
