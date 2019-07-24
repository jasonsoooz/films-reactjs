import FilmForm from './FilmForm';
import FilmFormSelector from './FilmForm.selector';

import {cleanup} from '@testing-library/react'

afterEach(cleanup);

describe('FilmForm', () => {
  let filmFormSelector;

  beforeEach(() => {
    filmFormSelector = FilmFormSelector(FilmForm);
  });

  it(`should have a 'Title' input text field`, () => {
      expect(
          filmFormSelector.filmInput()
      ).toHaveAttribute('type', 'text');
  });

  it(`should have a 'Release Date' input text field`, () => {
      expect(
          filmFormSelector.releaseDateInput()
      ).toHaveAttribute('type', 'date');
  });

  it(`should have an 'Imdb Rating' input text field`, () => {
      expect(
          filmFormSelector.imdbRatingInput()
      ).toHaveAttribute('type', 'number')
  });

  it(`should have a 'Director' input text field`, () => {
      expect(
          filmFormSelector.directorInput()
      ).toHaveAttribute('type', 'text')
  });

  it('should have Submit button', () => {
      expect(
          filmFormSelector.submitButton()
      ).toBeVisible()
  });

  it('should have Cancel button', () => {
      expect(
          filmFormSelector.cancelButton()
      ).toBeVisible()
  });
});