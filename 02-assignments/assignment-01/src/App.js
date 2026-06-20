import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          id: 1,
          task: "Finish the Node.js assignment",
          description: "deadline until friday afternoon."
        },
        {
          id: 2,
          task: "Read a chapter",
          description: "Now, the physics of time."
        }
      ],
      taskInput: '',
      descriptionInput: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onTaskAdd = this.onTaskAdd.bind(this);
    this.onTaskDone = this.onTaskDone.bind(this);
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onTaskAdd(event) {
    event.preventDefault();
    const { taskInput, descriptionInput, todos } = this.state;

    if (!taskInput.trim()) {
      alert("A Task input field is required!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      task: taskInput,
      description: descriptionInput
    };

    this.setState({
      todos: [...todos, newTodo],
      taskInput: '',
      descriptionInput: ''
    });
  }

  onTaskDone(id, event) {
    event.preventDefault();
    const updatedTodos = this.state.todos.filter(item => item.id !== id);
    this.setState({ todos: updatedTodos });
  }

  render() {
    const { todos, taskInput, descriptionInput } = this.state;

    return (
      <div className="todo-container">
        
        <h2>New task:</h2>
        <form onSubmit={this.onTaskAdd} className="todo-form">
          <div className="input-group">
            <input
              type="text"
              name="taskInput"
              placeholder="Your task"
              value={taskInput}
              onChange={this.onInputChange}
              required
            />
          </div>
          
          <div className="input-group">
            <textarea
              name="descriptionInput"
              placeholder="Describe it"
              value={descriptionInput}
              onChange={this.onInputChange}
            />
          </div>

          <button type="submit" className="btn-add">
            Add Task
          </button>
        </form>

        <h2>My todo list:</h2>
        {todos.length > 0 ? (
          <ul className="todo-list">
            {todos.map(item => (
              <li key={item.id} className="todo-item">
                <div className="todo-content">
                  <span className="todo-task">{item.task}</span>
                  {item.description && (
                    <span className="todo-desc">{item.description}</span>
                  )}
                </div>
                <a 
                  href="#done" 
                  className="link-done"
                  onClick={(e) => this.onTaskDone(item.id, e)}
                >
                  Done
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No tasks left! Well done. 👍</p>
        )}

      </div>
    );
  }
}

export default App;