import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './top.css';
import Mainpage from "./mainpage/mainpage";
import Register from "./signup/signup";
import Login from "./login/login";
import Toppage from "./toppage/toppage";
import SendMail from "./signup/signup_mail_send";
import Comp from "./signup/signup_comp";
import Passinquiry from "./passinquiry/passinquiry";
import Gest from "./gest/gest";
import Passinquirycom from "./passinquiry/passinquirycom";
import Passinquiry_mail_send from "./passinquiry/passinquiry_mail_send";


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
            <Route path={'/passinquirycom/'} element={<Passinquirycom/>}/>
            <Route path={'/passinquiry_mail_send/'} element={<Passinquiry_mail_send/>}/>


          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
