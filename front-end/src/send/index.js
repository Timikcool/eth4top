import { Component } from "inferno";
import Loader from "../common/loader";
import "./send.scss";
import { createPost, connectToEth, checkIsRinkeby } from "../common/ethApi";
class Send extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", ethers: 0.1, sending: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ sending: true });
    createPost(
      window.web3.eth.accounts[0],
      this.state.text,
      this.state.ethers,
      this.onConfirm.bind(this),
      this.onError.bind(this)
    );
  }

  onConfirm() {
    this.setState({ sending: false });
  }

  onError(err) {
    this.setState({ sending: false });
    console.log(err);
  }

  componentDidMount() {
    connectToEth().then(address => console.log(address));
    checkIsRinkeby();
  }

  render() {
    const { sending } = this.state;
    return (
      <div className="send-container">
        {sending ? (
          <Loader active />
        ) : (
          <form class="send" onSubmit={this.handleSubmit}>
            <h4>Type your text here:</h4>
            <input
              type="text"
              value={this.state.text}
              name="text"
              onInput={this.handleChange}
            />
            <h4>How much of ETH you want to spend?</h4>
            <input
              type="number"
              value={this.state.ethers}
              name="ethers"
              onInput={this.handleChange}
              className="eth"
              min="0"
              step="any"
            />
            <button type="submit">Proceed</button>
          </form>
        )}
      </div>
    );
  }
}

// usage
// render(<MyComponent name="Inferno" age={2}/>, container);
export default Send;
