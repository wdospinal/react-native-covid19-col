import {
  SET_SEARCH,
  SET_DATA,
  SET_FILTERED_DATA,
  SET_FORCE_LIST_RERENDER,
  CASE_FETCH_FAILED,
  SET_MAP_VIEW,
} from '../actions';

const initialState = {
  cases: {
    Confirmed: 0,
    Recovered: 0,
    Deceased: 0,
  },
  search: '',
  data: [],
  filteredData: [],
  forceListRerender: false,
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
        forceListRerender: !state.forceListRerender,
      };
    case CASE_FETCH_FAILED:
      console.log('CASE_FETCH_FAILED');
      console.log(action);
      return state;
    case SET_MAP_VIEW:
      return {
        ...state,
        mapView: action.mapView,
      };
    default:
      return state;
  }
}
