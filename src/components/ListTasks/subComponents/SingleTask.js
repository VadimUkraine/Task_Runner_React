import React, { Component } from 'react';
import './SingleTask.css';


class SingleTask extends Component {

	render() {
		const {
			id,
            username,
            email,
            text,
            status,
 			logAdmin
          } = this.props;

		return (			
			<p className="task_wrap">
				<span className="task_item_name">{username}</span>
				<span className="task_item_email">{email}</span>						
				<span className="task_item_task">{text}</span>				
				<input
					className="task_checkbox"
				    name="isGoing"
				    type="checkbox"
				    checked={status === 10 ? true : false}
				    readOnly
				    />				
				{logAdmin && <button id={id} className="btn_edit" type="button" onClick={this.props.openEditForm}>Edit</button>}
			</p>
					
	       
		);
	}
}


export default  SingleTask;
