import { Component } from 'react'
import './App.css'

const formatTime = (seconds) => {
  if (seconds <= 0) {
    return "00:00";
  }
  if (seconds >= 3600)
  {
    return "60:00";
  }
  return `${parseInt(seconds / 60) < 10 ? `0${parseInt(seconds / 60)}`: parseInt(seconds / 60)}:${(seconds % 60) < 10 ? `0${seconds % 60}`: seconds % 60}`
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timertime: 1500,
      startStopButtonDisplay: "Start",
      current: "Session"
    };
    this.resetSession = this.resetSession.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.timer = this.timer.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.myInterval = "";
  }

  increment({target}) {
    const currentIncrementButton = target;
    switch (currentIncrementButton.id) {
      case "break-increment":
        if (this.state.breakLength >= 60) {
          break;
        }
        this.setState((state) => ({
          breakLength: state.breakLength + 1
        }));
        break;
      case "session-increment":
        if (this.state.sessionLength >= 60) {
          break;
        }
        this.setState((state) =>({
          sessionLength: state.sessionLength + 1,
          timertime: state.timertime + 60
        }));
        break;
      default:
        break;
    }
  }

  decrement({target}) {
    const currentDecrementButton= target;
    switch (currentDecrementButton.id) {
      case "break-decrement":
        if (this.state.breakLength <= 1) {
          break;
        }
        this.setState((state) => ({
          breakLength: state.breakLength - 1
        }));
        break;
      case "session-decrement":
        if (this.state.sessionLength <= 1) {
          break;
        }
        this.setState((state) =>({
          sessionLength: state.sessionLength - 1,
          timertime: state.timertime - 60

        }));
        break;
      default:
        break;
    }
  }
  resetSession() {
    clearInterval(this.myInterval);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timertime: 1500,
      startStopButtonDisplay: "Start",
      current: "Session"
    })
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }

  changeTime()
  {
    if (this.state.timertime == 0)
    {
      const audio = document.getElementById("beep");
      audio.play();
    }
    if (this.state.timertime == 0 && this.state.current == "Session") 
    {
      this.setState((state) => ({
        timertime: state.breakLength * 60,
        current: "Break"
      }))
    }
    else if (this.state.timertime == 0 && this.state.current == "Break") 
    {
      this.setState((state) => ({
        current: "Session",
        timertime: state.sessionLength * 60
      }))
    }
    else 
    {
      this.setState((state) => ({
      timertime: state.timertime - 1
    }))
  }
  }

  timer() 
  {
    clearInterval(this.myInterval);
    this.setState((state) => ({
      startStopButtonDisplay: state.startStopButtonDisplay == "Start" ? "Stop" : "Start"
    }));
    if (this.state.startStopButtonDisplay == "Start") {
      this.myInterval = setInterval(this.changeTime, 1000);
    }
}

  render() {
    return (
      <div id="App">
        <h1>25 + 5 Clock</h1>
        <div id="break-label">
          <h2>Break Length</h2>
          <div>
            <button id="break-decrement" onClick={this.decrement}>
              -
            </button>
            <p id="break-length">{this.state.breakLength}</p>
            <button id="break-increment" onClick={this.increment}>
              +
            </button>
          </div>
        </div>
        <div id="session-label">
          <h2>Session Length</h2>
          <div>
            <button id="session-decrement" onClick={this.decrement}>
              -
            </button>
            <p id="session-length">{this.state.sessionLength}</p>
            <button id="session-increment" onClick={this.increment}>
              +
            </button>
          </div>
        </div>
        <div id="timer-label">
          <h2>{this.state.current}</h2>
          <div id="time-left">
            {formatTime(this.state.timertime)}
          </div>
          <div>
          <button id="start_stop" onClick={this.timer}>{this.state.startStopButtonDisplay}</button>
          <button id="reset" onClick={this.resetSession}>Reset</button></div>
          <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" />
        </div>
      </div>
    )
  }
}

export default App
