import Loader from '../Loader';
import './top.scss';
const Top = () => (
  <div className="top-container">
    <Loader active />
  </div>
);

// usage
// render(<MyComponent name="Inferno" age={2}/>, container);
export default Top;
