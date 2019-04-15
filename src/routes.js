import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Members from './Members';
import Welcome from '././Components/Welcome/Welcome';
import Login from '././Components/Login/Login';
import Home from '././Components/Home/Home';
import NotFound from '././Components/NotFound/NotFound';
import requireAuthentication from '././Components/Auth/requireAuthentication';

var getUrl = window.location;
var base_url = getUrl.protocol + "//" + getUrl.host;

if(base_url === 'http://localhost:3000'){
    base_url = 'http://172.22.228.225';
}

console.log('base url => ' + base_url);

const AuthMembers = requireAuthentication(Members);
const Routes = ({ match }) => (
    <BrowserRouter basename='/'>
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            {/*<Route path="/login" component={() => (<Login base_url={base_url} {...this.props} />)} />*/}
            <Route path="/login" render={(props) => <Login base_url={base_url} {...props} />} />
            <Route path="/members" render={(props) => <AuthMembers base_url={base_url} {...props} />} />
            <Route path="*" component={NotFound}/>
            <Route render={() => {
                return <h1>Not Found!</h1>
            }} />
        </Switch>
    </BrowserRouter>
);

export default Routes;