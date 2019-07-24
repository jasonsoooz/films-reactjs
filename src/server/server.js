'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

let thisServer;

class Server {
  constructor() {
    this.app = express();
    this.app.set('port', (process.env.PORT || 3005));

    this.DATA_FILE = path.join(__dirname, '../../data.json');

    this.url = '/api/films'
    this._configureGetHandler();
    this._configurePostHandler();
    this._configureDeleteHandler();
  }

  startUpAndListenOnPort() {
    const port = this.app.get('port');
    thisServer = this.app.listen(port, () => {
        console.log(`Express.js server running on port ${port}`);
    });

    process.on('SIGTERM', this.shutdown);
    process.on('SIGINT', this.shutdown);
  }

  shutdown() {
    console.log('Shutting down server...');
    thisServer.close(() => {
      console.log('Closing remaining connections...');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  }

  shutdownForTests() {
    thisServer.close();
    console.log('Server shutdown for tests');
  }

  _configureGetHandler() {
    this.app.get(this.url, (req, res) => {
      fs.readFile(this.DATA_FILE, (err, data) => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(JSON.parse(data));
      });
    });
  }

  _configurePostHandler() {
    // To parse request body correctly, need this line of code.
    // Uses body-parser (already included in express).
    // Without this, request body will not have full content as its async
    this.app.use(express.json());

    this.app.post(this.url, (req, res) => {
      fs.readFile(this.DATA_FILE, (err, data) => {
        const films = JSON.parse(data);
        const newFilm = {
          id: req.body.id,
          title: req.body.title,
          releaseDate: req.body.releaseDate,
          imdbRating: req.body.imdbRating,
          director: req.body.director,
        };
        films.push(newFilm);
        fs.writeFile(this.DATA_FILE, JSON.stringify(films, null, 4), () => {
          res.setHeader('Cache-Control', 'no-cache');
          res.json(films);
        });
      });
    });
  }

  _configureDeleteHandler() {
    this.app.delete('/api/films', (req, res) => {
      fs.readFile(this.DATA_FILE, (err, data) => {
        const film = req.body;
    
        if (film) {
          let films = JSON.parse(data);
          films = films.filter(film => film.id !== req.body.id);
          fs.writeFile(this.DATA_FILE, JSON.stringify(films, null, 4), () => {
            res.json({});
          });
        }
      });
    });
  }
}

const server = new Server;
server.startUpAndListenOnPort();