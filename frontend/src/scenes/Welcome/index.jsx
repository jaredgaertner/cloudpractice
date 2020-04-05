import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h2>Welcome to the Cloudpractice Greyscale Image Filter</h2>
            <ul>
              <li>
                <Link to="/">Welcome</Link>
              </li>
              <li>
                <Link to="/filter">Greyscale Filter</Link>
              </li>
            </ul>
          </header>
        </div>
    );
  }
}
export default Welcome;
