import axios from 'axios';
import qs from 'querystring';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var BASE_URL = 'http://localhost:8000/';

export function backendRequest(URL, params, success, failure) {
  console.log(URL);

}
