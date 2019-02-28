import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppContainer from './containers/app-container';
import Sectors from './containers/sectors-container';
import FO from './components/fo';


// The Routing Component providing all the routing Configuration

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AppContainer} />
                <Route path="/home" component={AppContainer} />
                <Route path="/sectors" component={Sectors} />
                <Route path="/fo" component={FO} />
            </Switch>
        </BrowserRouter>
    )
};

export { Routes }
