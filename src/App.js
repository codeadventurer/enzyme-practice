import React, { Component } from "react";
import { testAttr } from "./utils.js";
import "./App.css";

class App extends Component {
  state = {
    counter: 0,
    error: false,
  };

  incrementCounter = () => {
    this.setState({ error: false, counter: this.state.counter + 1 });
  };

  decrementCounter = () => {
    if (this.state.counter <= 0) {
      this.setState({ error: true });
    } else this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    return (
      <div {...testAttr("component-app")} className="App">
        <h1 {...testAttr("counter-display")}>
          The counter is {this.state.counter}
        </h1>
        <button
          {...testAttr("increment-button")}
          onClick={this.incrementCounter}
        >
          Increment
        </button>
        <br />
        <button
          {...testAttr("decrement-button")}
          onClick={this.decrementCounter}
        >
          Decrement
        </button>
        {this.state.error ? (
          <p {...testAttr("error-message")} class="error-message">
            The counter cannot go below zero
          </p>
        ) : null}
      </div>
    );
  }
}

export default App;
