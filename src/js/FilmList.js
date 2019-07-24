import React from 'react';
import Film from './Film';
import FilmForm from './FilmForm';
import Client from '../server/client'

class FilmList extends React.Component {
    state = {
      films: [],
      isAdd: false
    };

    client = new Client();
    url = '/api/films'
  
    componentDidMount() {
      const filmsPromise = this.client.getFilms(this.url);
      filmsPromise.then(films => {
        // console.log(`films: ${films}`);
        this.setState({ films: films, isAdd: false });
      });
    }

    handleDelete = (filmId) => {
      const retainedFilms = this.state.films.filter((film) => (
        film.id !== filmId
      ));
      this.client.deleteFilm(this.url, {id: filmId});
      this.setState({ films: retainedFilms});
    }

    handleAdd = () => {
      this.setState({ isAdd: true });
    }

    handleAddCancel = () => {
      this.setState({ isAdd: false });
    }

    handleAddSubmit = (id, title, releaseDate, imdbRating, director) => {
      const newFilm = {
        id: id, 
        title: title,
        releaseDate: releaseDate,
        imdbRating: imdbRating,
        director: director
      }
      this.client.addFilm(this.url, newFilm);

      const newFilms = this.state.films.concat(newFilm);
      this.setState({ films: newFilms, isAdd: false });
    }

    getNextId(films) {
      if (films) {
        const ids = films.map((film) => (film.id));
        return (ids.length === 0) ? 1 : Math.max(...ids) + 1;
      } else {
        return 1;
      }
    } 
  
    render() {
      if (this.state.isAdd === true) {
        const newId = this.getNextId(this.state.films);

        return (<FilmForm 
          key={'filmadd-' + newId}
          id={newId}
          onAddCancel={this.handleAddCancel}
          onAddSubmit={this.handleAddSubmit}
        />);
      }

      const filmComponents = this.state.films.map((film) => (
        <Film
          key={'filmId-' + film.id}
          id={film.id}
          title={film.title}
          releaseDate={film.releaseDate}
          imdbRating={film.imdbRating}
          director={film.director}
          onDelete={this.handleDelete}
        />
      ));

      return (
        <div className='ui unstackable items'>
          <h1>Films</h1>
          <button onClick={this.handleAdd} className="ui primary button add-button">Add film</button>
          <table className="ui striped celled table">
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
  }

  export default FilmList;