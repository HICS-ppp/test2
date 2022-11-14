import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './top.css';
import Mainpage from "./mainpage/mainpage";
import Register from "./signup/signup";
import Login from "./login/login";
import Toppage from "./toppage/toppage";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Toppage />} />
            <Route path={'/mainpage/'} element={<Mainpage />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/signup/`} element={<Register />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
