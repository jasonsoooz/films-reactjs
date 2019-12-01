import React, { useState, useEffect } from 'react';

import FilmForm from './FilmForm';

import Client from '../server/client'
import IDGenerator from './IdGenerator'
import Seed from './Seed';
import Table from './table/Table';

const FilmList = ({isTest}) => {
  const [films, setFilms ] = useState([]);
  const [isAdd, setIsAdd ] = useState(false);
  const [filmId, setFilmId ] = useState(0);

  const client = Client();
  const url = '/api/films'

  const columns = React.useMemo(
    () => [
      {
        Header: 'Films',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Film',
            accessor: 'title',
          },
          {
            Header: 'Release Date',
            accessor: 'releaseDate',
          },
          {
            Header: 'Imdb Rating',
            accessor: 'imdbRating',
          },
          {
            Header: 'Director',
            accessor: 'director',
          },
          {
            Header: 'Actions',
            Cell: ({row, data}) => (
              <div>
                <button onClick={() => handleDelete(row.original.id, data)} className='ui red button'>Delete</button>
              </div>
            )
          }
        ]
      },
    ],
    []
  )

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

  const handleDelete = (filmId, data) => {
    const retainedFilms = data.filter((film) => (
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

  return (
    <div className='ui unstackable items'>
      <h1>Films</h1>
      <button onClick={handleAdd} className='ui primary button'>Add film</button>
      <br /><br />
      <Table columns={columns} data={films} />
    </div>
  );
}

export default FilmList;