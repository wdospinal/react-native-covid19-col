import { all, put, takeEvery } from 'redux-saga/effects';
import {
  CASES_UPDATE_FETCH_SUCCEEDED,
  CASES_UPDATE_FETCH_FAILED,
  DAILY_UPDATE_FETCH_SUCCEEDED,
  DAILY_UPDATE_FETCH_FAILED,
  GET_CASES,
  GET_DAILY,
} from '../actions/main';

import { baseUrl } from '../config';


// worker Saga: will be fired on DAILY_UPDATE_FETCH_SUCCEEDED actions
function* fetchDaily() {
  try {
    const response = yield fetch(`${baseUrl}/daily`);
    if (response.status === 200) {
      const result = yield response.json();
      yield put({ type: DAILY_UPDATE_FETCH_SUCCEEDED, result });
      /*
      setDailyUpdate(result, () => {
        setForceListRerender(!forceListRerender);
      });
      */
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
      yield put({ type: CASES_UPDATE_FETCH_SUCCEEDED, result });
      /*
      setCases({
        Confirmed: result.confirmed.value,
        Recovered: result.recovered.value,
        Deaths: result.deaths.value,
      });
      */
    } else {
      yield put({ type: CASES_UPDATE_FETCH_FAILED, error: response.status });
    }
  } catch (e) {
    yield put({ type: CASES_UPDATE_FETCH_FAILED, message: e.message });
  }
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

export default function* rootSaga() {
  yield all([
    watchFetchCases(),
    watchFetchDaily(),
  ]);
}
