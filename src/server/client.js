const fetch = require('node-fetch');

class Client {
  async getFilms(url) {
    const films = await this._fetchGet(url);
    // console.log(`films: ${films}`);
    return films;
  }

  addFilm(url, film) {
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(film),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this._checkStatus)
    // .catch(error => {
    //   console.error(`Error: ${error}`);
    //   throw error;
    // });
  }

  deleteFilm(url, film) {
    return fetch(url, {
      method: 'delete',
      body: JSON.stringify(film),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(this._checkStatus)
    // .catch(error => {
    //   console.error(`Error: ${error}`);
    //   throw error;
    // });
  }

  _fetchGet(url) {
    return fetch(url)
      .then(this._checkStatus)
      .then(json => {
        // console.log(`json: ${json}`);
        return json;
      })
      // .catch(error => {
      //   console.error(`Error: ${error}`);
      //   throw error;
      // });
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      const json = response.json();
      // console.log(json)
      return json;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }
}

// const client = new Client();
// client.getFilms("http://localhost:3005/api/films");

export default Client;