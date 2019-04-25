import React, { Component } from 'react';
//import {Link} from 'react-router-dom';

class Footer extends Component {
    
    componentDidMount () {
        console.log('footer didmount..');
        //this.setState({name: this.props.data.name});
    }

    /*
    componentWillReceiveProps(nextProps){
        //console.log('next props searchInput => ' + nextProps.searchInput);
        this.setState({
            searchInput: nextProps.searchInput
        });
    }
    */

    render(){

        return (
            <footer role="banner" className="footer">
                <div className="container wrapper clearfix">
                    <p className="text-muted "><strong>©2019 CCOM Broadcast Message</strong>  — Made with <span className="bullet"><svg className="heart" version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                    <title></title>
                    <g id="icomoon-ignore">
                    </g>
                    <path d="M368 32c-38.464 0-69.296 13.808-96.48 41.008-0.016 0.016-0.032 0.032-0.048 0.048h-0.016l-15.456 19.472-15.456-18.288c-0.016-0.016-0.032-0.032-0.048-0.048h-0.016c-27.2-27.216-58.016-42.192-96.48-42.192s-74.624 14.976-101.824 42.176c-27.184 27.2-42.176 63.36-42.176 101.824 0 38.432 14.96 74.592 42.128 101.776l191.152 192.752c6 6.064 14.192 9.472 22.72 9.472s16.72-3.408 22.72-9.472l191.136-192.752c27.168-27.184 42.144-63.328 42.144-101.776 0-38.464-14.992-74.624-42.176-101.824-27.2-27.2-63.36-42.176-101.824-42.176v0z"></path>
                    </svg></span> by <strong>Hanajung</strong></p>
                </div>
            </footer>
        );
    }
}

export default Footer;