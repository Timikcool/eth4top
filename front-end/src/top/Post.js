import './post.scss';
export default ({author, content, timestamp, eth}) => (<div className="post">
    <div className="post-author">{author}</div>
    <div className="post-content">{content}</div>
    <div className="post-time-and-eth">
        <div className="time">{timestamp}</div>
        <div className="eth">{eth}</div>
    </div>
</div>)