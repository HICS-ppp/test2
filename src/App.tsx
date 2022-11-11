import React from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <p id="test">
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const Test = () => {
  return <p>Test_React!</p>;
}

const Test2 = () => {
  return <p>Do You Want?</p>
}

  ReactDOM.render(<Test/>, document.getElementById("test"))


export default App;
