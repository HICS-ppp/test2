import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./RouteTest/About";
import { Contact } from "./RouteTest/Contact";
import { Home } from "./RouteTest/Home";
import Test from "./RouteTest/Test";
import Test2 from "./RouteTest/Test2";
import Test3 from "./RouteTest/Test3"
import GoogleAuth from "./google_auth/GoogleAuth";
import GoogleAuth2 from "./google_auth/GoogleAuth2";
import TestClass from "./RouteTest/TestClass";
import TestFunctionOnLifeCycle from "./RouteTest/TestFunctionOnLifeCycle";

export const RouterConfig = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/test" element={<Test2 />}/>
                    <Route path="/test3" element={<Test3 />}/>
                    <Route path="/test2" element={<Test />}/>
                    <Route path="/google-auth" element={<GoogleAuth />}/>
                    <Route path="/google-auth2" element={<GoogleAuth2 />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};