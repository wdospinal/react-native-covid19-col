import { all, put, takeEvery } from 'redux-saga/effects';
import Moment from 'moment';
import {
  CASES_UPDATE_FETCH_SUCCEEDED,
  CASES_UPDATE_FETCH_FAILED,
  DAILY_UPDATE_FETCH_SUCCEEDED,
  DAILY_UPDATE_FETCH_FAILED,
  GET_CASES,
  GET_DAILY,
  SET_FORCE_LIST_RERENDER,
  GET_EACH_CASE,
  SET_DATA,
  UPDATE_SEARCH,
  CASE_FETCH_FAILED,
  SET_FILTERED_DATA,
  FETCH_COLOMBIA_SUCCEEDED,
  FETCH_COLOMBIA_FAILED,
  GET_COLOMBIA,
  GET_COUNTRY,
  FETCH_COUNTRY__FAILED,
  FETCH_COUNTRY_SUCCEEDED,
} from '../actions';

import { baseUrl } from '../config';


// worker Saga: will be fired on DAILY_UPDATE_FETCH_SUCCEEDED actions
function* fetchDaily() {
  try {
    let response = {};
    const result = [];
    let json = {};
    let startdate;
    startdate = Moment().subtract(2, 'days').format('D-M-YYYY');
    response = yield fetch(`${baseUrl}/daily/${startdate}`);
    json = yield response.json();
    if (json) result.push(json);
    startdate = Moment().subtract(3, 'days').format('D-M-YYYY');
    response = yield fetch(`${baseUrl}/daily/${startdate}`);
    json = yield response.json();
    if (json) result.push(json);
    startdate = Moment().subtract(4, 'days').format('D-M-YYYY');
    response = yield fetch(`${baseUrl}/daily/${startdate}`);
    json = yield response.json();
    if (json) result.push(json);
    if (result) {
      yield put({ type: DAILY_UPDATE_FETCH_SUCCEEDED, result });
    } else {
      yield put({ type: DAILY_UPDATE_FETCH_FAILED, error: response.status });
    }
  } catch (e) {
    yield put({ type: DAILY_UPDATE_FETCH_FAILED, message: e.message });
  }
}

function* fetchCases() {
  try {
    const response = yield fetch(baseUrl);
    if (response.status === 200) {
      const result = yield response.json();
      const cases = {
        confirmed: result.confirmed.value,
        recovered: result.recovered.value,
        deceased: result.deaths.value,
      };
      yield put({ type: CASES_UPDATE_FETCH_SUCCEEDED, cases });
    } else {
      yield put({ type: CASES_UPDATE_FETCH_FAILED, error: response.status });
    }
  } catch (e) {
    yield put({ type: CASES_UPDATE_FETCH_FAILED, message: e.message });
  }
}

function* fetchColombia() {
  try {
    const response = yield fetch(`${baseUrl}/countries/Colombia`);
    if (response.status === 200) {
      const result = yield response.json();
      const colombia = {
        colLastUpdated: result.lastUpdate,
        colConfirmed: result.confirmed.value,
        colDeceased: result.deaths.value,
        colRecovered: result.recovered.value,
      };
      yield put({ type: FETCH_COLOMBIA_SUCCEEDED, colombia });
    } else {
      yield put({ type: FETCH_COLOMBIA_FAILED, error: response.status });
    }
  } catch (e) {
    yield put({ type: CASES_UPDATE_FETCH_FAILED, message: e.message });
  }
}

function* fetchCountry({ country }) {
  try {
    const response = yield fetch(`${baseUrl}/countries/${country}`);
    if (response.status === 200) {
      const result = yield response.json();
      const action = {
        type: FETCH_COUNTRY_SUCCEEDED,
      };
      action[country] = {
        lastUpdate: result.lastUpdate,
        confirmed: result.confirmed.value,
        deaths: result.deaths.value,
        recovered: result.recovered.value,
      };
      yield put(action);
    } else {
      yield put({ type: FETCH_COUNTRY__FAILED, error: response.status });
    }
  } catch (e) {
    yield put({ type: CASES_UPDATE_FETCH_FAILED, message: e.message });
  }
}

function* fetchEachCase(action) {
  try {
    const caseType = action.caso.toLowerCase();
    const response = yield fetch(`${baseUrl}${caseType}`);
    if (response.status === 200) {
      const data = yield response.json();
      yield all([
        put({ type: SET_DATA, data }),
        put({ type: SET_FILTERED_DATA, newData: data }),
        put({ type: SET_FORCE_LIST_RERENDER }),
      ]);
    } else {
      yield put({ type: CASE_FETCH_FAILED, error: response.status });
    }
  } catch (e) {
    yield put({ type: CASE_FETCH_FAILED, message: e.message });
  }
}

function* filterData(action) {
  const { search, data } = action.payload;
  let newData;
  if (search.length > 0) {
    newData = data.filter((item) => {
      const { provinceState, countryRegion } = item;
      return item && (
        (provinceState && provinceState.includes(search))
         || (countryRegion && countryRegion.includes(search))
      );
    });
  } else {
    newData = data;
  }
  yield put({ type: SET_FILTERED_DATA, newData }); // setFilteredData(newData);
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* watchFetchCases() {
  yield takeEvery(GET_DAILY, fetchCases);
}
function* watchFetchDaily() {
  yield takeEvery(GET_CASES, fetchDaily);
}
function* watchFetchEachCase() {
  yield takeEvery(GET_EACH_CASE, fetchEachCase);
}
function* watchFilterData() {
  yield takeEvery(UPDATE_SEARCH, filterData);
}
function* watchFetchColombia() {
  yield takeEvery(GET_COLOMBIA, fetchColombia);
}
function* watchFetchCountry() {
  yield takeEvery(GET_COUNTRY, fetchCountry);
}
// TODO: setI18nConfig
export default function* rootSaga() {
  yield all([
    watchFetchCases(),
    watchFetchDaily(),
    watchFetchEachCase(),
    watchFilterData(),
    watchFetchColombia(),
    watchFetchCountry(),
  ]);
}
