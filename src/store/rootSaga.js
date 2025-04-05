import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import { tasksSaga } from '../features/tasks/taskSaga';
import { weatherSaga } from '../features/weather/weatherSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    tasksSaga(),
    weatherSaga()
  ]);
}