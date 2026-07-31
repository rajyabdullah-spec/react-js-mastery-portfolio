import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const sortPosts = (postsArray) => {
    return [...postsArray].sort((a, b) => b.upvotes - a.upvotes);
  };

  const initialDefaultPosts = [
    { id: 1, text: 'This is a sample Reddit post about React state management.', uploader: 'Uploader', upvotes: 7 },
    { id: 2, text: 'Another interesting post showcasing auto-sorting feature.', uploader: 'Uploader', upvotes: 4 }
  ];

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('reddit_posts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return sortPosts(initialDefaultPosts);
  });

  const [postText, setPostText] = useState('');
  const userName = "Damin Signh";

  useEffect(() => {
    localStorage.setItem('reddit_posts', JSON.stringify(posts));
  }, [posts]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      text: postText.trim(),
      uploader: 'Uploader',
      upvotes: 0
    };

    setPosts(prevPosts => sortPosts([newPost, ...prevPosts]));
    setPostText('');
  };

  const handleUpvote = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, upvotes: post.upvotes + 1 };
      }
      return post;
    });

    setPosts(sortPosts(updatedPosts));
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };

  const handleResetFeed = () => {
    setPosts(sortPosts(initialDefaultPosts));
  };

  return (
    <div className="reddit-container">
      {/* Header */}
      <div className="user-greeting">
        <div className="user-avatar">
          {userName.charAt(0)}
        </div>
        <div>
          <h2>Welcome, {userName}</h2>
          <span className="user-subtitle">Community Feed & Voting Dashboard</span>
        </div>
      </div>

      {/* Post Fieldset */}
      <fieldset className="post-fieldset">
        <legend>Post on Reddit</legend>
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind? Share with the community..."
            rows="3"
            className="post-textarea"
          />
          <div className="button-wrapper">
            <span className="char-counter">{postText.length} characters</span>
            <button type="submit" className="post-btn" disabled={!postText.trim()}>
              Post
            </button>
          </div>
        </form>
      </fieldset>

      <div className="feed-header">
        <span className="feed-title">Top Voted Posts ({posts.length})</span>
        {posts.length === 0 && (
          <button onClick={handleResetFeed} className="reset-btn">
            Reset Demo Feed
          </button>
        )}
      </div>

      <hr className="divider" />

      {/* Feed List */}
      <div className="feed-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <p className="post-content">{post.text}</p>
              <div className="post-footer">
                <span className="post-meta">
                  {post.uploader} • <span className="vote-badge">▲ {post.upvotes} upvotes</span>
                </span>
                <div className="card-actions">
                  <button 
                    onClick={() => handleUpvote(post.id)} 
                    className="upvote-btn"
                  >
                    <span>▲</span> Upvote
                  </button>
                  <button 
                    onClick={() => handleDeletePost(post.id)} 
                    className="delete-btn"
                    title="Delete post"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-feed">
            <p>No posts in feed right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;