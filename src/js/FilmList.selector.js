import React from 'react'

import {render,fireEvent} from '@testing-library/react'

import Seed from './Seed'

const FilmListSelector = FilmList => {

  const {getAllByText,getByText,getByLabelText,queryByText} = render(<FilmList initialFilms={Seed.films} isTest={true}/>);

  const numberOfDeleteButtons = () => {
    // Count number of delete buttons as 1 delete button per film    
    return getAllByText('Delete').length;
  }

  const deleteFirst = () => {
    const deleteButton = getAllByText('Delete').pop();
    fireEvent.click(deleteButton);
  }

  const addButton = () => {
    return getByText('Add film')
  }

  const addFilm = () => {
    fireEvent.click(addButton());
  }

  const filmInput = () => {
    return getByLabelText('Film');
  }

  const cancel = () => {
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
  }

  const submitFilm = () => {
    fireEvent.click(getByText('Submit'));

    return new Promise(resolve => setTimeout(() => {
      // wrapper.update()
      resolve()
    }, 0))
  }

  const changeTitle = title => {
    const inputTitle = getByLabelText('Film');
    fireEvent.change(inputTitle, {target:{value: title}});
  }

  const changeReleaseDate = releaseDate => {
    const inputReleaseDate = getByLabelText('Release Date');
    fireEvent.change(inputReleaseDate, {target:{value: releaseDate}});
  }

  const changeImdb = imdb => {
    const inputImdb = getByLabelText('Imdb Rating');
    fireEvent.change(inputImdb, {target:{value: imdb}});
  }

  const changeDirector = imdb => {
    const inputDirector = getByLabelText('Director');
    fireEvent.change(inputDirector, {target:{value: imdb}});
  }

  const getTextContent = (text) => {
    return getByText(text);
  }

  const getValidationError = (text) => {
    // case insensitive query
    return queryByText(text, {exact: false});
  }

  const clickImdbRatingHeader = () => {
    fireEvent.click(getByText('Imdb Rating'));
  }

  return {numberOfDeleteButtons,deleteFirst, 
    addButton,addFilm,filmInput,cancel,submitFilm,changeTitle,
    changeReleaseDate,changeImdb,changeDirector,
    getTextContent,getValidationError,clickImdbRatingHeader
  }
}

export default FilmListSelector