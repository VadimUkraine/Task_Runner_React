import React, { Component } from 'react';
import './Login.css';


class Login extends Component {
	constructor(){
		super();

		this.state = {
			login: '',
			password: '',
			error: '',
			success: false,
		};	

		this.changeField = this.changeField.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.loginAdmin = this.loginAdmin.bind(this);

	}

	handleSubmit(event){
	    event.preventDefault();
	};

	changeField(event){
	    this.setState({ [event.target.name]: event.target.value});
	}

	loginAdmin() {

		const name = this.state.login;
	    const password = this.state.password;
	    if (name !== 'admin' || password !== '123') {
	      this.setState({
	          error: 'There maybe mistake in username or password, please check'
	        });
	    }else{
	      this.setState({
		        login: '',
				password: '',
				error: '',
				success: true
		    }); 
		  this.props.closeFormAdmin(); 
	    } 
	
	  		  
  }


  render() {

    return (
        <div className="login_wrap">
      		<form className="form_login" onSubmit={this.handleSubmit}>
						<input 
								id="adminLogin"
								type="text"
								placeholder="Login"
								name="login"
								value ={this.state.login}
								title="No less then 6 letters"
								onChange={this.changeField}
								/>
						<input 
								id="adminPassword"
								type="password"
								placeholder="Password"
								name="password"
								value ={this.state.password}
								title="No less then 3 letters"
								onChange={this.changeField}
								/>
						<span>{this.state.error}</span>
						<div className="login_btns">
							<button
								className="btn_confirm"
					            type="button"
					            title="Login as Admin"
					            onClick={this.loginAdmin}
					          >
					            Login as Admin
					        </button>
					        <button
									className="bnt_close"
						            type="button"
						            title="Close popup"
						            onClick={this.props.closeForm}
						          >
						            Close
					        </button>
						</div>	
				</form>       
        </div>
    );
  }
}

export default Login;