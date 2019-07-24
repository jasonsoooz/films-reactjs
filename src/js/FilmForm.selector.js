import React from 'react'

import {render} from '@testing-library/react'

const FilmFormSelector = FilmForm => {
  const {getByLabelText,getByText} = render(<FilmForm />);

  const filmInput = () => {
    return getByLabelText('Film');
  }

  const releaseDateInput = () => {
    return getByLabelText('Release Date');
  }

  const imdbRatingInput = () => {
    return getByLabelText('Imdb Rating');
  }

  const directorInput = () => {
    return getByLabelText('Director')
  }

  const submitButton = () => {
    return getByText('Submit');
  }

  const cancelButton = () => {
    return getByText('Cancel');
  }

  return {filmInput,releaseDateInput,imdbRatingInput,
    directorInput,submitButton,cancelButton
  }
}

export default FilmFormSelector