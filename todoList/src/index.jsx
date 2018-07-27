import React from 'react';
import ReactDOM from 'react-dom';
// import { Textbox } from 'react-inputs-validation';
import './styles/app.css';

function TodoItems(props) {
  return (
    <li>
      {props.itm.title} {props.itm.completed ? '--Done' : '--To do'}
      <button onClick={props.onToggleHandler}>Toggle</button>
      <button onClick={props.onRemoveHandler}>Delete</button>
    </li>

  );
}

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      userinput: '',
      items: [
        {
          title: 'Buy milk',
          completed: false,
        },
        {
          title: 'Clean toilet',
          completed: false,
        },
      ],
      filter: 'all',
    };
    this.AddItemHandler = this.AddItemHandler.bind(this);
    this.InputOnchangeHandler = this.InputOnchangeHandler.bind(this);
    this.ToggleItemHandler = this.ToggleItemHandler.bind(this);
    this.RemoveItemHandler = this.RemoveItemHandler.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  getDisplayItems() {
    const { filter } = this.state;
    if (filter === 'completed') {
      return this.state.items.filter(x => x.completed);
    }
    if (filter === 'pending') {
      return this.state.items.filter(x => !x.completed);
    }
    return this.state.items;
  }
  InputOnchangeHandler(e) {
    this.setState({
      userinput: e.target.value,
    });
  }

  AddItemHandler(e) {
    e.preventDefault();// Prevent the default action
    const input = this.state.userinput;
    if (input) {
      const newItems = this.state.items.concat([
        {
          title: input,
          completed: false,
        },
      ]);
      this.setState({
        items: newItems,
        userinput: '',
      });
    }
  }
  ToggleItemHandler(item) {
    // console.log(item);
    const newItems = this.state.items.map((itm) => {
      if (itm.title === item.title) {
        return {
          ...itm,
          completed: !item.completed,
        };
      }
      return itm;
    });
    this.setState({ items: newItems });
  }
  RemoveItemHandler(item) {
    const newItems = this.state.items.filter(itm => itm.title !== item.title);
    this.setState({ items: newItems });
  }
  handleFilterChange(e) {
    this.setState({ filter: e.target.value });
  }
  renderItems() {
    return this.getDisplayItems().map(item => <TodoItems itm={item} onToggleHandler={() => this.ToggleItemHandler(item)} onRemoveHandler={() => this.RemoveItemHandler(item)} />);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.AddItemHandler}>
          <input
            value={this.state.userinput}
            onChange={this.InputOnchangeHandler}
            placeholder="What are you gonna do next"
            className=""
          />
          <button type="submit" onClick={this.AddItemHandler}>Add Item</button>
        </form>
        <div className="todo-filter">
          <label className="radio-inline">
            <input
              type="radio"
              name="filter"
              value="all"
              onChange={this.handleFilterChange}
              checked={this.state.filter === 'all'}
            /> All
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="filter"
              value="pending"
              onChange={this.handleFilterChange}
              checked={this.state.filter === 'pending'}
            /> Pending
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="filter"
              value="completed"
              onChange={this.handleFilterChange}
              checked={this.state.filter === 'completed'}
            /> Completed
          </label>
        </div>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
