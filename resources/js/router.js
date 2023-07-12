import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

//public pages
import Layout from "./components/Layout";
import Homepage from "./components/client/Homepage";
import Checkout from "./components/client/Checkout";
import Login from "./components/dashboard/Login";
import Dashboard from "./components/dashboard/Dashboard";

export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route path="/painel" element={<Layout><Dashboard /></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route exact path="/booking" element={<Layout enable><Checkout /></Layout>} />
                <Route exact path="/" element={<Layout enable><Homepage /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
