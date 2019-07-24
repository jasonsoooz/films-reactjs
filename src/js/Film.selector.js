import React from 'react'

import { mount } from 'enzyme'

const FilmSelector = Film => {
  const wrapper = mount(<table><tbody><Film /></tbody></table>)

  const deleteButtonExists = () => {
    return wrapper.find('.delete-button').exists()
  }

  return { deleteButtonExists }
}

export default FilmSelector