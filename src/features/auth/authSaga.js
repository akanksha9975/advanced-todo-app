import { put, takeLatest, call } from 'redux-saga/effects';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

function* loginSaga(action) {
  try {
    yield new Promise(resolve => setTimeout(resolve, 500));
    
    if (action.payload.username && action.payload.password) {
      const user = { username: action.payload.username };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure('Invalid credentials'));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(loginStart.type, loginSaga);
}