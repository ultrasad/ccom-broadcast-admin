import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// component that renders a single member row
class BroadcastMessageRow extends Component {
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
             <td><span className="bullet"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor" fillRule="evenodd"><path d="M5 5v14h14V5H5zm0-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fillRule="nonzero"></path><path d="M9.232 8.306l-2.93 2.954a1.056 1.056 0 0 0 0 1.478l2.93 2.956a1.034 1.034 0 0 0 1.465 0 1.05 1.05 0 0 0 0-1.478L8.5 11.999l2.197-2.217a1.048 1.048 0 0 0 0-1.476A1.024 1.024 0 0 0 9.965 8c-.267 0-.53.101-.733.306zm4.072-.001a1.05 1.05 0 0 0 0 1.478L15.5 12l-2.196 2.217a1.05 1.05 0 0 0 0 1.477c.404.408 1.06.408 1.464 0l2.93-2.955a1.054 1.054 0 0 0 0-1.478l-2.93-2.956a1.031 1.031 0 0 0-1.464 0z"></path></g></svg></span>
            {this.props.broadcast_msg.message}
            </td>
            <td>{this.props.broadcast_msg.priority}</td>
            <td>2019-04-18</td>
            <td>
            {
                this.state.confirmDelete ?
                <span>
                    <a href="javascript: void(0);" value="" onClick={this.onDelete}
                        className='btn btn-sm btn-danger mr-3'>Confirm</a>
                    <a href="javascript: void(0);" onClick={this.onCancel}
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
                    <Link to={'/broadcast/id/'+ this.props.broadcast_msg.id}
                        onClick={() => this.props.changeAppMode('readOne', this.props.broadcast_msg.id)}
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

export default BroadcastMessageRow;