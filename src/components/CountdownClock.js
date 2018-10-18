import React, {Component} from 'react';

class CountdownClock extends Component{

  constructor(props){
    // super(props) is necessary if the props passed from parent component
    // is to be accessed through the constructor.
    super(props);
    this.state = {
      seconds: this.props.seconds,
      hours: this.props.hours,
      minutes: this.props.minutes,
      interval: null
    };
  }

  // once the CountdownClock is mounted, an interval is started
  // which updates the time every second.
  componentDidMount(){
    let interval = setInterval(() => {
      this.getTime();
    }, 1000 )
    this.setState( { interval } );
  }

  // in the parent component, App, if a new timer is set,
  // the clock state of App is updated to null, and the current
  // CountdownClock component is unmounted.
  // In this event, the interval for updating the time is cleared.
  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  // getTime() updates the seconds, hours, minutes state
  // of the CountdownClock component. When the timer counts down to 0,
  // the interval for updating the time is cleared.
  getTime(){
    let {seconds, minutes, hours} = this.state;

    // Determine the seconds first.
    // if the seconds is greater than 0 currently, the second is decremented.
    // Otherwise, the total seconds will only reset to 59 if there are still
    // hours or minutes remaining.
    if( seconds > 0 ){
      seconds--;
    }else{
      if(hours > 0 || minutes > 0)
        seconds = 59;
    }

    // Determine the minutes.
    // if the seconds have been reset to 59,
    // take away from the minutes.
    // Otherwise if the total minutes is currently 0, and there are still hours remaining
    // and the seconds has been set to 59, reset the minutes back to 59.
    if( minutes > 0 && seconds === 59 ){
      minutes--;
    }else if( seconds === 59 && minutes === 0 && hours > 0 ){
      minutes = 59;
    }

    // determine the hours
    // if there are still hours remaining, and if the minutes and seconds
    // have both reset to 0, decrement the hours.
    if( hours > 0 && minutes === 59 && seconds === 59){
      hours--;
    }

    // if the hours, seconds and minutes are all 0, clear the interval,
    // and set running to false. Otherwise, the new time is set.
    if(hours === 0 && seconds === 0 && minutes === 0){
      clearInterval(this.state.interval);
      this.setState({ seconds,
                      minutes,
                      hours,
                      interval: null,
                      running: false });
    }else{
      this.setState({seconds, minutes, hours});
    }

  }

  // formatTime returns a JSX object used to display the current time.
  formatTime(){
    const {seconds, minutes, hours, running} = this.state;
    return ( <div className = "clock">
      {hours} : {minutes < 10 ? `0${minutes}` : minutes } : {seconds < 10 ? `0${seconds}` : seconds}
    </div> );
  }

  render(){
    return this.formatTime();
  }
}

CountdownClock.defaultProps = {
  seconds: 0,
  hours: 0,
  minutes: 0
}

export default CountdownClock;
