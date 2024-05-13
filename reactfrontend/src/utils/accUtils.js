import axios from 'axios';

const API_URL = 'http://localhost:8080';

const API_ACC = API_URL + '/api/bank-accounts';

export function getAccounts() {
  let result;
  axios
    .get(API_ACC, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
    })
    .then(res => res.data)
    .then(res => console.log(res))
    .catch(reason => console.log(reason.response.status));
  return result;
}
