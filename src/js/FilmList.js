import React, { useState, useEffect } from 'react';

import Film from './Film';
import FilmForm from './FilmForm';

import Client from '../server/client'
import IDGenerator from './IdGenerator'

const FilmList = ({ initialFilms, isTest }) => {
  const [films, setFilms ] = useState(initialFilms);
  const [isAdd, setIsAdd ] = useState(false);

  const client = new Client();
  const url = '/api/films'
  
  useEffect(() => {
    if (!isTest) {
      const filmsPromise = client.getFilms(url);
      filmsPromise.then(films => {
        // console.log(`films: ${films}`);
        setFilms(films);
        setIsAdd(false);
      });
    }
  });

  const handleDelete = filmId => {
    const retainedFilms = films.filter((film) => (
      film.id !== filmId
    ));
    if (!isTest) {
      client.deleteFilm(url, {id: filmId});
    }
    setFilms(retainedFilms);
  }

  const handleAdd = () => {
    setIsAdd(true);
  }

  const handleAddCancel = () => {
    setIsAdd(false);
  }

  const handleAddSubmit = (id, title, releaseDate, imdbRating, director) => {
    const newFilm = {
      id: id, 
      title: title,
      releaseDate: releaseDate,
      imdbRating: imdbRating,
      director: director
    }
    if (!isTest) {
      client.addFilm(url, newFilm);
    }
    
    const newFilms = films.concat(newFilm);
    setFilms(newFilms);
    setIsAdd(false);
  }

  if (isAdd === true) {
    const newId = IDGenerator().getNextId(films);

    return (<FilmForm 
      key={'filmadd-' + newId}
      id={newId}
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