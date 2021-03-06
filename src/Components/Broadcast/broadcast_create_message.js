import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

import $ from 'jquery';

// component that create member
class BroadcastCreateMessage extends Component {
    // initial component states will be here
    // initialize values
    constructor(props) {
        super(props);
        this.state = {
            //username: 'Super99',
            username: localStorage.getItem('userData'),
            //message: '',
            messageId: this.props.broadcast_edit_message_id,
            message: this.props.broadcast_edit_message_title,
            description: '',
            startdate: '',
            starttime: '',
            enddate: '',
            endtime: '',
            //priority: '',
            priority: this.props.broadcast_edit_message_priority,
            //created: '2019-04-21',
            created: null,
            //created_by: 'Super99',
            created_by: localStorage.getItem('userData'),
            updated_by: '',
            deleted_by: '',
            //last_modified: '',
            active: 'Y',
            groups: [],
            broadcast_group_id: '',
            selectedGroupId: this.props.broadcast_edit_message_priority,
            submitStatus: null,
            fields: {},
            errors: 'Unable to save member. Please try again.',
        }

        console.log('Create message broadcast url => ' + this.props.broadcast_url);

        console.log('create message, editMode => ' + this.props.broadcast_edit_mode + ', msg id => ' + this.props.broadcast_edit_message_id + ', msg title => ' + this.props.broadcast_edit_message_title + ', msg priority => ' + this.props.broadcast_edit_message_priority);

        // This line is important!
        this.onCreateMessage = this.onCreateMessage.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);

        this.getAuthenticationUser = this.getAuthenticationUser.bind(this);

        /*
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSalesEmployeeChange = this.onSalesEmployeeChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        */
    }

    // on mount, get all categories and store them in this component's state
    componentDidMount() {
        
        /*
        this.serverRequest = $.get(this.props.url_member_group, function (data) {
            this.setState({
                groups: JSON.parse(data).groups
            });
        }.bind(this));
        */

       this._ismounted = true;
        $('.page-header h2').text('Create Message');
    }

    componentWillUnmount() {
        //this.serverRequest.abort();
        console.log('unmount create message..');
        this._ismounted = false;
        if(this.serverCreateMessage){
            console.log('unmount create message abort..');
            this.serverCreateMessage.abort();
        }
    }

    toLower(str){
        str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        return str;
    }

    // handle form field changes here
    onMessageChange(e){
        //console.log('first name => ' + e.target.value);
        //var message = this.toLower(e.target.value);
        var message = e.target.value;
        this.setState({message: message});
    }

    // handle username change
    onUserNameChange(e){
        //console.log('username => ' + e.target.value);
        //let username = e.target.value;
        var username = this.toLower(e.target.value);
        //console.log('user name =>' + username);

        this.setState({username: username});
        this.setState({email: username+'@rs.co.th'});
    }

    onFirstNameChange(e){
        //console.log('first name => ' + e.target.value);
        var first_name = this.toLower(e.target.value);
        this.setState({first_name: first_name});
    }

    onLastNameChange(e){
        //console.log('last name => ' + e.target.value);
        var last_name = this.toLower(e.target.value);
        this.setState({last_name: last_name});
    }
    
    onEmailChange(e){
        var email = e.target.value;
        if(email !== ''){
            this.setState({email: email});
        } else {
            this.setState({email: this.state.username+'@rs.co.th'});
        }
    }
    
    onSalesEmployeeChange(e){
        var sales_emplayee = e.target.value;
        this.setState({sales_employee: sales_emplayee});
    }
    
    // handle group change
    onGroupChange(e){
        console.log('group => ' + e.target.value);
        this.setState({selectedGroupId: e.target.value});
    }

    getAuthenticationUser(){
        //console.log('localStorage userData => ' + localStorage.getItem('userData'));
        if(localStorage.getItem('userData') === null){
            return false;
        } else {
            return JSON.parse(localStorage.getItem('userData')).userName;
        }
    }
    
    // handle save button clicked
    onCreateMessage(e){

        //alert('A name was submitted: ' + this.state.username);
        e.preventDefault();

        let userLogin = this.getAuthenticationUser();
        console.log('userLogin get auth => ' + userLogin);
        if(!userLogin){
          //redirect to login
        }
        
        // data in the form
        var form_data = {
            username: userLogin,
            message: this.state.message,
            /*
            email: this.state.email,
            sales_employee: this.state.sales_employee,
            phone: this.state.phone,
            company: this.state.company,
            active: this.state.active,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            */
            broadcastGroupId: this.props.broadcast_group_id,
            priority: this.state.selectedGroupId,
            selectedGroupId: this.state.selectedGroupId
        };

        console.log('selected group change => ' + this.state.selectedGroupId);
        
        let action_message = 'create_message';
        if(this.state.messageId !== ''){
            action_message = 'update_message/' + this.state.messageId;
        }
        //console.log('form data =>' + JSON.stringify(form_data));
        
        // submit form data to api
        this.serverCreateMessage = $.ajax({
            url: this.props.broadcast_url + '/broadcast/' + action_message,
            type : "POST",
            dataType: 'json',
            contentType : 'application/json',
            //crossDomain:true,
            //crossOrigin: false,
            //headers : {
                //'Content-Type' : 'multipart/form-data; charset=UTF-8'
            // },
            data : JSON.stringify(form_data),
            //data: form_data,
            success : function(response){
        
                // api message
                console.log('response status', response['status']);

                if(response['status'] === 'error'){
                    this.setState({'errors': response['message']});
                    this.setState({submitStatus: 'Error'});
                    return false;
                } else {
                    // empty form
                    /*
                    this.setState({username: ""});
                    this.setState({email: ""});
                    this.setState({sales_employee: ""});
                    this.setState({new_password: response['password']});
                    this.setState({first_name: ""});
                    this.setState({last_name: ""});
                    this.setState({selectedGroupId: ""});
                    */

                    this.setState({message: ''});
                    this.setState({selectedGroupId: ''});

                    console.log('toggle show box...');
                    this.serverCreateMessage.abort();

                    //this.props.btnMessageToggle.click();

                    //this.props.callToggle();
                    //this.props.toggleShow();
                    //this.props.callToggle();
                    
                    // api message
                    this.setState({submitStatus: 'Message was created.'});

                    this.props.callToggle();
                }
                
                //load list page
                //this.props.changeAppMode('read');
        
            }.bind(this),
            error: function(xhr, resp, text){
                // show error to console
                console.log(xhr, resp, text);
                
                // api message
                this.setState({submitStatus: 'Error', errors: 'Unable to create message.'});
            }.bind(this)
        });
        
        //e.preventDefault();
    }
        
    // render component here
    render() {
        
        // make groups as option for the select tag.
        /*
        var groupsOptions = this.state.groups.map(function(group){
            return (
                <option key={group.id} value={group.id}>{group.description}</option>
            );
        });
        */

       const  optionsData = [
            { value: 'danger', name: 'ด่วนมาก' },
            { value: 'warning', name: 'ปานกลาง' },
            { value: 'info', name: 'ทั่วไป' } 
        ];

        let prioritiesOptions = optionsData.map(function(e, key){
            return (
                <option key={key} value={e.value}>{e.name}</option>
            );
        });
    
        /*
        - tell the user if a member was created
        - tell the user if unable to create member
        - button to go back to members list
        - form to create a member
        */
        return (
            <div>
                <div className="container wrapper main create-box-message">
                    <div className="col-md-12">
                        {
                
                            this.state.submitStatus === "Member was created." ?
                                <div className='alert alert-success'>
                                    Member was saved.
                                    <p>Password: {this.state.new_password}</p>
                                </div>
                            : null
                        }
                
                        {
                
                            this.state.submitStatus === "Error" ?
                                <div className='alert alert-danger'>
                                    {this.state.errors}
                                </div>
                            : null
                        }
                        
                        {/*
                        <p>
                            <Link to={'/members'}
                                onClick={() => this.props.changeAppMode('read')}
                                className='btn btn-primary btn-sm margin-bottom-1em'>Members List
                            </Link>
                        </p>
                        */}
                
                        <form onSubmit={this.onCreateMessage}>
                            <table className='table table-member'>
                            <tbody>
                                <tr>
                                    <td>Message</td>
                                    <td>
                                        <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        value={this.state.message}
                                        required
                                        onChange={this.onMessageChange} />
                                    </td>
                                </tr>
                                
                                {/*
                                <tr>
                                    <td>FirstName</td>
                                    <td>
                                        <input
                                        type='text'
                                        className='form-control form-control-sm'
                                        value={this.state.first_name}
                                        required
                                        onChange={this.onFirstNameChange} />
                                    </td>
                                </tr>
                                */}
                
                                <tr>
                                    <td>Priority</td>
                                    <td>
                                        <select
                                        onChange={this.onGroupChange}
                                        className='form-control form-control-sm'
                                        value={this.state.selectedGroupId}
                                        required>
                                        <option value="">Select Priority...</option>
                                        {prioritiesOptions}
                                        </select>
                                    </td>
                                </tr>
                
                                <tr>
                                    <td></td>
                                    <td>
                                        <button
                                        className='btn btn-info btn-sm'
                                        type='Submit'
                                        onClick={() => this.onCreateMessage}>บันทึก</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default BroadcastCreateMessage;