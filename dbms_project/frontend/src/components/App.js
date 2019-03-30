import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";
import List from "./movies/List";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <List />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
