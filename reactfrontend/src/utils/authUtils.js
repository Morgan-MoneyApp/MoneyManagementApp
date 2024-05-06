import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { serializeAxiosError } from '../utils/errorUtils';

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

export const getSession = () => (dispatch, getState) => {
  dispatch(getAccount());
};

export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get('api/account'), {
  serializeError: serializeAxiosError,
});

export const authenticate = createAsyncThunk('authentication/login', async auth => axios.post('/api/authenticate', auth), {
  serializeError: serializeAxiosError,
});

export const login =
  (username, password, rememberMe = false) =>
  async dispatch => {
    const result = await dispatch(authenticate({ username, password, rememberMe }));
    const response = result.payload;
    const bearerToken = response?.headers?.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (rememberMe) {
        Storage.local.set(AUTH_TOKEN_KEY, jwt);
      } else {
        Storage.session.set(AUTH_TOKEN_KEY, jwt);
      }
    }
    dispatch(getSession());
  };
