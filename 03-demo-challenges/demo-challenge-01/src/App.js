import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('bar');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch true musical albums from iTunes API using a dynamic term
  const fetchMusicData = (term) => {
    setLoading(true);
    setError(null);
    
    // Requesting entity=album to get real music album catalogs
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=30`;
    
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to communicate with iTunes servers');
        }
        return response.json();
      })
      .then((data) => {
        setAlbums(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Fetch default catalog on initial mount
  useEffect(() => {
    fetchMusicData('bar');
  }, []);

  // Handle live search upon form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    fetchMusicData(searchQuery.trim());
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-core">
          <h2>Premium Music Engine</h2>
          <span className="api-badge">Apple iTunes Live</span>
        </div>
        
        {/* Search layout matching the wireframe configuration */}
        <form onSubmit={handleSearchSubmit} className="search-form-schema">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search real artists or albums (e.g., bar, coldplay, linkin)..."
            className="search-input-field"
          />
          <button type="submit" className="search-submit-btn">Submit</button>
        </form>
      </header>

      <main className="dashboard-content">
        {loading && (
          <div className="status-message-box">
            <div className="spinner"></div>
            <p>Streaming verified musical catalogs...</p>
          </div>
        )}

        {error && (
          <div className="status-message-box error-theme">
            <p>API Integration Failure: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <section className="catalog-section">
            <div className="results-meta">
              Found <strong>{albums.length}</strong> official releases for metadata query "{searchQuery}"
            </div>
            
            {/* The updated responsive grid listing showing true rich data */}
            <ul className="album-interactive-list">
              {albums.length > 0 ? (
                albums.map((album) => (
                  <li key={album.collectionId} className="album-list-item">
                    <img 
                      src={album.artworkUrl100} 
                      alt={album.collectionName} 
                      className="album-cover-art"
                    />
                    <div className="album-details-pane">
                      <span className="album-title-text">{album.collectionName}</span>
                      <span className="album-artist-subtext">{album.artistName}</span>
                    </div>
                  </li>
                ))
              ) : (
                <div className="empty-catalog-fallback">
                  <p>No verified commercial albums matched your parameters.</p>
                </div>
              )}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;