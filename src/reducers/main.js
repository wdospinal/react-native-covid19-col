import {
  CASES_UPDATE_FETCH_SUCCEEDED,
  DAILY_UPDATE_FETCH_SUCCEEDED,
  FETCH_COLOMBIA_SUCCEEDED,
} from '../actions';

const initialState = {
  cases: {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
  },
  dailyUpdate: [],
  colombia: {
    colLastUpdated: '',
    colConfirmed: 0,
    colDeaths: 0,
    colRecovered: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CASES_UPDATE_FETCH_SUCCEEDED:
      return {
        ...state,
        cases: action.cases,
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
