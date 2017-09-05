import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Posts from '../ui/Posts';
import { NotFound } from '../ui/NotFound';

const publicRoutes = ['/', '/signup', '*'];
const authRoutes = ['/posts'];

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/posts" component={Posts} />
        <Route path="*" component={NotFound} />
    </Router>
)

export const onAuthChange = (userAuthStatus) => {
    const currentPage = browserHistory.getCurrentLocation().pathname;
    // console.log("userAuthStatus : ", userAuthStatus);
    // console.log("currentPage : ", currentPage);
    if (!userAuthStatus && authRoutes.includes(currentPage)) {
        browserHistory.push("/");
    }
    else if (userAuthStatus && publicRoutes.includes(currentPage)) {
        browserHistory.push("/posts");
    }
}