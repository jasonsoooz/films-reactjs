import React from 'react';

class Film extends React.Component {
    handleDelete = () => {
        this.props.onDelete(this.props.id);
    };
  
    render() {
      return(
        <tr>
          <td>{this.props.id}</td>
          <td id="title">{this.props.title}</td>
          <td id="releaseDate">{this.props.releaseDate}</td>
          <td id="imdb">{this.props.imdbRating}</td>
          <td id="director">{this.props.director}</td>
          <td>
            <button onClick={this.handleDelete} className="ui red button delete-button">Delete</button>
          </td>
        </tr>
      );
    }
  }

  export default Film;