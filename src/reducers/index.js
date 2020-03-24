import { combineReducers } from 'redux';
import mainReducer from './main';
import whatToDoReducer from './whatToDo';

const rootReducer = combineReducers({
  main: mainReducer,
  whatToDo: whatToDoReducer,
});

export default rootReducer;
