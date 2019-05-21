import { Component } from 'inferno';
import Loader from '../common/loader';
import './top.scss';
import { connectToEth } from '../common/ethApi';
import Post from './Post';
class Top extends Component {
  state = {
    fetching: true
  };
  componentDidMount() {
    connectToEth();
  }
  render() {
    const { fetching } = this.state;
    const mockData = [
      {
        author: '0x4058603856045684586092038475034850934850934859',
        content: 'It is totally original content I promise',
        timestamp: '12/09/2012',
        eth: '100'
      },
      {
        author: '0x4058603856045684586092038475034850934850934859',
        content:
          'Subscribe to PewDiePie. He desoeradky neds your help against T-Series https://pewds.com',
        timestamp: '11/09/2012',
        eth: '125'
      }
    ];
    return (
      <div className="top-container">
        {!fetching ? <Loader active /> : <div className="top-list">
        {mockData.map((props) => (<Post {...props} />))}
        </div>}
      </div>
    );
  }
}

// usage
// render(<MyComponent name="Inferno" age={2}/>, container);
export default Top;
