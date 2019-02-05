import React, { Component } from 'react';
import './ListTasks.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/task';
import SingleTask from './subComponents/SingleTask';
import Pagination from "react-js-pagination";
import FormEdit from '../FormEdit/FormEdit';



class ListTask extends Component {

	componentDidMount() {
		this.props.getTasks();
	}

	constructor(){
		super();

		this.state = {
			activePage: 1,
			activeSort:'',
			editPopup: false,
			editTask: '',
        	editText: '',
        	editStatus:'',
		 
		};



		this.sortName = this.sortName.bind(this);
		this.sortEmail = this.sortEmail.bind(this);
		this.sortStatus = this.sortStatus.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleOpenEditForm = this.handleOpenEditForm.bind(this);
		this.handleCloseEditForm = this.handleCloseEditForm.bind(this);
		this.handleUpdateEditForm = this.handleUpdateEditForm.bind(this);

	}



	sortName(){
		this.setState({activeSort: 'username'});
		let status = 'username';
		let page = this.state.activePage;
	    this.props.renderPage(status, page);			
	};

	sortEmail (){
		this.setState({activeSort: 'email'});
		let status = 'email';
		let page = this.state.activePage;
	    this.props.renderPage(status, page);
	};

	sortStatus (){
	 	this.setState({activeSort: 'status'});
		let status = 'status';
		let page = this.state.activePage;
	    this.props.renderPage(status, page);
	};

	handleUpdateEditForm(){
		let status = this.state.activeSort;
		let page = this.state.activePage;
	    this.props.renderPage(status, page)
	}



	handlePageChange(pageNumber) {
	    this.setState({activePage: pageNumber});
	    let status = this.state.activeSort;
		let page = pageNumber;
	    this.props.renderPage(status, page);
   };

    handleOpenEditForm(event){
	     this.setState({
	        editPopup: true,
	        editTask: event.nativeEvent.target.getAttribute("id"),
	        editText: event.nativeEvent.target.previousSibling.previousSibling.textContent,
	        editStatus: event.nativeEvent.target.previousSibling.checked
	    });
  	}

  	 handleCloseEditForm(){
	    this.setState({
	       editPopup: false,
	    });
	 }
	  
	


	render() {
		const countTasks = this.props.tasks.taskCount;
		const tasksRender = Object.values(this.props.tasks.message).map((item) =>(
							<SingleTask
								key={item.id}
								id={item.id}
								username={item.username}
								email={item.email}
								text={item.text}
								status={item.status}
								logAdmin={this.props.logAdmin}
								openEditForm={this.handleOpenEditForm}
							/>					
						));
	
		return (	

			<div>
				<div className="sorting">
					Sort by
					<button
						className="sort_name"
					    type="button"
					    title="Sort by name"
					    onClick={this.sortName}
					    >
					    Name
				     </button>
				     <button
						className="sort_email"
					    type="button"
					    title="Sort by email"
					    onClick={this.sortEmail}
					    >
					    Email
				     </button>
				     <button
						className="sort_status"
					    type="button"
					    title="Sort by status"
					    onClick={this.sortStatus}
					    >
					    Status
				     </button>
				</div>
				<h2 className="task_title">List of Tasks</h2>
				<div className="table_task_header">
					<span className="table_task_header_name">Username</span>
					<span className="table_task_header_email">Email</span>
					<span className="table_task_header_task">Task</span>
					<span className="table_task_header_status">Status</span>
					<span className="table_task_header_edit"></span>

				</div>
				{tasksRender ? tasksRender : (<p>Loading....</p>)}
				<Pagination
					prevPageText='prev'
      				nextPageText='next'
      				firstPageText=''
      				lastPageText=''
	          	  	activePage={this.state.activePage}
		          	itemsCountPerPage={3}
		          	totalItemsCount={countTasks}
		          	pageRangeDisplayed={5}
		          	onChange={this.handlePageChange}
		          	linkClass = 'pag_item'
		          	activeClass = 'activePage'
		          	itemClassNext= 'nextPage'
		          	itemClassPrev= 'prevPage'
		          	itemClass = 'page_item'
		        />
		        {this.state.editPopup && <FormEdit 
                                  taskStatus = {this.state.editStatus} 
                                  taskText = {this.state.editText} 
                                  taskEdit = {this.state.editTask} 
                                  closeEditForm={this.handleCloseEditForm}
                                  updateCurrentPage={this.handleUpdateEditForm}

                                  />}

			</div>         
		);
	}
}

const mapStateToProps = (state) => ({
	tasks: state.messages	
});

function mapDispatchToProps(dispatch) {
	return {
		getTasks: () => dispatch(actions.getAllTasks()),
		renderPage: (status, page) => dispatch(actions.getPage(status, page))		
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListTask);
