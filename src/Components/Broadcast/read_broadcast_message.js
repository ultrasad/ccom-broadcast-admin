import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import Header from '../../header';
import Footer from '../../footer';

import BroadcastMessageTable from './broadcast_message_table';
import TopActionsComponent from './top_actions';

import BroadcastCreateMessage from './broadcast_create_message';

import $ from 'jquery';

class ReadBroadcastMessageComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            /*
            id: 0,
            username: '',
            email: '',
            phone: '02 511 0555',
            first_name: '',
            last_name: '',
            company: 'RS',
            group_name: '',
            active: 1,
            */
            editMode: false,
            broadcastEditMessageId: '',
            broadcastEditMessageTitle: '',
            broadcastEditMessagePriority: '',
            broadcastGroupId: '',
            broadcastGroupname: '',
            showCreateForm: false,
            showButtonCreate: true,
            btnTextMessage: 'สร้างข้อความใหม่',
            contentEditable: [],
            broadcast_url: this.props.broadcast_url
        }
        
        this.toggleCreate = this.toggleCreate.bind(this);
        this.callToggle = this.callToggle.bind(this);
        this.onEditMessage = this.onEditMessage.bind(this);
        this.requestBroadcastMessage = this.requestBroadcastMessage.bind(this);
        //this.isMounted = true;
    };

    //_isMounted = false;

    callToggle = () => {
        //console.log('call toggle show....');
        //this.setState({showCreateForm: false});

        //const btnText = (this.state.btnTextMessage === 'สร้างข้อความใหม่' ? 'ยกเลิก' : 'สร้างข้อความใหม่');
        //this.setState({btnTextMessage: btnText});
        //this.toggleShow();
        //e.preventDefault();

        this.setState({
            ...this.state,
            btnTextMessage: 'สร้างข้อความใหม่', 
            showCreateForm: false,
            isAddTripState: true
        });

        //re call request broadcast message
        console.log('call request broadcast message....');
        this.requestBroadcastMessage();
    };

    toggleCreate = () => {
        //this._isMounted = false;
        console.log('toggle Show box, read box main');
        //if(this._isMounted){
        console.log('toggle show main, create msg..');
        this.setState(state => ({ 
            //...this.state,
            editMode: !state.editMode,
            broadcastEditMessageId: '',
            broadcastEditMessageTitle: '',
            broadcastEditMessagePriority: '',
            showCreateForm: !state.showCreateForm 
        }));
        const btnText = (this.state.btnTextMessage === 'สร้างข้อความใหม่' ? 'ยกเลิก' : 'สร้างข้อความใหม่');
        this.setState({btnTextMessage: btnText});
        //}
    };

    onEditMessage = (messageId, Title, Priority) => {
        console.log('edit message...' + messageId);

        this.setState(state => ({ 
            //showButtonCreate: true,
            showCreateForm: true,
            btnTextMessage: 'ยกเลิก',
            editMode: true,
            broadcastEditMessageId: messageId,
            broadcastEditMessageTitle: Title,
            broadcastEditMessagePriority: Priority
        }));
        
        /*
        this.setState({
            ...this.state,
            btnTextMessage: 'สร้างข้อความใหม่', 
            showCreateForm: false,
            isAddTripState: true
        });
        */
    }

    requestBroadcastMessage(){

        this.serverRequestBroadcastMessage = $.ajax({
            url: this.props.broadcast_url +'/broadcast/msg/'+ this.state.broadcastGroupId,
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
    }

    // on mount, read member data and them as this component's state
    componentDidMount(){

        //this._ismounted = true;
        console.log('read broadcast did mount >>>>>');
        
        const broadcastId = this.props.broadcastId;
        this.setState({broadcastGroupId: broadcastId}, function onStateChange(){
            this.requestBroadcastMessage();
        });
       
        //const broadcastGroupname = this.props.broadcastGroupname;
        console.log('broadcastId message group => ' + broadcastId + ', broadcastGroupname => ' + this.state.broadcastGroupname + ', broadcast url => ' + this.props.broadcast_url);
       
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
    
       //$('.page-header h2').text('Read Broadcast');
   }
    
   // on unmount, kill member fetching in case the request is still pending
   componentWillUnmount() {
       //this._isMounted = false;
       //this._ismounted = false;
       console.log('read broadcast unmount component...');
       this.serverRequestBroadcastMessage.abort();
       //this.setState({btnTextMessage: 'สร้างข้อความใหม่'});
       //this.setState({showCreateForm: false});
   }

   renderCreateMessage() {
       //console.log('this.state.showCreateForm => ' + this.state.showCreateForm);
       /*
        if(!this.state.showCreateForm || !this._ismounted) {
            return null;
        } else {
            return(<BroadcastCreateMessage broadcast_url={this.state.broadcast_url} broadcast_group_id={this.state.broadcastGroupId} toggleShow={this.toggleShow} />);
        }
        */
   }

   render() {
    
       //list of broadcast messages
       const filteredBroadcastMessages = this.state.broadcast_message;
       const broadcastGroupname = this.state.broadcastGroupname;
       const broadcastGroupId = this.state.broadcastGroupId;
       console.log('render broadcastGroupname => ' + broadcastGroupname + ', group ID => ' + broadcastGroupId);
       //const greeting = 'Welcome to React Greeting';
       
       return (
        <React.Fragment>
            <div role="main" id="main" className="main wrapper center-panel-full">
                <div className='overflow-hidden'>
                    <Header searchInput={false} clearState={this.clearState} searchBox={false} onSearchMember={this.onSearchMember} requestMember={this.state.requestMember} />
                    <TopActionsComponent searchInput={false} changeName={this.props.changeName} changeAppMode={this.props.changeAppMode} textHeaderAction={'Broadcast Group Message :: ' + broadcastGroupname} buttonAction={this.state.showButtonCreate ? <ButtonCreateMessage onClick={(e) => this.toggleCreate(e)} btnText={this.state.btnTextMessage} otherParam={''} /> : null } />
                    
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
                            {/*this.renderCreateMessage()*/}
                            {/* {this.state.isAddTripState && <AnotherComponent />} */}
                            {this.state.showCreateForm && <BroadcastCreateMessage broadcast_url={this.state.broadcast_url} broadcast_group_id={this.state.broadcastGroupId} broadcast_edit_mode={this.state.editMode} broadcast_edit_message_id={this.state.broadcastEditMessageId} broadcast_edit_message_title={this.state.broadcastEditMessageTitle} broadcast_edit_message_priority={this.state.broadcastEditMessagePriority} callToggle={this.callToggle} />}
                        </div>

                        <div>
                            {/*this.state.isShow ? <Greeting greeting={greeting} /> : null*/}
                        </div>

                    </div>
                    
                    <div className="container wrapper main">
                    { 
                        this.state.showCreateForm ? null : 
                        <BroadcastMessageTable
                        url_delete_member={this.props.url_delete_member}
                        broadcasts={filteredBroadcastMessages}
                        changeAppMode={this.props.changeAppMode}
                        onDeleteMember={this.onDeleteMember}
                        onEditMessage={this.onEditMessage}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}/>
                    }
                    </div>
                </div>
            </div>

           {/*
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
           */}
           <Footer />
          </React.Fragment>
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

const ButtonCreateMessage = ({ onClick, btnText }) => (
    <button onClick={onClick} type="button" className="btn btn-sm btn-default" id="btn-message-toggle">
        { btnText }
    </button>
);


export default ReadBroadcastMessageComponent;
