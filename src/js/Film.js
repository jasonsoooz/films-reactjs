import React from 'react';

const Film = props => {
  const handleDelete = () => {
    props.onDelete(props.id);
  };

  return(
    <tr>
      <td>{props.id}</td>
      <td id='title'>{props.title}</td>
      <td id='releaseDate'>{props.releaseDate}</td>
      <td id='imdb'>{props.imdbRating}</td>
      <td id='director'>{props.director}</td>
      <td>
        <button onClick={handleDelete} className='ui red button'>Delete</button>
      </td>
    </tr>
  );
}

export default Film;