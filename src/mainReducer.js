import { combineReducers } from 'redux';
import homeReducer from 'src/containers/Home/reducer';
import modalReducer from 'src/containers/Modal/reducer';
export default () =>
  combineReducers({
    home: homeReducer,
    modal: modalReducer
  });
