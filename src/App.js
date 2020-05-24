import React, { Component } from "react";
import { testAttr } from "./utils.js";
import "./App.css";

class App extends Component {
  state = {
    counter: 0,
  };

  render() {
    return (
      <div {...testAttr("component-app")} className="App">
        <h1 {...testAttr("counter-display")}>
          {this.state.counter >= 0
            ? `The counter is ${this.state.counter}`
            : "The counter is 0"}
        </h1>
        {this.state.counter < 0 ? (
          <p {...testAttr("error-message")}>The counter cannot go below zero</p>
        ) : null}
        <button
          {...testAttr("increment-button")}
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Increment
        </button>
        <br />
        <button
          {...testAttr("decrement-button")}
          onClick={() => this.setState({ counter: this.state.counter - 1 })}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
