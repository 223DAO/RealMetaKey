import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import rootReducer from './redux/reducers/index';

const persistConfig = {
  key: 'root',
  storage,
}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
