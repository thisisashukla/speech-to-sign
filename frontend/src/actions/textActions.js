import axios from 'axios';
import qs from 'querystring';
import dispatcher from "../dispatcher";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var BASE_BACKEND_URL = 'http://192.168.0.101:8000/';

export function toGif(text,languages) {
  dispatcher.dispatch({type: "GETTING_GIF", payload: text});
  axios.post(BASE_BACKEND_URL+'api/' + languages.src_lang + '/' + languages.trgt_lang, qs.stringify({params: text}))
  .then(function (response) {
    // console.log(response.data);
    dispatcher.dispatch({type: "GOT_GIF", payload: response.data});
  })
  .catch(function (error) {
    console.log('An Error occured',error);
  });

}
