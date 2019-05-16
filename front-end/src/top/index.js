import { Component } from 'inferno';
import Loader from '../common/loader';
import './top.scss';
import { connectToEth } from '../common/ethApi';
class Top extends Component {
  state = {
    fetching: true
  };
  componentDidMount() {
    connectToEth();
  }
  render() {
    const { fetching } = this.state;
    return (
      <div className="top-container">
        {fetching ? <Loader active /> : <div className="top-list" />}
      </div>
    );
  }
}

// usage
// render(<MyComponent name="Inferno" age={2}/>, container);
export default Top;
