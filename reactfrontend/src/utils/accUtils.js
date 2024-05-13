import axios from 'axios';

const API_URL = 'http://localhost:8080';

const API_ACC = API_URL + '/api/bank-accounts';

const APT_TRA = API_ACC + '/{id}/transaction-log';

export async function getAccounts() {
  let result;
  result = await axios
    .get(API_ACC, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
    })
    .then(res => res.data)
    .then(res => {
      // console.log(res)
      return res;
    });
  // console.log(result);
  return result;
}

export async function getTransactions(id) {
  let result;
  result = await axios
    .get(API_ACC + '/' + id + '/transaction-log', { headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') } })
    .then(res => res.data)
    .then(res => {
      console.log(res);
      return res;
    });
  console.log(result);
  return result;
}
