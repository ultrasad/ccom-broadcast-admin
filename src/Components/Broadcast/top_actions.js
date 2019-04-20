import React, { Component } from 'react';
//import {Link} from 'react-router-dom';

// component that contains the functionalities that appear on top of
// the products table: create product
class TopActionsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: this.props.searchInput,
            textHeaderAction: this.props.textHeaderAction,
            buttonAction: this.props.ButtonAction,
            isShow: false,
        }

        console.log('search input => ' + this.state.searchInput);
    }

    toggleShow = () => {
        console.log('toggle show >>>');
        this.setState(state => ({ isShow: !state.isShow }));
    };

    render(){

        //if(this.props.searchInput !== null){
            //console.log('search not null => ', this.props.searchInput);
        //}

        const searchInput = this.props.searchInput;
        const textHeaderAction = this.props.textHeaderAction;
        const buttonAction = this.props.buttonAction;

        const greeting = 'Welcome to React';

        console.log('search input top => ', searchInput, ', textHeaderAction => ' + textHeaderAction + ', buttonAction => ' + buttonAction);

        return (
                <div className="container wrapper header">
                    <div className="col-md-12">
                        <div className="row justify-content-between">
                            <div className="float-left">
                                <h2>
                                    {searchInput ? 'Search results for "'  + searchInput + '"::' : ''}
                                    {textHeaderAction ? <p>{textHeaderAction}</p> : <p>Broadcast by User Groups</p>}
                                </h2>
                            </div>
                            
                            <div className="float-right">
                                <span>
                                    {buttonAction ? buttonAction : ''}

                                    <Greeting greeting={greeting} isShow={this.state.isShow} />

                                    {/*
                                    <Link to={'/members/create'} onClick={() => this.props.changeAppMode('create')} className='btn btn-primary btn-sm'>
                                        Create Member
                                    </Link>&nbsp;&nbsp;
                                    <Link to={'/members/import'} onClick={() => this.props.changeAppMode('import')} className="btn btn-sm btn-success">
                                        Import member
                                    </Link>
                                    */}
                                </span>
                            </div>
                            
                            {/*
                            <div className="pull-right col-md-4">
                                <div className="input-group">
                                    <input type='text' ref='userName' className="form-control input-sm" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-info btn-sm" onClick={() => this.props.onSearchMember(this.refs.userName.value)}>Search</button>
                                    </span>
                                </div>
                            </div>
                            */}
                        </div>
                    </div>
                </div>
        );
    }
}

const Greeting = ({ greeting, isShow }) => isShow ? <h1>{greeting}</h1> : null;

export default TopActionsComponent;