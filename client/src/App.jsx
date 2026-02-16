import { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/guestbook`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setName('');
      setMessage('');
    } catch (err) {
      console.error('Failed to submit post:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="app">
      <div className="background-glow"></div>

      <header className="header">
        <div className="header-icon">📖</div>
        <h1>Guestbook</h1>
        <p className="subtitle">Leave a message for the world to see</p>
      </header>

      <main className="main">
        <section className="form-section">
          <h2>✍️ Sign the Guestbook</h2>
          <form onSubmit={handleSubmit} className="guestbook-form">
            <div className="input-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            <div className="input-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                placeholder="Write something nice..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                disabled={submitting}
              />
            </div>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? (
                <span className="spinner"></span>
              ) : (
                '🚀 Post Message'
              )}
            </button>
          </form>
        </section>

        <section className="entries-section">
          <h2>💬 Messages ({posts.length})</h2>
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading messages...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>No messages yet. Be the first to sign!</p>
            </div>
          ) : (
            <div className="entries-list">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="entry-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="entry-header">
                    <div className="avatar">
                      {post.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="entry-meta">
                      <h3 className="entry-name">{post.name}</h3>
                      <time className="entry-date">
                        {formatDate(post.created_at)}
                      </time>
                    </div>
                  </div>
                  <p className="entry-message">{post.message}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Built with ❤️ using React, NestJS &amp; Supabase</p>
      </footer>
    </div>
  );
}

export default App;
