import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import Pokemon from './pages/pokemon';

export default Routes => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/type/:type" component={Home}/>
                <Route path="/pokemon/:id" component={Pokemon} />
            </Switch>
        </BrowserRouter>
    );
}