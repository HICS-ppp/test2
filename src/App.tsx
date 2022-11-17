import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Mainpage from "./mainpage/mainpage";
import Register from "./signup/signup";
import Login from "./login/login";
import Toppage from "./toppage/toppage";
import Gest from "./gest/gest";
import Passinquiry from "./passinquiriy/passinquiry";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Toppage />} />
            <Route path={'/mainpage/'} element={<Mainpage />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/signup/`} element={<Register />} />
              <Route path={`/gest/`} element={<Gest />} />
            <Route path={'/passinquiry/'} element={<Passinquiry />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;

