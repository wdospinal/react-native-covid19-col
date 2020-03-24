import { CASES_UPDATE_FETCH_SUCCEEDED, DAILY_UPDATE_FETCH_SUCCEEDED } from '../actions';

const initialState = {
  cases: {
    Confirmed: 0,
    Recovered: 0,
    Deaths: 0,
  },
  dailyUpdate: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CASES_UPDATE_FETCH_SUCCEEDED:
      return {
        ...state,
        cases: action.result,
      };
    case DAILY_UPDATE_FETCH_SUCCEEDED:
      return {
        ...state,
        dailyUpdate: action.result,
      };
    default:
      return state;
  }
}
