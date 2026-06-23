import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuoteCard() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://dummyjson.com/quotes/random');
      setQuote(response.data.quote);
      setAuthor(response.data.author);
    } catch (err) {
      setError('Failed to fetch a new quote. Please try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-card-wrapper">
      <div className="quote-content-box">
        {loading ? (
          <div className="loader-box">
            <div className="spinner"></div>
            <p>Fetching inspiration...</p>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <blockquote className="quote-text">
              "{quote}"
            </blockquote>
            <cite className="quote-author">— {author}</cite>
          </>
        )}
      </div>
      
      <button 
        onClick={fetchQuote} 
        disabled={loading} 
        className={`btn-new-quote ${loading ? 'disabled' : ''}`}
      >
        {loading ? 'Loading...' : 'New Quote'}
      </button>
    </div>
  );
}

export default QuoteCard;