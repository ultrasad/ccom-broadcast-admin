import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Members from './Members';
import Broadcast from './Broadcast';
import Welcome from '././Components/Welcome/Welcome';
import Login from '././Components/Login/Login';
import Home from '././Components/Home/Home';
import NotFound from '././Components/NotFound/NotFound';
import requireAuthentication from '././Components/Auth/requireAuthentication';

const getUrl = window.location;
var base_url = getUrl.protocol + "//" + getUrl.host;
var broadcast_url = getUrl.protocol + "//" + getUrl.host;

broadcast_url = 'http://172.22.228.211:8085';

if(base_url === 'http://localhost:3000' || base_url === 'http://localhost:5000'){ //5000:build
    base_url = 'http://172.22.228.225';
    //broadcast_url = 'http://172.22.228.211:8085';
}

console.log('base url => ' + base_url);
/*
const PrimaryLayout = () => (
    <div className="primary-layout">
      <header>
        Our React Router 4 App
      </header>
      <main>
        <Route path="/" exact component={Broadcast} />
        <Route path="/users" component={Members} />
      </main>
    </div>
);
*/
const AuthMembers = requireAuthentication(Members);
const AuthBroadcast = requireAuthentication(Broadcast);
const Routes = ({ match }) => (
    <BrowserRouter basename='/'>
        {/*<PrimaryLayout />*/}
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/home" component={Home}/>
            <Route path="/login" render={(props) => <Login base_url={base_url} {...props} />} />
            <Route path="/members" render={(props) => <AuthMembers base_url={base_url} {...props} />} />
            <Route path="/broadcast" render={(props) => <AuthBroadcast base_url={base_url} broadcast_url={broadcast_url} {...props} />} />
            <Route path="*" component={NotFound}/>
            <Route render={() => {
                return <h1>Not Found!</h1>
            }} />
        </Switch>
    </BrowserRouter>
);

export default Routes;