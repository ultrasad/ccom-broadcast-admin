import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import Header from '../../header';

import BroadcastMessageTable from './broadcast_message_table';
import TopActionsComponent from './top_actions';

import BroadcastCreateMessage from './broadcast_create_message';

import $ from 'jquery';

class ReadOneBroadcastComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: 0,
            username: '',
            email: '',
            phone: '02 511 0555',
            first_name: '',
            last_name: '',
            company: 'RS',
            group_name: '',
            active: 1,
            broadcastGroupname: '',
            isShow: true,
        }
    }

    toggleShow = () => {
        console.log('toggle show main..');
        this.setState(state => ({ isShow: !state.isShow }));
    };

    // on mount, read member data and them as this component's state
    componentDidMount(){
    
       const broadcastId = this.props.broadcastId;
       //const broadcastGroupname = this.props.broadcastGroupname;

       console.log('broadcastId read one => ' + broadcastId + ', broadcastGroupname => ' + this.state.broadcastGroupname + ', url => ' + this.props.broadcast_url);
    
       /*this.serverRequestMember = $.get(this.props.source +'/'+ memberId,
           function (data) {
               console.log('data => ' + data);
               this.setState({id: data.member.id});
               this.setState({username: data.member.username});
               this.setState({email: data.member.email});
               this.setState({phone: data.member.phone});
               this.setState({first_name: data.member.first_name});
               this.setState({last_name: data.member.last_name});
               this.setState({company: data.member.company});
               this.setState({group_name: data.member.group_name});
           }.bind(this));*/

        this.serverRequestMember = $.ajax({
            url: this.props.broadcast_url +'/broadcast/msg/'+ broadcastId,
            dataType: 'json',
            //crossDomain:true,
            success: function(data) {
                //this.setState({members: data.members});
                console.log('data => ' + data);

                //fill broadcast messages to table
                this.setState({broadcast_message: data});

                if(data[0]){
                    console.log('broadcastGroupname message response => ' + data[0].message);
                    this.setState({broadcastGroupname: data[0].group[0].group_name});
                }

                /*
                this.setState({id: data.member.id});
                this.setState({username: data.member.username});
                this.setState({email: data.member.email});
                this.setState({phone: data.member.phone});
                this.setState({first_name: data.member.first_name});
                this.setState({last_name: data.member.last_name});
                this.setState({company: data.member.company});
                this.setState({group_name: data.group[0].description});
                */

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url_one_member, status, err.toString());
            }.bind(this)
        });
    
       $('.page-header h2').text('Read Broadcast');
   }
    
   // on unmount, kill member fetching in case the request is still pending
   componentWillUnmount() {
       this.serverRequestMember.abort();
   }

   render() {
    
       //list of broadcast messages
       const filteredBroadcastMessages = this.state.broadcast_message;
       const broadcastGroupname = this.state.broadcastGroupname;
       console.log('render broadcastGroupname => ' + broadcastGroupname);
       
       //const greeting = 'Welcome to React';
       
       return (

        <div role="main" className="main wrapper">
                <div className='overflow-hidden'>
                    <Header searchInput={false} clearState={this.clearState} searchBox={false} onSearchMember={this.onSearchMember} requestMember={this.state.requestMember} />
                    <TopActionsComponent searchInput={false} changeName={this.props.changeName} changeAppMode={this.props.changeAppMode} textHeaderAction={'Broadcast Group Message :: ' + broadcastGroupname} buttonAction={<Button onClick={this.toggleShow} />} />
                    
                    <div>
                        
                        {/*
                        <BunttonAction greeting={greeting} />
                        <Greeting greeting="Welcome to React" />
                        {this.state.isShow ? <Greeting greeting={greeting} /> : null}
                        <Greeting greeting={greeting} isShow={this.state.isShow} />
                        <button onClick={this.toggleShow} type="button">
                        Toggle Show
                        </button>
                        {this.state.isShow ? <Greeting greeting={greeting} /> : null}
                        */}
                        
                        {/*
                        <Greeting greeting={greeting} isShow={this.state.isShow} />
                        <Button onClick={this.toggleShow} />
                        */}

                        <div>
                            {this.state.isShow ? <BroadcastCreateMessage /> : null}
                        </div>

                        <div>
                            {/*this.state.isShow ? <Greeting greeting={greeting} /> : null*/}
                        </div>

                    </div>
                    
                    <div className="container wrapper main">
                    <BroadcastMessageTable
                        url_delete_member={this.props.url_delete_member}
                        broadcasts={filteredBroadcastMessages}
                        changeAppMode={this.props.changeAppMode}
                        onDeleteMember={this.onDeleteMember}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}/>
                    </div>
                </div>
            </div>

           /*
           <div>
               <Header searchBox={false} />
               <div className="container wrapper main header">
                    <p>
                        <Link to={'/broadcast'}
                            onClick={() => this.props.changeAppMode('read')}
                            className='btn btn-sm btn-primary btn-default margin-bottom-1em'>Broadcast User Group
                        </Link>
                    </p>
            
                    <form onSubmit={this.onSave}>
                        <table className='table table-member'>
                            <tbody>
                            <tr>
                                    <td>UserName</td>
                                    <td>{this.state.username}</td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>

                            <tr>
                                <td>Phone</td>
                                <td>{this.state.phone}</td>
                            </tr>
            
                            <tr>
                                <td>FirstName</td>
                                <td>{this.state.first_name}</td>
                            </tr>
            
                            <tr>
                                <td>LastName</td>
                                <td>{this.state.last_name}</td>
                            </tr>

                            <tr>
                                <td>Company</td>
                                <td>{this.state.company}</td>
                            </tr>
            
                            <tr>
                                <td>Group</td>
                                <td>{this.state.group_name}</td>
                            </tr>
            
                            </tbody>
                        </table>
                    </form>
               </div>
           </div>
           */
       );
   }
}

//const BunttonAction = props => <h1>{props.greeting}</h1>;
//const Greeting = ({ greeting }) => <h1>{greeting}</h1>;
//const Greeting = ({ greeting, isShow }) => isShow ? <h1>{greeting}</h1> : null;
/*
class Button1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: true,
        };
    }

    toggleShow = () => {
        console.log('toggle show button..');
        this.setState(state => ({ isShow: !state.isShow }));
    };

    render() {
        return (
        <button onClick={this.toggleShow} type="button" className="btn btn-sm btn-info">
            Toggle Show
        </button>
        );
    }
}
*/

/*
const Button = ({ onClick }) => (
    <button onClick={onClick} type="button" className="btn btn-sm btn-danger">
      Toggle Show
    </button>
);
*/

//const Greeting = ({ greeting }) => <h1>{greeting}</h1>;
//const Greeting = ({ greeting, isShow }) => isShow ? <h1>{greeting}</h1> : null;

//const Greeting = ({ greeting }) => <h1>{greeting}</h1>;

const Button = ({ onClick }) => (
    <button onClick={onClick} type="button" className="btn btn-sm btn-danger">
    Toggle Show
    </button>
);


export default ReadOneBroadcastComponent;