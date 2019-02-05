import React, { Component } from 'react';
import './Form.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/task';

class Form extends Component {

	constructor(){
		super();

		this.state = {
			username: '',
			email: '',
			text: '',
		};	

		this.changeField = this.changeField.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addTask = this.addTask.bind(this);

	}

	handleSubmit(event){
	    event.preventDefault();
	};

	changeField(event){
	    this.setState({ [event.target.name]: event.target.value});
	}

	addTask() {

    let form = new FormData();
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("text", this.state.text);

 	this.props.addTaskForm(form);

    this.setState({
        username: '',
		email: '',
		text: '',
    });
   
  }


	render() {

		return (
				<form onSubmit={this.handleSubmit}>
						<input 
								id="userName"
								type="text"
								placeholder="Username"
								name="username"
								value ={this.state.username}
								title="No less then 6 letters"
								onChange={this.changeField}
								/>
						<input 
								id="userEmail"
								type="email"
								placeholder="Email"
								name="email"
								value ={this.state.email}
								title="Email must contain @"
								onChange={this.changeField}
								/>
						<input 
								id="userText"
								type="text"
								placeholder="Text"
								name="text"
								value ={this.state.text}
								title="Write a text here"
								onChange={this.changeField}
								/>
						<button
								className="confirm"
					            type="submit"
					            title="Add a Task"
					            onClick={this.addTask}
					          >
					            Add task
				        </button>
				</form>         
		);
	}
}


function mapDispatchToProps(dispatch) {
	return {
		addTaskForm: (form) => dispatch(actions.addTaskList(form))
	};
}

export default connect(
	null,
	mapDispatchToProps
)(Form);

