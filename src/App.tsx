import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Mainpage from "./mainpage/mainpage";
import Register from "./signup/signup";
import Login from "./login/login";
import Toppage from "./toppage/toppage";
import Groupmenu from "./groupmenu/groupmenu";
import Roompass from "./watch/room";
import Watch from "./watch/watch";
import Usermenu from"./usermenu/usermenu";
import Usermana from "./usermenu/usermanagement";
import Sam from "./sam/sam";
import Passinquiry from "./passinquiriy/passinquiry";
import Gest from "./gest/gest";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Toppage />} />
            <Route path={'/mainpage/'} element={<Mainpage />} />
            <Route path={`/login/`} element={<Login />} />
            <Route path={`/signup/`} element={<Register />} />
            <Route path={'/groupmenu/'} element={<Groupmenu/>}/>
            <Route path={'/room/'} element={<Roompass/>}/>
            <Route path={'/watch/'} element={<Watch/>}/>
            <Route path={'/usermenu/'} element={<Usermenu/>}/>
            <Route path={'/usermana/'} element={<Usermana/>}/>
            <Route path={'/sam/'} element={<Sam/>}/>
            <Route path={'/passinquiry/'} element={<Passinquiry/>}/>
            <Route path={'/gest/'} element={<Gest/>}/>

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;