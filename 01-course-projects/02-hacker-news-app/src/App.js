import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";


const largeColumn = { width: '40%' };
const midColumn = { width: '30%' };
const smallColumn = { width: '10%' };

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories = (result) => {
    this.setState({ result });
  }

  fetchSearchTopStories = (searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => console.error("Error fetching data:", error));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  }


  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  };

  render() {
    const { searchTerm, result } = this.state;

    return (
      <div className="page">
        <div className="interactions">
        
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        
        { result ? (
          <Table list={result.hits}
            onDismiss={this.onDismiss}
          />
        ) : (
          <div className="table-empty">Loading fresh tech stories...</div>
        )}
      </div>
    );
  }
}

export default App;