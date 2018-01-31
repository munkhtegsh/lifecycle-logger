import React, { Component } from 'react';
import './App.css';
import Loggify from './Loggify';

class App extends Component {

  state = {
    data: 'no data yet',
    parentPoll: 'no data yet!!!'
  }

  fetchData = () => {
    console.log("Going to fetch data");
    setTimeout(() => {
      console.log("Data retrieved");
      this.setState({data: Math.random()})
    }, 1500

    )
  }

  componentDidMount() { //good place to use API, refs, third party library ...
    this.fetchData();
    this.createParentPoll();
    let canvasCtx = this.appCanvas.getContext('2d');
    canvasCtx.fillStyle = "blue";
    canvasCtx.arc(75,75,50,0,2 * Math.PI);
    canvasCtx.fill();
    console.log(this.refs)
  }

  componentWillUnmount() { //cleanup itself, timers to clear, refs to empty...
    clearInterval(this.pollInterval);
  }

  createParentPoll = () => {
    this.pollInterval = setInterval(() => {
        this.setState({parentPoll: getRandomInt(1,2)})},1000)
  }



  render() {

    let {showPollChild, parentPoll, data} = this.state;
      console.log('hi')

    return (
      <div>
      hi
      <h4>{data}</h4>
      <h4>{parentPoll}</h4>
      <canvas ref={el => this.appCanvas = el} width={200} height={100} />
      <button 
        onClick={() => {
          this.setState((prevState) => {
            return {
              showPollChild: !prevState.showPollChild
            }
          })

        }}> 

        {(showPollChild) ? "Hide" : "Show"} PollChild
      </button>

      {(showPollChild) ? (
        <PollChild 
          parentPoll = {parentPoll} 
          />) : null} 

      </div>
    );
  }
}

class PollChild extends Component {
  static displayName = "PollChild";
  state = {poll: Math.random()}

  componentDidMount() {
    //this.pollData()
  }

  pollData = () => {
    this.pollInterval = setInterval(() => {
      console.log("Poll!");
      this.setState({poll: getRandomInt(1,4)})
    },1000)
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.parentPoll !== this.props.parentPoll) {
      return true;
    } if (nextState.poll !== this.state.poll) {
      return true;
    } return false;
  }

  render() {
    console.log('PollChild rerendered');
    return (
      <h4> poll: {this.state.poll} </h4>
    )
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

App.displayName = "APP";
Loggify.defaultProps = {
  hello: "Mt"
}

// App = Loggify(App);
PollChild = Loggify(PollChild);


// function wrapperFunc(WrappedFunc) {
//   return class extends Component {
//     render() {
//       return (
//         <div style={{backgroundColor: 'blue'}}>
//           <WrappedFunc />
//         </div>
//       )
//     }
//   }
// }

// App = wrapperFunc(App)

export default App;
