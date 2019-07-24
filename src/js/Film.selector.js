import React from 'react'

import {render} from '@testing-library/react'

const FilmSelector = Film => {
  const {getByText} = render(<table><tbody><Film /></tbody></table>)

  const deleteButton = () => {
    return getByText('Delete');
  }

  return {deleteButton}
}

export default FilmSelector