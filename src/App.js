import { version, Component } from 'inferno';
import { BrowserRouter, Route, Switch, NavLink } from 'inferno-router';
import Logo from './logo';
import './app.scss';
import Home from './Home';
import Top from './Top';
import Pay from './Pay';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="app">
        <header className="header">
        <nav class="nav">
          <NavLink activeClassName="active" exact to="/">About <span aria-label="fire" role="img">🤩</span></NavLink>
          <NavLink activeClassName="active" to="/top">Top <span aria-label="fire" role="img">🔥</span></NavLink>
          <NavLink activeClassName="active" to="/send">Send <span aria-label="money" role="img">🤑</span></NavLink>
        </nav>
        </header>
        <div className="content">
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/top" component={Top} />
        <Route path="/send" component={Pay} />
      </Switch>
        </div>
        <div className="footer">
        <a target="_blank" href="https://github.com/Timikcool/eth4top"><i class="fab fa-github-alt"></i></a>
        <a target="_blank" href="https://t.me/tsamoylov"><i class="fab fa-telegram-plane"></i></a>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
