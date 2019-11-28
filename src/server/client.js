const fetch = require('node-fetch');

const Client = () => {
  const getFilms = url => {
    return _fetch(url);
  }

  const saveFilm = (url, film) => {
    return _fetch(url, _getFetchOption('put', film));
  }

  const deleteFilm = (url, film) => {
    return _fetch(url, _getFetchOption('delete', film));
 }

  const _fetch = (url, options) => {
    return fetch(url, options)
      .then(_checkStatus)
      .then(data => {
     return data;
   })
   .catch(error => {
     console.error(`Error: ${error}`);
     throw error;
   });
  }

  const _getFetchOption = (methodType, film) => {
    return {
     method: methodType,
     body: JSON.stringify(film),
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
   }
  }

  const _checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      const json = response.json();
      return json;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  return {getFilms,saveFilm,deleteFilm}
}

export default Client;