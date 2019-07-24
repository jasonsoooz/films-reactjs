import React from 'react'

import { mount } from 'enzyme'

const FilmFormSelector = FilmForm => {
  const wrapper = mount(<FilmForm />);

  const containsMatchingElement = element => {
    return wrapper.containsMatchingElement(element);
  }

  return { containsMatchingElement }
}

export default FilmFormSelector