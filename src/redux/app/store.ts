import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import todoRedux from '../reducers/todoRedux/todoRedux';
import uiRedux from "../reducers/uiRedux/uiRedux"
import {
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import persistStore from "redux-persist/lib/persistStore";

const reducers = combineReducers({
    ui: uiRedux,
    todo : todoRedux
});

const persistentConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistentConfig, reducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
