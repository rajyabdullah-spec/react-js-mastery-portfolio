import React, { useContext, useState } from 'react';
import { TimelineContext } from './context/TimelineContext';
import './App.css';

function App() {
  const { messages, addMessage, addComment } = useContext(TimelineContext);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!newMessageContent.trim()) return;
    addMessage(newMessageContent);
    setNewMessageContent('');
  };

  const handleCommentSubmit = (e, messageId) => {
    e.preventDefault();
    const commentText = commentInputs[messageId] || '';
    if (!commentText.trim()) return;
    addComment(messageId, commentText);
    
    setCommentInputs({
      ...commentInputs,
      [messageId]: ''
    });
  };

  const handleCommentChange = (messageId, value) => {
    setCommentInputs({
      ...commentInputs,
      [messageId]: value
    });
  };

  return (
    <div className="timeline-container">
      <header className="timeline-header">
        <div className="header-content">
          <h2>The Timeline Engine</h2>
          <span className="badge">React CSR Platform</span>
        </div>
      </header>

      <main className="timeline-main">
        <section className="form-section">
          <h3>Post a message</h3>
          <form onSubmit={handleMessageSubmit}>
            <textarea
              rows="4"
              value={newMessageContent}
              onChange={(e) => setNewMessageContent(e.target.value)}
              placeholder="Type your main message here..."
            />
            <div className="btn-wrapper">
              <button type="submit" className="btn-blue">Post a message</button>
            </div>
          </form>
        </section>

        <section className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <div className="message-meta">
                <span className="author-name">{msg.author}</span>
                <span className="meta-divider">•</span>
                <span className="date-text">{msg.date}</span>
              </div>
              <p className="message-content">{msg.content}</p>

              <div className="comments-section">
                {msg.comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-meta">
                      <span className="comment-author">{comment.author}</span>
                      <span className="meta-divider">•</span>
                      <span className="date-text">{comment.date}</span>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))}

                <form onSubmit={(e) => handleCommentSubmit(e, msg.id)} className="comment-form">
                  <label>Post a comment</label>
                  <textarea
                    rows="2"
                    value={commentInputs[msg.id] || ''}
                    onChange={(e) => handleCommentChange(msg.id, e.target.value)}
                    placeholder="Write a community feedback..."
                  />
                  <div className="btn-wrapper">
                    <button type="submit" className="btn-green">Post a comment</button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;