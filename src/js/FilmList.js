import React, { useState, useEffect } from 'react';

import Film from './Film';
import FilmForm from './FilmForm';

import Client from '../server/client'
import IDGenerator from './IdGenerator'
import Seed from './Seed';

const FilmList = ({isTest}) => {
  const [films, setFilms ] = useState([]);
  const [isAdd, setIsAdd ] = useState(false);
  const [filmId, setFilmId ] = useState(0);

  const client = Client();
  const url = '/api/films'
  
  useEffect(() => {
    if (isTest) {
      setFilms(Seed.films);
    } else {
      const filmsPromise = client.getFilms(url);
      filmsPromise.then(films => {
        // console.log(`films: ${films}`);
        setFilms(films);
        setIsAdd(false);
      })
      .catch(() => {
        setFilms(Seed.films);
        setIsAdd(false);
      });
    }
  }, []);

  const handleDelete = filmId => {
    const retainedFilms = films.filter((film) => (
      film.id !== filmId
    ));

    const deletePromise = client.deleteFilm(url, {id: filmId});
    // allow app to run when no backend
    deletePromise.catch(() => null);
    
    setFilms(retainedFilms);
  }

  const handleAdd = () => {
    setIsAdd(true);
    setFilmId(IDGenerator().getNextId(films))
  }

  const handleAddCancel = () => {
    setIsAdd(false);
  }

  const _addNewFilmWhenNoBackend = newFilm => {
    newFilm.id = IDGenerator().getNextId(films);
    const newFilms = films.concat(newFilm);
    setFilms(newFilms);
  }

  const handleAddSubmit = (id, title, releaseDate, imdbRating, director) => {
    const newFilm = {
      id: id, 
      title: title,
      releaseDate: releaseDate,
      imdbRating: imdbRating,
      director: director
    }

    if (isTest) {
      _addNewFilmWhenNoBackend(newFilm);
    } else {
      const filmPromise = client.saveFilm(url, newFilm);
      // Express server returns all films, not just the single one added
      filmPromise.then(films => {
        setFilms(films);
      })
      .catch(() => {
          _addNewFilmWhenNoBackend(newFilm);
      });
    }

    setIsAdd(false);
  }

  if (isAdd === true) {
    return (<FilmForm 
      key={'filmadd-' + filmId}
      id={filmId}
      onAddCancel={handleAddCancel}
      onAddSubmit={handleAddSubmit}
    />);
  }

  const filmComponents = films.map((film) => (
    <Film
      key={'filmId-' + film.id}
      id={film.id}
      title={film.title}
      releaseDate={film.releaseDate}
      imdbRating={film.imdbRating}
      director={film.director}
      onDelete={handleDelete}
    />
  ));

  return (
    <div className='ui unstackable items'>
      <h1>Films</h1>
      <button onClick={handleAdd} className='ui primary button'>Add film</button>
      <table className='ui striped celled table'>
        <thead>
          <tr>
              <th>ID</th>
              <th>Film</th>
              <th>Release Date</th>
              <th>Imdb Rating</th>
              <th>Director</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filmComponents}
        </tbody>
      </table>
    </div>
  );
}

export default FilmList;