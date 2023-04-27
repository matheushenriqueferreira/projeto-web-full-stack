import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  blacklist: ['/register']
}

const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)