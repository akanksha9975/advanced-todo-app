import { put, takeLatest } from 'redux-saga/effects';
import { addTaskStart, addTaskSuccess, addTaskFailure } from './taskSlice';

function* addTaskSaga(action) {
  try {
    const newTask = {
      id: Date.now(),
      text: action.payload.text,
      priority: action.payload.priority,
      completed: false
    };
    
    yield put(addTaskSuccess(newTask));
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

export function* tasksSaga() {
  yield takeLatest(addTaskStart.type, addTaskSaga);
}