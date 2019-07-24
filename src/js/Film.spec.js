import Film from './Film';
import FilmList from './FilmList';
import FilmSelector from './Film.selector';
import FilmListSelector from './FilmList.selector';

import {cleanup} from '@testing-library/react'

afterEach(cleanup);

describe('Film', () => {
    it('should have Delete button', () => {
      const filmSelector = FilmSelector(Film);

      expect(
        filmSelector.deleteButton()
      ).toBeVisible();
    });

    describe('user clicks delete button', () => {
      it('should delete an item', () => {
        const filmListSelector = FilmListSelector(FilmList);
        const origSize = filmListSelector.numberOfDeleteButtons();
  
        filmListSelector.deleteFirst();
  
        const sizeAfterDelete = filmListSelector.numberOfDeleteButtons();
        expect(sizeAfterDelete).toEqual(origSize - 1);
      });
    });
});