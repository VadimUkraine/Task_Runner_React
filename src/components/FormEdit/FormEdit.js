import React, { Component } from 'react';
import './FormEdit.css';
import { connect } from 'react-redux';
import axios from 'axios';
import md5 from 'js-md5';




class FormEdit extends Component {

	constructor(){
		super();

		this.state = {
			text: '',
			isStatus: ''
		};	

		this.changeField = this.changeField.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.editTask = this.editTask.bind(this);

	}

	handleSubmit(event){
	    event.preventDefault();
	};

	changeField(event){
	    this.setState({ [event.target.name]: event.target.value});
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.checked;
	    const name = target.name;

	    this.setState({
		    [name]: value
		});
    
	}

	componentDidMount() {
		this.setState({
			text:  this.props.taskText,
			isStatus: this.props.taskStatus,
		})
		
	}

	editTask(){

		let token = encodeURIComponent('beejee');
		let text = encodeURIComponent(this.state.text);
		let status ='';
		if(this.state.isStatus === true){
			status = encodeURIComponent(10);
		}else{
			status = encodeURIComponent(0)};

		let id = this.props.taskEdit;

		let partRow = 'status=' + status + '&text='+ text + '&token='+token;

		const signature = md5.hex(partRow);

		let form = new FormData();
			form.append("status", status);
			form.append("text", text);
			form.append("token", token);
	        form.append("signature", signature);


		axios({
	    	method: "POST",
	    	url: 'https://uxcandy.com/~shapoval/test-task-backend/edit/' + id + '?developer=Vadim',
	    	data: form,
	    	crossDomain: true,
	    	mimeType: "multipart/form-data",
            contentType: false, 
            processData: false, 
            dataType: "json",
	    })
	      .then((response) => {
	        if(response.data.status === 'ok'){
	        	this.props.updateCurrentPage();
	        	this.props.closeEditForm();
	        }
	      })
	      .catch((error) => {
	        console.log(error);
	      });

	}



	render() {		

		return (
			<div className="form_edit_wrap">
				<form className="form_edit" onSubmit={this.handleSubmit}>
						<input 
								id="edit_userText"
								type="text"
								placeholder="Text"
								name="text"
								value ={this.state.text}
								title="Edit text here"
								onChange={this.changeField}
								/>
						<input
								className="task_checkbox"
							    name="isStatus"
							    type="checkbox"
							    checked={this.state.isStatus}				
							    onChange={this.handleInputChange}/>
							  
						
						<button
								className="edit_confirm"
					            type="button"
					            title="Edit a Task"
					            onClick={this.editTask}
					          >
					            Edit
				        </button>
				        <button
								className="close_edit"
					            type="button"
					            title="Close button"
					            onClick={this.props.closeEditForm}
					          >
					            Close
				        </button>
				</form> 
			</div>        
		);
	}
}



const mapStateToProps = (state) => ({
	tasks: state.messages
});


export default connect(
	mapStateToProps, null
)(FormEdit);


