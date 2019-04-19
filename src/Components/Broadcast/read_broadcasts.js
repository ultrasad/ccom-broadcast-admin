import React, { Component } from 'react';
import $ from 'jquery';

import {connect} from 'react-redux';
import {withRouter, Redirect} from "react-router-dom";

import TopActionsComponent from './top_actions';
import BroadcastTable from './broadcast_table';

import Header from '../../header';

// component that contains all the logic and other smaller components
// that form the Read Members view
class ReadBroadcastComponent extends Component {
    
    constructor(props){
        super(props);

        this.initialState = {
            searchInput: '',
            memberPerPage: 10,
            memberCurrentPage: 1,
            showPrev: false,
            memberPrevPage: 0,
            memberNextPage: 2,
            memberResults: 0,
            showNextpage: false,
            checkAuth: false,
            Unauthorized: false
        }

        this.state = this.initialState;
        
        //this.onDeleteMember = this.onDeleteMember.bind(this);
        //this.onSearchMember = this.onSearchMember.bind(this);
        this.requestBroadcast = this.requestBroadcast.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.clearState = this.clearState.bind(this);
        this.getAuthenticationToken = this.getAuthenticationToken.bind(this);
        this.getAuthenticationUser = this.getAuthenticationUser.bind(this);

        console.log('broadcast url ==> ' + this.props.broadcast_url);
    }

    onDeleteMember(memberId){
        
        // submit form data to api
        if(memberId !== undefined){

            $.ajax({
                url: this.props.url_delete_member,
                type : "POST",
                //contentType : 'application/json',
                //data : JSON.stringify({'id' : productId}),
                data: {'id': memberId},
                success : function(response) {
                    
                    let members = this.state.members;
                    let index = members.findIndex(x => x.id === memberId);
                    members.splice(index, 1);
                    this.setState({members});//like members:members

                }.bind(this), //use for bind props changeAppMode
                error: function(xhr, resp, text){
                    // show error in console
                    console.log(xhr, resp, text);
                }
            });
            
        }
    }

    //nextpage
    nextPage(){
        let newCurrentPage = Number(this.state.memberCurrentPage + 1);
        let newNextPage = Number(newCurrentPage + 1);
        let prevPage = Number(newCurrentPage - 1);
        
        console.clear();
        this.setState({
            memberCurrentPage: newCurrentPage,
            memberNextPage: newNextPage,
            memberPrevPage: prevPage
        },function afterStateChange () {
            this.requestBroadcast();
        });
    }

    prevPage(){
        let newCurrentPage = Number(this.state.memberCurrentPage - 1);
        let newNextPage = Number(newCurrentPage + 1);
        let prevPage = Number(newCurrentPage - 1);

        console.clear();
        this.setState({
            memberCurrentPage: newCurrentPage,
            memberNextPage: newNextPage,
            memberPrevPage: prevPage
        },function afterStateChange() {

            if(this.state.memberCurrentPage === 1){
                console.log('hide prev >>');
                this.setState({
                    showPrev: false
                });
            }

            this.requestBroadcast();
        });
    }

    onSearchMember(memberSearch){
        if(memberSearch !== undefined){
            
            this.setState({
                searchInput: memberSearch,
                memberCurrentPage: 1,
                memberNextPage: 2,
                memberPrevPage: 0
            }, function onStateChange(){
                this.requestBroadcast();
            });

            this.props.history.push("/members/?s=" + memberSearch);
        }
    }

    getAuthenticationToken(){
        if(localStorage.getItem('userData') === null){
            return false;
        } else {
            return JSON.parse(localStorage.getItem('userData')).token;
        }
    }

    getAuthenticationUser(){
        //console.log('localStorage userData => ' + localStorage.getItem('userData'));
        if(localStorage.getItem('userData') === null){
            return false;
        } else {
            return JSON.parse(localStorage.getItem('userData')).userName;
        }
    }

    requestBroadcast(e){
        //this.props.auth
        let token = '';
        let userLogin = '';
        if(this.state.checkAuth === true){
            
            token = this.getAuthenticationToken();
            userLogin = this.getAuthenticationUser();
            if(userLogin){
                this.setState({checkAuth: false});
            }
            
        } else {
            userLogin = this.getAuthenticationUser();
            console.log('userLogin get auth => ' + userLogin);
            if(userLogin){
                this.setState({checkAuth: false});
            }
        }

        console.log('user login >>> ' + userLogin);
        
        this.serverRequestBroadcast = $.ajax({
            data: {page_length:this.state.memberPerPage, page_start:this.state.memberCurrentPage, username: this.state.searchInput, token: token},
            url: this.props.broadcast_url + '/user/' + userLogin,
            dataType: 'json',
            //crossDomain:true,
            success: function(response) {

                if(response.code === '401'){
                    this.setState({Unauthorized: true});
                }

                if((response.results) > (this.state.memberPerPage * this.state.memberCurrentPage)){
                    console.log('member more one page >> ');
                    this.setState({
                        showNextpage: true
                    });
                } else {
                    //console.log('member only one page >> ');
                    this.setState({
                        showNextpage: false
                    });
                }

                this.setState({
                    //members: response.members,
                    broadcast: response, //lists broadcast user
                    broadcastResults: response.results
                });

                //console.log('memberResults => ', response.results);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.broadcast_url, status, err.toString());
            }.bind(this)
        });
    }
    
    // on mount, fetch all members and stored them as this component's state
    componentDidMount() {

        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const pageId = params.get('p'); //page id
        const searchParams = params.get('s'); //page id

        let newCurrentPage = 1;
        let newNextPage = 2;
        let newPrevPage = 0;
        let newSearchParam = searchParams;

        if(pageId !== undefined && pageId !== '' && pageId !== null){
             newCurrentPage = Number(pageId);
             newNextPage = Number(newCurrentPage + 1);
             newPrevPage = Number(newCurrentPage - 1);
        }
        
        if(searchParams !== undefined && searchParams !== '' && searchParams !== null){
            console.log('new search param => ' + searchParams);
            newSearchParam = searchParams;
        } else {
            newSearchParam = '';
        }

        this.setState({
            searchInput: newSearchParam,
            memberCurrentPage: newCurrentPage,
            memberPrevPage: newPrevPage,
            memberNextPage: newNextPage,
            checkAuth: true
        }, function onStateChange(){
            console.log('request member start here >>>');
            this.requestBroadcast();
        });
    }
    
    // on unmount, kill member fetching in case the request is still pending
    componentWillUnmount() {
        //console.log('kill process request member >>>');
        this.serverRequestBroadcast.abort();
    }

    componentDidUpdate(){
        //var filteredMembers = this.state.members;
    }
    
    clearState(){

        console.log('defaultState => ' + this.initialState.toSource());

        this.setState(this.initialState, function afterStateChange(){
            this.requestBroadcast();
        });
        console.log('clear state...');
    }
    
    // render component on the page
    render() {

        //Unauthorized
        if(this.state.Unauthorized === true){
            //sessionStorage.removeItem('userData');

            console.log('redirect to login >>>');
            if(localStorage.removeItem('userData') || (localStorage.getItem('userData') === null)){
                console.log('Unauthorized, remove userData');
                return (<Redirect to='/login' />);
            }
        }

        // list of members
        var filteredBroadcast = this.state.broadcast;
        var searchInput = this.state.searchInput;
        var memberResults = this.state.memberResults;
        var showNextpage = this.state.showNextpage;
        var memberCurrentPage = this.state.memberCurrentPage;

        var memberNextPage = '/members/?p=' + this.state.memberNextPage;
        var memberPrevPage = '/members/?p=' + this.state.memberPrevPage;
        if(memberCurrentPage === 2){
            memberPrevPage = '/members';
        }

        //if(searchInput !== '' && searchInput !== null && searchInput !== undefined){
        if(searchInput !== ''){
            console.log('search input render  =>' + searchInput + '<===');
            memberNextPage = '/members/?s='+searchInput+'&p=' + this.state.memberNextPage;
            memberPrevPage = '/members/?s='+searchInput+'&p=' + this.state.memberPrevPage;
            memberPrevPage = '/members/?s='+searchInput;
        }

        $('.page-header h2').text('Members List');

        return (
            <div role="main" className="main wrapper">
                <div className='overflow-hidden'>
                    <Header searchInput={searchInput} clearState={this.clearState} searchBox={false} onSearchMember={this.onSearchMember} />
                    <TopActionsComponent searchInput={searchInput} changeName={this.props.changeName} changeAppMode={this.props.changeAppMode} />
                    <div className="container wrapper main">
                    <BroadcastTable
                        url_delete_member={this.props.url_delete_member}
                        broadcasts={filteredBroadcast}
                        memberResults={memberResults}
                        showNextpage={showNextpage}
                        changeAppMode={this.props.changeAppMode}
                        onDeleteMember={this.onDeleteMember}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}
                        memberNextPage={memberNextPage}
                        memberPrevPage={memberPrevPage}
                        memberCurrentPage={memberCurrentPage} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth, //authUser
    }
}

export default connect(mapStateToProps)(withRouter(ReadBroadcastComponent));