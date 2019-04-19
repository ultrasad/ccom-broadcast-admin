import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';

import ReadBroadcastComponent from './Components/Broadcast/read_broadcasts';
import ReadOneBroadcastComponent from './Components/Broadcast/read_one_broadcast';
/*
import CreateMemberComponent from './Components/Broadcast/create_member';
import ImportMemberComponent from './Components/Broadcast/import_member'
import UpdateMemberComponent from './Components/Broadcast/update_member';
import DeleteMemberComponent from './Components/Broadcast/delete_member';
import ChangePasswordComponent from './Components/Broadcast/change_password';
*/

class Broadcast extends Component {
  
      // initial mode is 'read' mode
      constructor(props){
          super(props);
          this.state = {
              //pageId: props.match.params.pageId,
              params: props.match.params,
              currentMode: 'read',
              broadcastId: null,
              memberName: null,
              broadcast_url: this.props.broadcast_url,
              broadcastGroupname: '',
              /*
              url_all_member: this.props.base_url + '/membermanagement/all_member/true',
              url_member_group: this.props.base_url + '/membermanagement/member_group',
              url_create_member: this.props.base_url + '/membermanagement/create_member',
              url_read_one_member: this.props.base_url + '/membermanagement/read_member',
              url_update_member: this.props.base_url + '/membermanagement/update_member',
              url_delete_member: this.props.base_url + '/membermanagement/delete_member',
              url_import_member: this.props.base_url + '/membermanagement/import_member',
              url_change_password: this.props.base_url + '/membermanagement/change_password',
              url_search_member: this.props.base_url + '/membermanagement/search_member',
              url_login_member: this.props.base_url + '/membermanagement/login_member'
              */
          }

          this.changeAppMode = this.changeAppMode.bind(this);
          this.onRender = this.onRender.bind(this);

          console.log('member base_url => ' + this.props.base_url + ', url boardcast => ' + this.props.broadcast_url);
      }

      componentWillMount() {

          if(this.state.params.userId !== undefined){
            //console.log('user id ==> ' + this.state.params.userId);
            this.setState({broadcastId: this.state.params.userId, currentMode: 'readOne'},function afterStateChange(){
                //console.log('state change => ', this.state);
            });
          }

          console.log('this.props.userName => ' + this.props.userName);
      }
      
      // used when use clicks something that changes the current mode
      changeAppMode(newMode, broadcastId, broadcastGroupname){
        console.log('Change mode broadcast => ' + newMode + ' => ' + broadcastId + ' => ' + broadcastGroupname);

        this.setState({currentMode: newMode});
        if(broadcastId !== undefined){
            this.setState({broadcastId: broadcastId});
        }

        if(broadcastGroupname !== undefined){
            this.setState({broadcastGroupname: broadcastGroupname});
        }
        
        //this.onRender();
      }

      onRender(){
        //var modeComponent = <ReadBroadcastComponent params={this.state.params} usrMember={this.props.usr.name} changeName={this.props.changeName} url_all_member={this.state.url_all_member} url_delete_member={this.state.url_delete_member} url_search_member={this.state.url_search_member} changeAppMode={this.changeAppMode} />;
        var modeComponent = <ReadBroadcastComponent params={this.state.params} usrMember={this.props.usr.name} changeName={this.props.changeName} url_all_member={this.state.url_all_member} broadcast_url={this.state.broadcast_url} url_delete_member={this.state.url_delete_member} url_search_member={this.state.url_search_member} changeAppMode={this.changeAppMode} />;
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneBroadcastComponent url_one_member={this.state.url_read_one_member} broadcast_url={this.state.broadcast_url} broadcastId={this.state.broadcastId} changeAppMode={this.changeAppMode} broadcastGroupname={this.state.broadcastGroupname} />;
                break;
            /*
            case 'create':
                //console.log('Create member...');
                modeComponent = <CreateMemberComponent url_create_member={this.state.url_create_member} url_member_group={this.state.url_member_group} changeAppMode={this.changeAppMode}/>;
                break;
            case 'import':
                //console.log('Import member...');
                modeComponent = <ImportMemberComponent url_import_member={this.state.url_import_member} changeAppMode={this.changeAppMode}/>;
                break;
          case 'changePwd':
                //console.log('Change password...');
                modeComponent = <ChangePasswordComponent url_change_password={this.state.url_change_password} memberName={this.state.memberName} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdateMemberComponent url_one_member={this.state.url_read_one_member} url_member_group={this.state.url_member_group} url_update_member={this.state.url_update_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeleteMemberComponent url_delete_member={this.state.url_delete_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
            */
            default:
                break;
        }

        //return PrimaryLayout;
        return modeComponent;
      }
  
      // render the component based on current or selected mode
      render(){

        //return this.onRender();
        return (
                <div>
                    <Switch>
                        {/*
                        <Route exact path="/broadcast/id/:memberId/password" render={({ match }) => (
                            <ChangePasswordComponent url_one_member={this.state.url_read_one_member} url_change_password={this.state.url_change_password} memberName={this.state.memberName} memberId={match.params.memberId} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route exact path="/broadcast/id/:memberId/edit" render={({ match }) => (
                            <UpdateMemberComponent url_one_member={this.state.url_read_one_member} url_member_group={this.state.url_member_group} url_update_member={this.state.url_update_member} memberId={match.params.memberId} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route path="/broadcast/create" render={({ match }) => (
                            <CreateMemberComponent url_create_member={this.state.url_create_member} url_member_group={this.state.url_member_group} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route path="/broadcast/import" render={({ match }) => (
                            <ImportMemberComponent url_import_member={this.state.url_import_member} changeAppMode={this.changeAppMode}/>
                        )}/>
                        */}
                        <Route path="/broadcast/id/:broadcastId" render={({ match }) => (
                            <ReadOneBroadcastComponent url_one_member={this.state.url_read_one_member} broadcast_url={this.state.broadcast_url} broadcastId={match.params.broadcastId} changeAppMode={this.changeAppMode} broadcastGroupname={this.state.broadcastGroupname} />
                        )}/>
                        <Route exact path={this.props.match.url} render={({ match }) => (
                            <ReadBroadcastComponent params={this.state.params} usrMember={this.props.usr.name} changeName={this.props.changeName} url_all_member={this.state.url_all_member} broadcast_url={this.state.broadcast_url} url_delete_member={this.state.url_delete_member} url_search_member={this.state.url_search_member} changeAppMode={this.changeAppMode} />
                        )}/>
                        
                        {/*
                            <Route path="/broadcast/id/:memberId/password" component={ChangePasswordComponent}/>
                            <Route path="/broadcast/id/:memberId/edit" component={UpdateMemberComponent}/>
                        */}
                        
                        <Redirect to={'/notfound'} />
                    </Switch>
                </div>
        );
      }
}

//change state to properties
const mapStateToProps = (state) => {
    return {
        emp: state.emp, //employeeReducer
        usr: state.usr //userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeName:(name) => {
            dispatch({
                type:"setName",
                value: name
            });
        }
    }
}

//export default Broadcast;
export default connect(mapStateToProps, mapDispatchToProps)(Broadcast);