import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
//import './Welcome.css';

class Welcome extends Component {
    render() {

        $('.page-header h1').text('');

        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="medium-12 columns">
                        {/*<h2 id="welcomeText">CCOM Dashboard</h2>*/}
                        <div className="col-md-auto">
                            <Link to='/login'>
                                <button className="btn btn-info">Login</button>
                            </Link>&nbsp;
                            <Link to='/signup'>
                                <button className="btn btn-success">Signup</button>
                            </Link>&nbsp;
                            <Link to='/members'>
                                <button className="btn btn-primary">Members</button>
                            </Link>&nbsp;
                            <Link to='/broadcast'>
                                <button className="btn btn-danger">Broadcast</button>
                            </Link>
                        </div>
                        {/*
                        <a href="/login" className="btn btn-info">Login</a>&nbsp;
                        <a href="/signup" className="btn btn-success">Signup</a>&nbsp;
                        <a href="/members" className="btn btn-primary">Members</a>
                        */}
                    </div>
                </div>
            </div>
        );
    }
}
export default Welcome;