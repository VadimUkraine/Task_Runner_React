
const INIT_STATE = {
  message: {},
  taskCount: ''
};

export default function reducerTasks(state = INIT_STATE, action) {
  switch (action.type) {
    case 'GET_TASKS':
    	return { message: action.payload.tasks,  taskCount: action.payload.total_task_count};
    default:
      return state;
  }
}
