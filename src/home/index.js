import { Link } from 'inferno-router';
import './home.scss';
const Home = () => (
  <div className="home-container">
    <div className="title">
      <h1>
        <Link to="/send">Send</Link> ETH to take your place at the top!
      </h1>
      <h5>Powered by Ethereum smart contract</h5>
      <a href="#">
        <img src="https://etherscan.io/images/logo-ether.png?v=0.0.1" alt="etherscan" />
      </a>
    </div>
  </div>
);

// usage
// render(<MyComponent name="Inferno" age={2}/>, container);
export default Home;
