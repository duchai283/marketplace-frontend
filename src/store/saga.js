import { all } from 'redux-saga/effects';
import homeSaga from 'src/containers/Home/saga';

export default function* rootSaga() {
  yield all([homeSaga()]);
}
