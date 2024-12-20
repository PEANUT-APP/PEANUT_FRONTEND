import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store/store';
import {logout} from '../slices/tokenSlice';
import {Alert} from 'react-native';
import {API_URL} from '@env';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  mode: 'no-cors',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).token.accessToken;
    if (token) {
      headers.set('X-AUTH-TOKEN', token);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOption) => {
  let result = await baseQuery(args, api, extraOption);

  if (result.error && result.error.status === 401) {
    Alert.alert('로그아웃 되었습니다!');
    api.dispatch(logout());
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: [
    'AdditionalInfo',
    'Meal',
    'AI',
    'User',
    'Community',
    'Connect',
    'Alarm',
  ],
});

export default apiSlice;
