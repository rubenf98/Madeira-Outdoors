import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

//public pages
import Layout from "./components/Layout";
import Homepage from "./components/client/Homepage";
import Checkout from "./components/client/Checkout";
import Login from "./components/dashboard/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Activities from "./components/client/Activities";
import Activity from "./components/client/Activity";
import DashboardActivity from "./components/dashboard/activity/Activity";
import Home from "./components/dashboard/homepage/Home";
import BlockPeriod from "./components/dashboard/blockPeriod/BlockPeriod";
import Reservation from "./components/dashboard/reservation/Reservation";
import About from "./components/client/About";
import Faq from "./components/client/Faq";
import ReservationDetails from "./components/dashboard/reservation/ReservationDetails";

export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route path="/painel/reservas/:reservationId" element={<Layout><Dashboard><ReservationDetails /></Dashboard></Layout>} />
                <Route path="/painel/reservas" element={<Layout><Dashboard><Reservation /></Dashboard></Layout>} />
                <Route path="/painel/datas" element={<Layout><Dashboard><BlockPeriod /></Dashboard></Layout>} />
                <Route path="/painel/atividades" element={<Layout><Dashboard><DashboardActivity /></Dashboard></Layout>} />
                <Route path="/painel" element={<Layout><Dashboard><Home /></Dashboard></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route exact path="/booking" element={<Layout enable><Checkout /></Layout>} />
                <Route exact path="/activity/:activityId" element={<Layout enable><Activity /></Layout>} />
                <Route exact path="/category/:category" element={<Layout enable><Activities /></Layout>} />
                <Route exact path="/about" element={<Layout enable><About /></Layout>} />
                <Route exact path="/faq" element={<Layout enable><Faq /></Layout>} />
                <Route exact path="/" element={<Layout enable><Homepage /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
