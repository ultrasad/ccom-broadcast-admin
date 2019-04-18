import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';

import Routes from './routes';
import {Provider} from 'react-redux';

//import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from '../actions/types';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// This must be the first line in src/index.js
import 'react-app-polyfill/ie11';
import 'url-search-params-polyfill';

import * as serviceWorker from './serviceWorker';

const authenticated = {
    isAuthenticated: false,
    userName: null,
    token: ''
}

const userReducer = (state={name:'Super99'}, action) => {
    switch(action.type){
        case 'setName':
            state = {
                ...state,
                name: action.value
            }
        break;
        default:
    }

    return state;
}

const authReducer = (state=authenticated, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            state = { ...state, token: action.token, userName: action.userName, isAuthenticated: true }; //... is replace default value in state and edit some another value
        break;
        default:
    }

    return state;
}

const myLogger = (store) => (next) => (action) => {
    console.log('log action...');
    next(action);
}

const users = createStore(combineReducers({auth:authReducer, usr:userReducer}), {}, applyMiddleware(myLogger)); //redux createStore
users.subscribe(() => {
    console.log('employee update store...');
});

const sessionAuth = localStorage.getItem('userData');
if(sessionAuth){
    users.dispatch({ type: 'AUTH_USER' });
} else {
    console.log('login >>>>>');
}

ReactDOM.render(
    <Provider store={users}>
        <Routes />
    </Provider>, document.getElementById('container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();