import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';

import ReadMembersComponent from './Components/Members/read_members';
import ReadOneMemberComponent from './Components/Members/read_one_member';
import CreateMemberComponent from './Components/Members/create_member';
import ImportMemberComponent from './Components/Members/import_member'
import UpdateMemberComponent from './Components/Members/update_member';
import DeleteMemberComponent from './Components/Members/delete_member';
import ChangePasswordComponent from './Components/Members/change_password';

class Members extends Component {
  
      // initial mode is 'read' mode
      constructor(props){
          super(props);
          this.state = {
              //pageId: props.match.params.pageId,
              params: props.match.params,
              currentMode: 'read',
              memberId: null,
              memberName: null,
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
          }

          this.changeAppMode = this.changeAppMode.bind(this);
          this.onRender = this.onRender.bind(this);

          console.log('member base_url => ' + this.props.base_url);
      }

      componentWillMount() {

          if(this.state.params.userId !== undefined){
            //console.log('user id ==> ' + this.state.params.userId);
            this.setState({memberId: this.state.params.userId, currentMode: 'readOne'},function afterStateChange(){
                //console.log('state change => ', this.state);
            });
          }

          console.log('this.props.userName => ' + this.props.userName);
      }
      
      // used when use clicks something that changes the current mode
      changeAppMode(newMode, memberId, memberName){
        //console.log('Change mode => ' + newMode + ' => ' + memberId + ' => ' + memberName);

        this.setState({currentMode: newMode});
        if(memberId !== undefined){
            this.setState({memberId: memberId});
        }

        if(memberName !== undefined){
        this.setState({memberName: memberName});
        }
        
        //this.onRender();
      }

      onRender(){
        var modeComponent = <ReadMembersComponent params={this.state.params} usrMember={this.props.usr.name} changeName={this.props.changeName} url_all_member={this.state.url_all_member} url_delete_member={this.state.url_delete_member} url_search_member={this.state.url_search_member} changeAppMode={this.changeAppMode} />;
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'readOne':
                modeComponent = <ReadOneMemberComponent url_one_member={this.state.url_read_one_member} memberId={this.state.memberId} changeAppMode={this.changeAppMode}/>;
                break;
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
                        <Route exact path="/members/id/:memberId/password" render={({ match }) => (
                            <ChangePasswordComponent url_one_member={this.state.url_read_one_member} url_change_password={this.state.url_change_password} memberName={this.state.memberName} memberId={match.params.memberId} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route exact path="/members/id/:memberId/edit" render={({ match }) => (
                            <UpdateMemberComponent url_one_member={this.state.url_read_one_member} url_member_group={this.state.url_member_group} url_update_member={this.state.url_update_member} memberId={match.params.memberId} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route path="/members/id/:memberId" render={({ match }) => (
                            <ReadOneMemberComponent url_one_member={this.state.url_read_one_member} memberId={match.params.memberId} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route path="/members/create" render={({ match }) => (
                            <CreateMemberComponent url_create_member={this.state.url_create_member} url_member_group={this.state.url_member_group} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route path="/members/import" render={({ match }) => (
                            <ImportMemberComponent url_import_member={this.state.url_import_member} changeAppMode={this.changeAppMode}/>
                        )}/>
                        <Route exact path={this.props.match.url} render={({ match }) => (
                            <ReadMembersComponent params={this.state.params} usrMember={this.props.usr.name} changeName={this.props.changeName} url_all_member={this.state.url_all_member} url_delete_member={this.state.url_delete_member} url_search_member={this.state.url_search_member} changeAppMode={this.changeAppMode} />
                        )}/>
                        
                        <Route path="/members/id/:memberId/password" component={ChangePasswordComponent}/>
                        <Route path="/members/id/:memberId/edit" component={UpdateMemberComponent}/>
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

//export default Members;
export default connect(mapStateToProps, mapDispatchToProps)(Members);