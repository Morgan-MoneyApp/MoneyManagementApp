import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { serializeAxiosError } from '../utils/errorUtils';

// const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const API_URL = 'http://localhost:8309';

const API_AUTH = API_URL + '/api/authenticate';

const API_REG = API_URL + '/api/register';

// export const getSession = () => (dispatch, getState) => {
//   dispatch(getAccount());
// };
//
// export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get(API_URL + '/api/account'), {
//   serializeError: serializeAxiosError,
// });
//
// export const authenticate = createAsyncThunk('authentication/login', async auth => axios.post(API_URL + '/api/authenticate', auth), {
//   serializeError: serializeAxiosError,
// });
//
// export const login =
//   (username, password, rememberMe = false) =>
//   async dispatch => {
//     const result = await dispatch(authenticate({ username, password, rememberMe }));
//     const response = result.payload;
//     const bearerToken = response?.headers?.authorization;
//     if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
//       const jwt = bearerToken.slice(7, bearerToken.length);
//       if (rememberMe) {
//         Storage.local.set(AUTH_TOKEN_KEY, jwt);
//       } else {
//         Storage.session.set(AUTH_TOKEN_KEY, jwt);
//       }
//     } else if (bearerToken) {
//       if (rememberMe) {
//         localStorage.setItem(AUTH_TOKEN_KEY, bearerToken);
//         // Storage.local.set(AUTH_TOKEN_KEY, bearerToken);
//       } else {
//         sessionStorage.setItem(AUTH_TOKEN_KEY, bearerToken);
//         // Storage.session.set(AUTH_TOKEN_KEY, bearerToken);
//       }
//     }
//     dispatch(getSession());
//   };

export function login2(input = { username: '', password: '' }, rememberMe) {
  if (input.username !== '' && input.password !== '') {
    axios
      .post(
        API_AUTH,
        { username: input.username, password: input.password, rememberMe: rememberMe },
        {
          proxy: {
            host: '127.0.0.1',
            port: '8310',
          },
        },
      )
      .then(response => response.data)
      .then(response => {
        if (rememberMe) {
          localStorage.setItem('id_token', response['id_token']);
        } else {
          sessionStorage.setItem('id_token', response['id_token']);
        }
      })
      .catch(reason => {
        let resp = reason.response;
        if (resp.status === 400) {
          alert('bad request');
        } else if (resp.status === 401) {
          alert(resp.data.detail);
        }
      });
  }
  return localStorage.getItem('id_token') || sessionStorage.getItem('id_token');
}

export function register(
  input = {
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    house: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    userName: '',
    password: '',
  },
) {
  if (
    input.firstName &&
    input.lastName &&
    input.dob &&
    input.email &&
    input.house &&
    input.street &&
    input.city &&
    input.state &&
    input.zipcode &&
    input.userName &&
    input.password
  ) {
    axios
      .post(API_REG, {
        firstName: input.firstName,
        lastName: input.lastName,
        password: input.password,
        login: input.userName,
        email: input.email,
        dateOfBirth: input.dob,
        address: {
          houseNumber: input.house,
          street: input.street,
          city: input.city,
          state: input.state,
          zip: input.zipcode,
        },
      })
      .then(response => response.data)
      .then(response => console.log(response))
      .catch(reason => {
        let resp = reason.response;
        console.log(resp.status);
      });
  }
}
