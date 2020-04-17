import { combineReducers } from 'redux';
import mainReducer from './main';
import whatToDoReducer from './whatToDo';
import casesReducer from './cases';
import settingsReducer from './settings';
import countryReducer from './country';

const rootReducer = combineReducers({
  main: mainReducer,
  whatToDo: whatToDoReducer,
  cases: casesReducer,
  settings: settingsReducer,
  country: countryReducer,
});

export default rootReducer;
