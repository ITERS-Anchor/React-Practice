import React from 'react';

export default class CDNJS extends React.Component {
  constructor() {
    super();
    this.state = {
      userinput: 'jquery',
      data: {},
      isLoading: false,
    };
    this.SearchHandler = this.SearchHandler.bind(this);
    this.InputOnchangeHandler = this.InputOnchangeHandler.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    this.setState({ isLoading: true });
    const url = `https://api.cdnjs.com/libraries/${this.state.userinput}`;
    $.getJSON(url, (response) => {
      this.setState({ data: response, isLoading: false });
    });
  }
  InputOnchangeHandler(e) {
    this.setState({
      userinput: e.target.value.trim(),
    }, () => { this.fetchData(); });
  }
  SearchHandler(e) {
    e.preventDefault();
    this.fetchData();
    this.setState({
      userinput: '',
    });
  }
  renderData() {
    const { name, filename, version, license, assets = [] } = this.state.data;
    return (
      <div>
        <label>Name:</label> {name} <br />
        <label>File name:</label> {filename} <br />
        <label>Version:</label> {version} <br />
        <label>License:</label> {license} <br />
        <label>All versions</label>
        <div>
          {assets.map(x => (<div>{x.version}</div>))}
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
        {this.state.isLoading &&
        <div className="" style={{ margin: '15px auto' }}>
          <h3>Loading...</h3>
        </div>
        }
        {!this.state.isLoading && this.state.data && this.renderData()}
      </div>

    );
  }
}

