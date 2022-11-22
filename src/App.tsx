import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './top.css';
import Mainpage from "./mainpage/mainpage";
import Register from "./signup/signup";
import Login from "./login/login";
import Toppage from "./toppage/toppage";
import SendMail from "./signup/signup_mail_send";
import Comp from "./signup/signup_comp";
import Passinquiry from "./passinquiriy/passinquiry";
import Gest from "./gest/gest";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Toppage />} />
            <Route path={'/mainpage'} element={<Mainpage />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<Register />} />
            <Route path={'/signup_mail_send'} element={<SendMail />}　/>
            <Route path={'/signup_comp'} element={<Comp />} />
            <Route path={'/passinquiry/'} element={<Passinquiry/>}/>
            <Route path={'/gest/'} element={<Gest/>}/>




          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
