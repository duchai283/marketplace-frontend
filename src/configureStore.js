import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './mainReducer';
import rootSaga from 'src/store/saga';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const composeMiddlewares =
  process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

function configureStore() {
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const store = createStore(
    createRootReducer(history),
    undefined,
    composeMiddlewares(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = configureStore();

const persistor = persistStore(store);
export { store, persistor };
