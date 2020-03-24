import { combineReducers } from 'redux';
import mainReducer from './main';
import whatToDoReducer from './whatToDo';
import casesReducer from './cases';

const rootReducer = combineReducers({
  main: mainReducer,
  whatToDo: whatToDoReducer,
  cases: casesReducer,
});

export default rootReducer;
