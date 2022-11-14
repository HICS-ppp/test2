import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./RouteTest/About";
import { Contact } from "./RouteTest/Contact";
import { Home } from "./RouteTest/Home";

export const RouterConfig = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};