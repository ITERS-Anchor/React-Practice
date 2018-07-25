import React from 'react';
import ReactDOM from 'react-dom';
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
    };
    this.AddItemHandler = this.AddItemHandler.bind(this);
    this.InputOnchangeHandler = this.InputOnchangeHandler.bind(this);
    this.ToggleItemHandler = this.ToggleItemHandler.bind(this);
    this.RemoveItemHandler = this.RemoveItemHandler.bind(this);
  }

  InputOnchangeHandler(e) {
    this.setState({
      userinput: e.target.value,
    });
  }

  AddItemHandler(e) {
    e.preventDefault();// Prevent the default action
    const newItems = this.state.items.concat([
      {
        title: this.state.userinput,
        completed: false,
      },
    ]);
    this.setState({
      items: newItems,
      userinput: '',
    });
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
  render() {
    return (
      <div>
        <form onSubmit={this.AddItemHandler}>
          <input
            value={this.state.userinput}
            onChange={this.InputOnchangeHandler}
            placeholder="What are you gonna do next"
            className="form-control"
          />
          <button type="submit" onClick={this.AddItemHandler}>Add Item</button>
        </form>
        <ul>
          {this.state.items.map(item => <TodoItems itm={item} onToggleHandler={() => this.ToggleItemHandler(item)} onRemoveHandler={() => this.RemoveItemHandler(item)} />)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
