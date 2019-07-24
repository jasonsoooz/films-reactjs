'use strict';

const fetch = require('node-fetch');

class ClientPromise {
  getFilms(url, successFn) {
    return fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    }).then(this._checkStatus)
      .then(this._parseJSON)
      .then(successFn);
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  _parseJSON(response) {
    return response.json();
  }
}

export default ClientPromise;