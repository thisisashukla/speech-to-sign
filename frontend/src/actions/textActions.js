import dispatcher from "../dispatcher";
import axios from 'axios';
import qs from 'querystring';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var BASE_BACKEND_URL = 'http://localhost:8000/';

export function toGif(text,languages) {
  dispatcher.dispatch({type: "GETTING_GIF", payload: text});
  console.log('sending ajax to backend',BASE_BACKEND_URL+'api/' + languages.src_lang + '/' + languages.trgt_lang);
  axios.post(BASE_BACKEND_URL+'api/' + languages.src_lang + '/' + languages.trgt_lang, qs.stringify({params: text}))
  .then(function (response) {
    console.log(response.data);
    dispatcher.dispatch({type: "GOT_GIF", payload: respose.data});
  })
  .catch(function (error) {
    console.log('errordddd',error);
  });

}
