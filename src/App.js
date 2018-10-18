import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CountdownClock from './components/CountdownClock';

class App extends Component {

  constructor(){
    super();

    // The clock state is the CountdownClock component,
    // The invalid state determines whether the provided number of hours is valid,
    // this state will decide whether to disable the "start-timer" button.
    // the running state determines whether a clock is currently running or not,
    // this state will decide whether to unmount a CoundownClock component or
    // mount a new one.
    this.state = {
      errors: {
        hours: null
      },
      hours: 0,
      seconds: 0,
      minutes: 0,
      running: false,
      invalid: false,
      clock: null
    }
    this.setTime = this.setTime.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  render() {
    const { errors,
            seconds,
            hours,
            minutes,
            running,
            clock,
            invalid } = this.state;

    return (
      <div style = { { width: '100%',
                       boxSizing: 'border-box',
                       padding: '20px 40px'} }>
        <div  className = 'box' >
          <h1>Countdown Clock </h1>
          <form onSubmit = {this.setTime}>
            <div className = "inputs-box">
              <div className = "input-group">
                Hours<br/>
                <input type = "text"
                       name = "hours"
                       defaultValue = '0'
                       onChange = {this.validateInput} />
                <p style = {{fontSize: '10px', color: 'red'}}>
                {errors.hours}</p>
              </div>
              <div className = "input-group">
                Minutes
                <br />
                <select name = "minutes"
                        defaultValue = '0'
                        onChange = {this.handleOnInputChange} >
                        {this.renderOptions()}
                </select>
              </div>
              <div className = "input-group">
                Seconds
                <br />
                <select name = "seconds"
                        defaultValue = '0'
                        onChange = {this.handleOnInputChange} >
                        {this.renderOptions()}
                </select>
              </div>
              <div className = "input-group">
                { !running ? <button className = "timer-button" disabled = {invalid} > Start Time </button>
                          : <input type = 'button'
                                  value = 'Stop Time'
                                  className = 'timer-button'
                                  onClick = {this.stopTime} /> }
             </div>
           </div>

          </form>
          { clock  }
        </div>
      </div>
    );
  }

  renderOptions(){
    const options = [];
    for(let i =0; i <= 59; i++){
      options.push(i);
    }
    return options.map( number => (
      <option value = {number}
              key = {number} >{number}</option>
    ));
  }

  // setTime is called when the form is submitted.
  // this method will trigger the App component to
  // render a new CountdownClock component.
  setTime(e){
    e.preventDefault();
    const hours = Number(e.target[0].value.trim()),
          minutes = Number(e.target[1].value.trim()),
          seconds = Number(e.target[2].value.trim());

    this.setState({
      running: true,
      clock: <CountdownClock seconds = {seconds}
                             minutes = {minutes}
                             hours = {hours} />
    });
  }

  // this method is used to trigger the unmounting of the current
  // CountdownClock component.
  stopTime(){
    this.setState({
      running: false,
      clock: null
    });
  }

  // used to parse and validate the input given for hours.
  validateInput(e){

    const input = e.target.value.trim();

    if(isNaN(Number(input))){
      this.setState({
        invalid: true,
        errors: { [e.target.name]: `The number of ${e.target.name} you provided is invalid.
                                    Please provide a valid number to start the timer.`}
      });
    }else{
      this.setState({
        invalid: false,
        errors: { [e.target.name]: null}
      });
    }
  }

}

export default App;
