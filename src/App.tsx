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
import Passchangecom from "./passinquiry/passchangecom";
import Passchange from "./passinquiry/passchange";
import Passinquiry_mail_send from "./passinquiry/passinquiry_mail_send";
import Passinquiry_loading from "./passinquiry/passinquiry_loading";
import Passerror from "./passinquiry/passerror";
import Loginerror from "./login/loginerror";
import Usercert from "./usermenu/usercert";
import Userloading from "./usermenu/user_loading";
import Usermenu from "./usermenu/usermenu";
import Usererror from "./usermenu/usererror";
import Usermail from "./usermenu/usermail";
import Mailchange from "./usermenu/mailchange";
import Screendelete from "./usermenu/screendelete";
import Passresetting from "./usermenu/passresetting";
import Passre_loading from "./usermenu/passre_loading";
import Login_user from "./usermenu/login_user";
import Loginuser_loading from "./usermenu/loginuser_loading";
import Loginusererror from "./usermenu/loginusererror";
import Syozoku from "./usermenu/syozoku";
import Smp from "./usermenu/smp";

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
            <Route path={'/passchangecom'} element={<Passchangecom/>}/>
            <Route path={'/passchange'} element={<Passchange/>}/>
            <Route path={'/passinquiry_mail_send'} element={<Passinquiry_mail_send/>}/>
            <Route path={'/passinquiry_loading'} element={<Passinquiry_loading/>}/>
            <Route path={'/passerror'} element={<Passerror/>}/>
            <Route path={'/loginerror'} element={<Loginerror/>}/>
            <Route path={'/usercert'} element={<Usercert/>}/>
            <Route path={'/user_loading'} element={<Userloading/>}/>
            <Route path={'/usermenu'} element={<Usermenu/>}/>
            <Route path={'/usererror'} element={<Usererror/>}/>
            <Route path={'/usermail'} element={<Usermail/>}/>
            <Route path={'/mailchange'} element={<Mailchange/>}/>
            <Route path={'/screendelete'} element={<Screendelete/>}/>
            <Route path={'/passresetting'} element={<Passresetting/>}/>
            <Route path={'/passre_loading'} element={<Passre_loading/>}/>
            <Route path={'/loginuser'} element={<Login_user/>}/>
            <Route path={'/loginuser_loading'} element={<Loginuser_loading/>}/>
            <Route path={'/loginusererror'} element={<Loginusererror/>}/>
            <Route path={'/syozoku'} element={<Syozoku/>}/>

            <Route path={'/smp'} element={<Smp/>}/>



          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
