import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.post['Content-Type'] = 'text/plain';

var BASE_URL = 'http://localhost:8000/';

export function backendRequest(URL, params, sucess, failure) {
  console.log(URL);
  axios.get(BASE_URL+URL, {params: params}).then(success(response)).catch(failure(error))
}
