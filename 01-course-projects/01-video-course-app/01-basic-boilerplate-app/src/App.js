import React, { Component } from 'react'
import axios from 'axios';

 class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      users:[]
    }
  }


  componentDidMount = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(result => {
   this.setState({
     users: result.data
   })
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return (
      <div>
        {
        this.state.users && this.state.users.map( user => {
          return (
            <div key={user.id}>
              <h1>{user.name}</h1>
              <span>{user.email}</span>
              <hr />
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default App;