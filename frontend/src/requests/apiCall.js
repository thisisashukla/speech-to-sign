export function toText(chunk) {

  axios.get('/urlforrequest', {
    params: {
      blob: chunk
    }
  })
  .then(function(response) {
    console.log(response);
  };
  return (response);
  )
  .catch(function(error) {
    console.log(error);
  };
  return(error)
  );
}
