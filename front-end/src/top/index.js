import { Component } from "inferno";
import PerfectScrollbar from "react-perfect-scrollbar";
import Loader from "../common/loader";
import "./top.scss";
import { connectToEth, getTenPosts, checkIsRinkeby } from "../common/ethApi";
import Post from "./Post";

class Top extends Component {
  state = {
    fetching: true,
    posts: []
  };

  componentDidMount() {
    connectToEth();
    checkIsRinkeby();
    getTenPosts(1, this.onPostsFetched.bind(this));
  }

  onPostsFetched(posts) {
    console.log(posts);
    this.setState({ posts, fetching: false });
  }

  render() {
    const { fetching, posts } = this.state;
    return (
      <div className="top-container">
        {fetching ? (
          <Loader active />
        ) : (
          <div className="top-list">
            <PerfectScrollbar>
              {posts.map(props => (
                <Post {...props} />
              ))}
            </PerfectScrollbar>
          </div>
        )}
      </div>
    );
  }
}

export default Top;
