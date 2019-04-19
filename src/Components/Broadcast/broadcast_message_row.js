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

    render() {
    return (
        <tr>
            <td><span className="bullet">
            <svg className="bullhorn" version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
            <title></title>
            <g id="icomoon-ignore">
            </g>
            <path d="M512 214.628c0-100.463-29.396-181.969-65.741-182.613 0.146-0.003 0.289-0.015 0.436-0.015h-41.471c0 0-97.4 73.168-237.615 101.877-4.28 22.646-7.015 49.637-7.015 80.751s2.733 58.104 7.015 80.75c140.214 28.709 237.615 101.878 237.615 101.878h41.471c-0.146 0-0.289-0.012-0.436-0.016 36.348-0.644 65.741-82.149 65.741-182.612zM432.412 369.626c-4.691 0-9.766-4.871-12.373-7.774-6.315-7.032-12.396-17.98-17.594-31.664-11.628-30.616-18.033-71.655-18.033-115.562 0-43.905 6.405-84.945 18.033-115.561 5.197-13.684 11.281-24.633 17.594-31.664 2.607-2.906 7.682-7.776 12.373-7.776s9.768 4.872 12.372 7.776c6.317 7.032 12.398 17.979 17.594 31.664 11.629 30.615 18.034 71.656 18.034 115.561 0 43.902-6.405 84.944-18.034 115.562-5.195 13.684-11.281 24.632-17.594 31.664-2.604 2.903-7.68 7.774-12.372 7.774zM125.906 214.628c0-25.975 1.905-51.215 5.526-74.547-23.686 3.277-44.471 5.162-70.17 5.162-33.529 0-33.529 0-33.529 0l-27.733 47.343v44.085l27.73 47.343c0 0 0 0 33.53 0 25.699 0 46.484 1.887 70.17 5.162-3.618-23.332-5.524-48.573-5.524-74.548zM184.075 321.086l-63.999-12.255 40.921 160.772c2.118 8.317 10.372 12.519 18.343 9.327l59.278-23.726c7.972-3.188 11.164-11.982 7.098-19.542l-61.641-114.576zM432.412 274.365c-1.809 0-3.764-1.877-4.769-2.996-2.435-2.71-4.778-6.93-6.781-12.204-4.481-11.8-6.95-27.617-6.95-44.539s2.469-32.739 6.95-44.539c2.003-5.274 4.348-9.494 6.781-12.204 1.005-1.12 2.96-2.997 4.769-2.997 1.808 0 3.765 1.878 4.769 2.997 2.435 2.71 4.778 6.929 6.78 12.204 4.482 11.799 6.951 27.617 6.951 44.539 0 16.921-2.469 32.739-6.951 44.539-2.002 5.274-4.348 9.494-6.78 12.204-1.004 1.119-2.96 2.996-4.769 2.996z"></path>
            </svg>
            </span>
            {this.props.broadcast_msg.message}
            </td>
            <td>{this.props.broadcast_msg.priority}</td>
            <td>Super99</td>
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

                    Active
                    
                    {/*
                    <Link to={'#active'}
                        onClick={e => e.preventDefault()}
                        className='btn btn-info btn-default btn-sm mr-3 disabled-link'>Active
                    </Link>
                    */}

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