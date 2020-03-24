import {
  SET_SEARCH,
  SET_DATA,
  SET_FILTERED_DATA,
  SET_FORCE_LIST_RERENDER,
  SET_CURRENT_LATITUDE,
  SET_CURRENT_LONGITUDE,
  CASE_FETCH_FAILED,
} from '../actions';

const initialState = {
  cases: {
    Confirmed: 0,
    Recovered: 0,
    Deaths: 0,
  },
  search: '',
  data: [],
  filteredData: [],
  forceListRerender: false,
  currentLatitude: 35.8617,
  currentLongitude: 104.1954,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.newData,
      };
    case SET_FORCE_LIST_RERENDER:
      return {
        ...state,
        forceListRerender: !action.forceListRerender,
      };
    case SET_CURRENT_LATITUDE:
      return {
        ...state,
        currentLatitude: !action.lat,
      };
    case SET_CURRENT_LONGITUDE:
      return {
        ...state,
        currentLatitude: !action.long,
      };
    case CASE_FETCH_FAILED:
      console.log('CASE_FETCH_FAILED');
      console.log(action);
      return state;
    default:
      return state;
  }
}
