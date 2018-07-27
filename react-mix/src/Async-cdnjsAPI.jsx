import React from 'react';

export default class CDNJS extends React.Component {
  constructor() {
    super();
    this.state = {
      userinput: 'jquery',
      data: null,
      isLoading: false,
    };
    this.SearchHandler = this.SearchHandler.bind(this);
    this.InputOnchangeHandler = this.InputOnchangeHandler.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const url = `https://api.cdnjs.com/libraries/${this.state.userinput}`;
    $.getJSON(url, (response) => {
      this.setState({ data: response });
    });
  }
  InputOnchangeHandler(e) {
    this.setState({
      userinput: e.target.value,
    });
  }
  SearchHandler(e) {
    e.preventDefault();
    this.fetchData();
    this.setState({
      userinput: '',
    });
  }
  renderData() {
    const { data } = this.state;
    return (
      <div>
        <label>Name:</label> {data.name} <br />
        <label>File name:</label> {data.filename} <br />
        <label>Version:</label> {data.version} <br />
        <label>License:</label> {data.license} <br />
        <label>All versions</label>
        <div>
          {data.assets.map(x => (<div>{x.version}</div>))}
        </div>
      </div>

    );
  }
  render() {
    return (
      <div className="container" style={{ margin: '15px auto' }}>
        <form onSubmit={this.SearchHandler}>
          <input
            value={this.state.userinput}
            onChange={this.InputOnchangeHandler}
            placeholder="Enter search item"
          />
          <button type="submit" onClick={this.SearchHandler}>Search</button>
        </form>
        <h3>CDNJS api Versions</h3>
        {this.state.data && this.renderData()}
      </div>

    );
  }
}

