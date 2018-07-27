import React from 'react';

export default class CDNJS extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const url = 'https://api.cdnjs.com/libraries/jquery';
    $.getJSON(url, (response) => {
      this.setState({ data: response });
    });
  }
  renderData() {
    const { data } = this.state;
    return (
      <div>
        <label>Name</label> {data.name} <br />
        <label>File name</label> {data.filename} <br />
        <label>Version</label> {data.version} <br />
        <label>License</label> {data.license} <br />
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
        <h3> jQuery Versions</h3>
        {this.state.data && this.renderData()}
      </div>

    );
  }
}

