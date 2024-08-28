import {configureStore} from '@reduxjs/toolkit';
import apiSlice from '../services/apiSlice';
import formReducer from '../slices/formSlice';
import tokenReducer from '../slices/tokenSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    token: tokenReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // 다른 슬라이스들도 추가 가능
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
