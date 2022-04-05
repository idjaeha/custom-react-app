import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const GREETING_MESSAGE = "hello world!";

const init = (greeting: string = GREETING_MESSAGE) => {
  console.log(greeting);
  ReactDOM.render(<App />, document.getElementById("root"));
};

init();
