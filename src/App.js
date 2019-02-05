import React, { Component } from 'react';
import './App.css';
import Form from './components/Form/Form';
import ListTasks from './components/ListTasks/ListTasks';
import Login from './components/Login/Login';


class App extends Component {

  constructor(){
    super();

    this.state = {
      loginPopup: false,
      logAdmin: false,
    };  

    this.handleOpenPopup = this.handleOpenPopup.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleClosePopupAdmin = this.handleClosePopupAdmin.bind(this);  
    this.handleLogOut = this.handleLogOut.bind(this);

  }


  handleOpenPopup(){
    this.setState({
        loginPopup: true,
      });
  }

  handleClosePopup (){
    this.setState({
        loginPopup: false,
    });
  };

   handleClosePopupAdmin(){
    this.setState({
        loginPopup: false,
        logAdmin: true
    });
  };


  handleLogOut(){
    this.setState({
        logAdmin: false
    });
  }



  render() {
    return (
      <div className="App">
      	<h1 className="title">Tasks Runner</h1>
        <p className="admin_log_form">
          {this.state.logAdmin ? null : <span className="admin_log_form_item" title="Login" onClick={this.handleOpenPopup}>Login</span>}
          <span className="admin_log_form_item" title="Logout" onClick={this.handleLogOut}>Logout</span>
        </p>
        {this.state.loginPopup && <Login closeFormAdmin={this.handleClosePopupAdmin} closeForm={this.handleClosePopup}/>}
        <Form/>
        <ListTasks logAdmin = {this.state.logAdmin}/>        
      </div>
    );
  }
}

export default App;