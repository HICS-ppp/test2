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
import Loginloading from "./login/login_loading";
import GroupMenu from "./group/groupmenu";
import Groupmenu_create from "./group/groupmenu_create";
import Groupmenu_join from "./group/groupmenu_join";
import Group_manage from "./group/group_manage";




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
            <Route path={'/login_loading'} element={<Loginloading/>}/>
            <Route path={'/groupmenu'} element={<GroupMenu/>}/>
            <Route path={'/groupmenu_create'} element={<Groupmenu_create/>}/>
            <Route path={'/groupmenu_join'} element={<Groupmenu_join/>}/>
            <Route path={'/group_manage'} element={<Group_manage/>}/>


          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
