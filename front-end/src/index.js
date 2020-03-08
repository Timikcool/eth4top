import { render } from "inferno";
import "./index.scss";
import App from "./app.js";
import * as serviceWorker from "./serviceWorker";
import "react-perfect-scrollbar/dist/css/styles.css";

render(<App />, document.getElementById("root"));

serviceWorker.unregister();
