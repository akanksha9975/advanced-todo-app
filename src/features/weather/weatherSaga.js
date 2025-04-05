import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchWeatherSuccess, fetchWeatherFailure } from './weatherSlice';

function* fetchWeatherSaga(action) {
  try {
    const url = `https://open-weather13.p.rapidapi.com/city/${action.payload}/EN`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '4146046a5dmsh3a5f153e5430ec1p1c6748jsn9fadd1afd1a5',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      }
    };

    const response = yield call(fetch, url, options);
    
    if (!response.ok) throw new Error('City not found');
    
    const data = yield response.json();
    yield put(fetchWeatherSuccess(data));
  } catch (error) {
    yield put(fetchWeatherFailure(error.message));
  }
}

export function* weatherSaga() {
  yield takeEvery('weather/fetchWeather', fetchWeatherSaga);
}