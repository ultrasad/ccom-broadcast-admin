import React, { Component } from 'react';
//import {Link} from 'react-router-dom';

import * as moment from 'moment';

// component that renders a single member row
class BroadcastMessageRow extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            confirmDelete: false,
            onActive: false,
            
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);

        //console.log('editMode, msg id => ' + this.props.editMode);
        //console.log('Broadcast Row...');
    }

    onConfirm(){
        //console.log('confirm delete...');
        this.setState({confirmDelete: true});
    }

    onCancel(e){
        //console.log('cancel delete...');
        e.preventDefault();
        this.setState({confirmDelete: false});
    }

    onDelete(e){
        e.preventDefault();
        this.props.onDeleteMember(this.props.broadcast.id);
        this.setState({confirmDelete: false});
    }

    onActive = (e, status) => {
        e.preventDefault();
        console.log('status => ' + status);
    }

    onEditMessage = (e, msg_id, msg_title, msg_priority) => {
        console.log('on edit row...');
        e.preventDefault();
        this.props.onEditMessage(msg_id, msg_title, msg_priority);
    }

    render() {
    //let now = moment().format('LLLL');
    return (
        <tr>
            <td><span className="bullet">

            <svg className="volume" version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
            <title></title>
            <g id="icomoon-ignore">
            </g>
            <path d="M359.765 415.765c-6.143 0-12.283-2.343-16.971-7.028-9.372-9.372-9.372-24.568 0-33.941 65.503-65.503 65.503-172.085 0-237.588-9.372-9.373-9.372-24.569 0-33.941 9.372-9.371 24.569-9.372 33.941 0 40.797 40.795 63.265 95.037 63.265 152.733s-22.468 111.938-63.265 152.735c-4.686 4.687-10.828 7.030-16.97 7.030v0zM274.51 370.51c-6.143 0-12.283-2.343-16.971-7.029-9.373-9.373-9.373-24.567 0-33.94 40.55-40.55 40.55-106.529 0-147.078-9.373-9.373-9.373-24.569 0-33.941s24.568-9.372 33.941 0c59.265 59.265 59.265 155.696 0 214.961-4.686 4.684-10.828 7.027-16.97 7.027z"></path>
            <path d="M208.003 480c-4.164 0-8.256-1.625-11.317-4.687l-123.313-123.313h-57.373c-8.836 0-16-7.163-16-16v-160c0-8.836 7.164-16 16-16h57.373l123.313-123.314c4.577-4.577 11.458-5.945 17.437-3.468s9.877 8.311 9.877 14.782v416c0 6.472-3.898 12.306-9.877 14.782-1.979 0.82-4.059 1.218-6.12 1.218z"></path>
            </svg>
            </span>
            {this.props.broadcast_msg.message}
            </td>
            <td><span className={'badge badge-' + this.props.broadcast_msg.priority}>{this.props.broadcast_msg.priority}</span></td>
            <td>{moment(this.props.broadcast_msg.created).format('YYYY-MM-DD HH:mm')}</td>
            <td>{this.props.broadcast_msg.created_by}</td>
            <td>
                {this.props.broadcast_msg.active}
                {/*
                this.props.broadcast_msg.active === 'Y' ?
                <div className="btn-group btn-toggle">
                    <button className="btn btn-sm btn-default-toggle btn-small btn-primary active">Yes</button>
                    <button className="btn btn-sm btn-default-toggle btn-small">No</button>
                </div>
                :
                <div className="btn-group btn-toggle">
                    <button className="btn btn-sm btn-default-toggle btn-small">Yes</button>
                    <button className="btn btn-sm btn-default-toggle btn-small btn-primary active">No</button>
                </div>
                */}
            </td>
            <td>
            {
                <a href="#edit" onClick={(e) => this.onEditMessage(e, this.props.broadcast_msg.id, this.props.broadcast_msg.message, this.props.broadcast_msg.priority)}
                   className='btn btn-sm btn-small btn-info'>แก้ไขข้อความ</a>
            }
            </td>
        </tr>
        );
    }
}

export default BroadcastMessageRow;