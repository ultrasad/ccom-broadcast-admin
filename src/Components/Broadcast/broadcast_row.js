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

        //console.log('Member Row...');
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
        this.props.onDeleteMember(this.props.member.id);
        this.setState({confirmDelete: false});
    }

    render() {
    return (
        <tr>
            <td>{this.props.member.id}</td>
            <td>{this.props.member.username}</td>
            <td>{this.props.member.groups.group_name}</td>
            <td>2019</td>
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
                    <Link to={'/members/id/'+ this.props.member.id}
                        onClick={() => this.props.changeAppMode('readOne', this.props.member.id)}
                        className='btn btn-info btn-sm mr-3'>Info
                    </Link>
                    {/*
                    <Link to={'/members/id/'+this.props.member.id + '/password'}
                        onClick={() => this.props.changeAppMode('changePwd', this.props.member.id, this.props.member.username)}
                        className='btn btn-warning btn-sm mr-3'>PWD
                    </Link>
                    <Link to={'/members/id/' + this.props.member.id + '/edit'}
                        onClick={() => this.props.changeAppMode('update', this.props.member.id)}
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