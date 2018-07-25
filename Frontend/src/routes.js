import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Home from './components/home';
import Dashboard from './components/dashboard';
import DashboardHome from './components/dashboard';
import DashboardTransactions from './components/dashboard';
const AppRouter = () =>(

			<BrowserRouter History={History}>
				 <Switch>	
			        <Route path="/" component={Home} exact={true}/>
			        <Route path="/dashboard" component = {Dashboard}/>
    			 </Switch>
			</BrowserRouter>

)

export default AppRouter;