import React from 'react';

import FilmList from './FilmList';
import FilmListSelector from './FilmList.selector';

describe('FilmList', () => {
    let filmListSelector;
  
    beforeEach(() => {
      filmListSelector = FilmListSelector(FilmList);
    });

    it('should have table with header info', () => {
        expect(
          filmListSelector.contains(<th>Film</th>)
        ).toBe(true);
    });

    it('should have Add button', () => {
        expect(
            filmListSelector.addButtonExists()
        ).toBe(true)
    });
});