import React from 'react'

import { mount } from 'enzyme'

import Seed from './Seed'
import Film from './Film'

const FilmListSelector = FilmList => {
  const wrapper = mount(<FilmList />);
  wrapper.setState({ films: Seed.films, isAdd: false });

  const numberOfFilms = () => {
    return wrapper.state().films.length;
  }

  const deleteFirst = () => {
    const deleteButton = wrapper.find('.delete-button').first();
    deleteButton.simulate('click');
  }

  const contains = element => {
    return wrapper.contains(element)
  }

  const addButtonExists = () => {
    return wrapper.find('.add-button').exists()
  }

  const addFilm = () => {
    wrapper.find('.add-button').simulate('click');
  }

  const cancelFilm = () => {
    wrapper.find('.cancel-button').simulate('click');
  }

  const containsMatchingElement = element => {
    return wrapper.containsMatchingElement(element);
  }

  const submit = () => {
    const submitButton = wrapper.find('.submit-button');
    submitButton.simulate('submit', {
      preventDefault: () => {},
    });
  }

  const changeTitle = title => {
    wrapper.find({id: 'title'}).simulate('change', { target: {value: title} });
  }

  const changeReleaseDate = releaseDate => {
    wrapper.find({type: 'date'}).simulate('change', { target: {value: releaseDate} });
  }

  const changeImdb = imdb => {
    wrapper.find({type: 'number'}).simulate('change', { target: {value: imdb} });
  }

  const changeDirector = director => {
    wrapper.find({id: 'director'}).simulate('change', { target: {value: director} });
  }

  const getLastFilmWrapper = () => {
    return wrapper.find(Film).last();
  }

  return { numberOfFilms, deleteFirst, contains, 
    addButtonExists, addFilm, containsMatchingElement,
    cancelFilm, submit, changeTitle, changeReleaseDate,
    changeImdb, changeDirector, getLastFilmWrapper
  }
}

export default FilmListSelector