import React, { Component } from 'react';
import BroadcastMessageRow from './broadcast_message_row';
//import {Link} from 'react-router-dom';
//import $ from 'jquery';

// component for the whole members table
class BroadcastMessageTable extends Component {
    render() {
        if(this.props.broadcasts){
            var rows = this.props.broadcasts
            .map(function(broadcast, i) {
                return (
                    <BroadcastMessageRow
                        url_delete_member={this.props.url_delete_member}
                        key={i}
                        broadcast_msg={broadcast}
                        changeAppMode={this.props.changeAppMode}
                        onDeleteMember={this.props.onDeleteMember} />
                );
            }.bind(this));
            
            return(
                !rows.length
                    ? <div className='alert alert-member-found'>No Message found.</div>
                    :
                    <div className="member-list">
                        <table className='table table-member'>
                            <thead>
                                <tr>
                                    <th width="40%">Message</th>
                                    <th>Priority</th>
                                    <th>Created By</th>
                                    <th width="15%">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        <div className="pagination pagination-member d-flex justify-content-between mb-2 mt-0">
                            {/*
                            <div><Link style={{display: this.props.memberCurrentPage <= 1?'none':'block'}} className="prev" to={this.props.memberPrevPage} onClick={() => this.props.prevPage()}>‹ <span className="visually-hidden">Prev</span></Link></div>
                            <div><span className="hiddenx info">- {this.props.memberResults} -</span></div>
                            <div><Link style={{display: this.props.showNextpage !== true?'none':'block'}} className="next" to={this.props.memberNextPage} onClick={() => this.props.nextPage()}><span className="visually-hidden">Next</span> ›</Link></div>
                            */}
                        </div>
                    </div>
        
            );
        } else {
            return <div className="row"><div className="col-md-12"><div className='alert alert-info loading'>Loading...</div></div></div>
        } 
    }
}

export default BroadcastMessageTable;