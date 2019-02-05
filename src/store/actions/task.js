import axios from 'axios';


export function getTasks(tasks) {
  return {
    type: 'GET_TASKS',
    payload: tasks
  };
}

export function getPage(status, page) {  
  return function (dispatch) {
    axios
      .get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Vadim&sort_field=${status}&page=${page}`)
      .then((response) => {
        const tasks = response.data.message;
        dispatch(getTasks(tasks));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getAllTasks() {
  return function (dispatch) {
    axios
      .get(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Vadim`)
      .then((response) => {
        const tasks = response.data.message;
        dispatch(getTasks(tasks));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}


export function addTaskList(form) {
  return function (dispatch) {
    axios({
        method: "POST",
        url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=Vadim',
        data: form,
        crossDomain: true,
        mimeType: "multipart/form-data",
        contentType: false, 
        processData: false, 
        dataType: "json",
        })
        .then((response) => {
          console.log('create--', response)
        })
        .catch((error) => {
          console.log(error);
        });
  };
}