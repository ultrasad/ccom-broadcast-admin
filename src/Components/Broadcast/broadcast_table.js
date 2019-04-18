import React, { Component } from 'react';
import BroadcastRow from './broadcast_row';
import {Link} from 'react-router-dom';
//import $ from 'jquery';

// component for the whole members table
class MembersTable extends Component {
    render() {
        if(this.props.members){
            var rows = this.props.members
            .map(function(member, i) {
                return (
                    <BroadcastRow
                        url_delete_member={this.props.url_delete_member}
                        key={i}
                        member={member}
                        changeAppMode={this.props.changeAppMode}
                        onDeleteMember={this.props.onDeleteMember} />
                );
            }.bind(this));
            
            return(
                !rows.length
                    ? <div className='alert alert-member-found'>No members found.</div>
                    :
                    <div className="member-list">
                        <table className='table table-member'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>UserName</th>
                                    <th>Group Name</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        <div className="pagination pagination-member d-flex justify-content-between mb-2 mt-0">
                            <div><Link style={{display: this.props.memberCurrentPage <= 1?'none':'block'}} className="prev" to={this.props.memberPrevPage} onClick={() => this.props.prevPage()}>‹ <span className="visually-hidden">Prev</span></Link></div>
                            <div><span className="hiddenx info">- {this.props.memberResults} -</span></div>
                            <div><Link style={{display: this.props.showNextpage !== true?'none':'block'}} className="next" to={this.props.memberNextPage} onClick={() => this.props.nextPage()}><span className="visually-hidden">Next</span> ›</Link></div>
                        </div>
                    </div>
        
            );
        } else {
            return <div className="col-md-12"><div className="row"><div className='alert alert-info'>Loading...</div></div></div>
        } 
    }
}

export default MembersTable;