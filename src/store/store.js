import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import { rootSaga } from './root-saga';

import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from "redux-saga";

const persistConfig = {
    key: "root",        // persist everything
    storage: storage,   // use browser localStorage
    blacklist: ["categories, user"]
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== "production" && logger,
    sagaMiddleware
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);