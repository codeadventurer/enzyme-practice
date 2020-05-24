import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

// Alternative for setup:

// let wrapper;

// beforeEach(() => {
//   wrapper = shallow(<App />);
// });

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);

  // to check behaviour instead of implementation:
  // const initialCounterState = findByTestAttr(wrapper, "counter-display");
  // expect(initialCounterState.text()).toBe("The counter is 0");
});

test("clicking increment button increments counter display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

test("clicking decrement button decrements counter display", () => {
  const counter = 5;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

test("don't allow counter to go below zero", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(0);
});

test("don't display an error if counter above zero", () => {
  const counter = 1;
  const wrapper = setup(null, { counter });

  const error = findByTestAttr(wrapper, "error-message");
  expect(error.exists()).toBeFalsy();
});

test("display an error if counter below zero", () => {
  const counter = -1;
  const wrapper = setup(null, { counter });

  const error = findByTestAttr(wrapper, "error-message");
  expect(error.exists()).toBeTruthy();
});
