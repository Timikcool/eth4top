import './send.scss';
const Send = () => (
  <div className="send-container">
    <form class="send" onSubmit={console.log}>
      <h4>Type your text here:</h4>
      <input type="text" />
      <h4>ETH to send:</h4>
      <input type="text" />
      <button type="submit">Proceed</button>
    </form>
  </div>
);

// usage
// render(<MyComponent name="Inferno" age={2}/>, container);
export default Send;
