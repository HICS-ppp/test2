import React, {useEffect} from 'react';
import logo from './logo.svg';
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NameElement from './Name'
import './App.css';
import { RouterConfig } from './Route'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <NameElement />
        <div>
          <RouterConfig />
        </div>
        <div className="GoogleAuth"></div>
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
  )}
  /*<script async defer src="https://apis.google.com/js/api.js"
          onLoad="this.onload=function(){};handleClientLoad()"
          onreadystatechange="if (this.readyState === 'complete') this.onload()">
  </script>*/


/*
const container = document.getElementById('aaa');
const aaa = createRoot(container!);
aaa.render(<NameElement />)
*/


// const aaa = ReactDOM.createRoot(document.getElementById("aaa") as HTMLElement);
//aaa.render(
//
//    <React.StrictMode>
//      <NameElement />
//    </React.StrictMode>
// )


const Test2 = () => {
  return <p>Do You Want?</p>
}


export default App;
