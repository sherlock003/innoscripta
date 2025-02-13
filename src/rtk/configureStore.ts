/**
 * Setup reducer
 *
 * @module ConfigureStore
 * @category Utils
 *
 */

import { configureStore, Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import api from '@/rtk/apiSlice';
import appReducer from '@/rtk/reducers';

const persistedReducer = persistReducer(
  {
    key: `innoscripta-test`,
    storage,
    blacklist: [api.reducerPath],
    debug: process.env.NODE_ENV === 'development',
  },
  appReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: {
        warnAfter: 128,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['RTK.mutations'],
      },
    }).concat(api.middleware as Middleware),
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

/**
 * @see https://redux-toolkit.js.org/rtk-query/api/setupListeners
 *
 */
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export { persistor, store };
