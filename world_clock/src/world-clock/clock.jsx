import React from 'react';
import moment from 'moment-timezone';
import './clock.css';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTime: new Date() };
  }
  componentDidMount() {
    this.updateTime();
  }
  updateTime() {
    setInterval(() => { this.setState({ currentTime: new Date() }); }, 1000);
  }
  render() {
    const timezone = this.props.city.timezone;
    const localDateTime = moment(this.state.currentTime).tz(timezone);
    const date = localDateTime.format('ddd MMM DD YYYY');
    const hours = localDateTime.format('HH');
    const minutes = localDateTime.format('mm');
    const seconds = localDateTime.format('ss');
    return (
      <div className="card text-white mb-3 col-md-4">
        <div className="card-header" >{date}</div>
        <div className="card-body">
          <span>{hours}</span>:
          <span >{minutes}</span>:
          <span >{seconds}</span>
          <p>{this.props.city.name}</p>
        </div>
      </div>
    );
  }
}

