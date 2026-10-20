import { configureStore } from '@reduxjs/toolkit';
import { partsApi } from './partsApi';

export const store = configureStore({
  reducer: {
    [partsApi.reducerPath]: partsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(partsApi.middleware),
});
