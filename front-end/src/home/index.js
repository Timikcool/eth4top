import { Link } from "inferno-router";
import "./home.scss";
const Home = () => (
  <div className="home-container">
    <div className="title">
      <h1>
        <Link to="/send">Send</Link> ETH to take your place at the top!
      </h1>
      <h5>Powered by Ethereum smart contract</h5>
      <a href="https://rinkeby.etherscan.io/address/0x55925f2f807b7c9df151f042165eed8c7d8a417a">
        <img
          src="https://etherscan.io/images/logo-ether.png?v=0.0.1"
          alt="etherscan"
        />
      </a>
    </div>
  </div>
);

export default Home;
