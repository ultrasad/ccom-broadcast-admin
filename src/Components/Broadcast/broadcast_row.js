import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// component that renders a single member row
class BroadcastRow extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            confirmDelete: false
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);

        //console.log('Broadcast Row...');
    }

    onConfirm(){
        //console.log('confirm delete...');
        this.setState({confirmDelete: true});
    }

    onCancel(){
        //console.log('cancel delete...');
        this.setState({confirmDelete: false});
    }

    onDelete(){
        this.props.onDeleteMember(this.props.broadcast.id);
        this.setState({confirmDelete: false});
    }

    render() {
    return (
        <tr>
             <td><span className="bullet">
            <svg className="hangouts" version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
            <title></title>
            <g id="icomoon-ignore">
            </g>
            <path d="M255.9 0c-122.1 0-221.1 99-221.1 221.1 0 115.7 105.4 209.5 221.1 209.5v81.4c134.3-68.1 221.3-177.8 221.3-290.9 0-122.1-99.2-221.1-221.3-221.1zM224 256c0 26.5-14.3 48-32 48v-48h-64v-96h96v96zM384 256c0 26.5-14.3 48-32 48v-48h-64v-96h96v96z"></path>
            </svg>
            </span>
            {this.props.broadcast.groups.group_name}
            </td>
            <td>{this.props.broadcast.username}</td>
            <td>2019-04-18</td>
            <td>
            {
                this.state.confirmDelete ?
                <span>
                    <a href="#confirm" value="" onClick={this.onDelete}
                        className='btn btn-sm btn-danger mr-3'>Confirm</a>
                    <a href="#cancel" onClick={this.onCancel}
                        className='btn btn-sm btn-primary'>Cancel</a>
                </span>
                :
                <span>
                    {/*
                    <div>
                        <MuiThemeProvider>
                            <HomeIcon style={iconStyles} />
                            <ActionInfoOutline style={iconStyles} color={blue500} />
                        </MuiThemeProvider>
                    </div>
                    */}
                    <Link to={'/broadcast/id/'+ this.props.broadcast.id}
                        onClick={() => this.props.changeAppMode('readMessageGroup', this.props.broadcast.id, this.props.broadcast.groups.group_name)}
                        className='btn btn-info btn-default btn-sm mr-3'>Manage Message
                    </Link>
                    {/*
                    <Link to={'/members/id/'+this.props.broadcast.id + '/password'}
                        onClick={() => this.props.changeAppMode('changePwd', this.props.broadcast.id, this.props.broadcast.username)}
                        className='btn btn-warning btn-sm mr-3'>PWD
                    </Link>
                    <Link to={'/members/id/' + this.props.broadcast.id + '/edit'}
                        onClick={() => this.props.changeAppMode('update', this.props.broadcast.id)}
                        className='btn btn-primary btn-sm mr-3'>Edit
                    </Link>
                    <a href="javascript: void(0);" onClick={this.onConfirm}
                        className='btn btn-danger btn-sm'>Del
                    </a>
                    */}
                    
                </span>
            }
            </td>
        </tr>
        );
    }
}

export default BroadcastRow;