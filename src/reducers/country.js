import {
  FETCH_COUNTRY_SUCCEEDED,
} from '../actions';

const initialState = {
  lastUpdated: '',
  confirmed: 0,
  deaths: 0,
  recovered: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRY_SUCCEEDED:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
}
