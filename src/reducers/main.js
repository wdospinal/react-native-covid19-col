import {
  CASES_UPDATE_FETCH_SUCCEEDED,
  DAILY_UPDATE_FETCH_SUCCEEDED,
  FETCH_COLOMBIA_SUCCEEDED,
} from '../actions';

const initialState = {
  cases: {
    confirmed: 0,
    recovered: 0,
    deceased: 0,
  },
  dailyUpdate: [],
  colombia: {
    colLastUpdated: '',
    colConfirmed: 0,
    colDeceased: 0,
    colRecovered: 0,
  },
  series: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CASES_UPDATE_FETCH_SUCCEEDED:
      return {
        ...state,
        cases: action.cases,
        series: [action.cases.recovered, action.cases.deceased],
      };
    case DAILY_UPDATE_FETCH_SUCCEEDED:
      return {
        ...state,
        dailyUpdate: action.result,
      };
    case FETCH_COLOMBIA_SUCCEEDED:
      return {
        ...state,
        colombia: action.colombia,
      };
    default:
      return state;
  }
}
