import axios from 'axios';

const API_URL = 'http://localhost:8080';

const API_ACC = API_URL + '/api/bank-accounts';

export async function getAccounts() {
  let result;
  result = await axios
    .get(API_ACC, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
    })
    .then(res => res.data)
    .then(res => {
      // console.log(res)
      result = res;
      return res;
    });
  // console.log(result);
  return result;
}
