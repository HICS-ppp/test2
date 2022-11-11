import React from 'react';
import './top.css';

import { BrowserRouter, Route, Routes} from "react-router-dom";
import Toppage from "./Toppage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Toppage />} />

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
