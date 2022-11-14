import React from 'react';
import logo from './logo.svg';
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NameElement from './Name'
import './App.css';
import { RouterConfig } from './Route'
import { loadSavedCredentialsIfExist, saveCredentials,
  authorize, listFiles } from './googledriveapi/GoogleDriveAPI';



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
        <div>
          <button onClick={loadSavedCredentialsIfExist}>テスト</button>
        </div>


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
