import React from 'react';

import FilmForm from './FilmForm';
import FilmList from './FilmList';
import FilmFormSelector from './FilmForm.selector';
import FilmListSelector from './FilmList.selector';
import LastFilmSelector from './LastFilm.selector';

describe('FilmForm', () => {
    let filmFormSelector;
  
    beforeEach(() => {
      filmFormSelector = FilmFormSelector(FilmForm);
    });

    it(`should have a 'Title' input text field`, () => {
        expect(
            filmFormSelector.containsMatchingElement(<input id="title" type="text" />)
        ).toBe(true)
    });

    it(`should have a 'Release Date' input text field`, () => {
        expect(
            filmFormSelector.containsMatchingElement(<input type="date" />)
        ).toBe(true)
    });

    it(`should have an 'Imdb Rating' input text field`, () => {
        expect(
            filmFormSelector.containsMatchingElement(<input type="number" />)
        ).toBe(true)
    });

    it(`should have a 'Director' input text field`, () => {
        expect(
            filmFormSelector.containsMatchingElement(<input id="director" type="text" />)
        ).toBe(true)
    });

    it('should have Submit button', () => {
        expect(
            filmFormSelector.containsMatchingElement(<input type="submit" />)
        ).toBe(true)
    });

    it('should have Cancel button', () => {
        expect(
            filmFormSelector.containsMatchingElement(<button>Cancel</button>)
        ).toBe(true)
    });

    describe('user clicks add button', () => {
        let filmListSelector;

        beforeEach(() => {
          filmListSelector = FilmListSelector(FilmList);
          filmListSelector.addFilm();
        });
  
        it('should display Add form', () => {
          expect(
            filmListSelector.containsMatchingElement(<input id="title" type="text" />)
          ).toBe(true)
        });
  
        describe('on Add form', () => {
          it('user clicks cancel should return back to List form', () => {
            filmListSelector.cancelFilm();
  
            expect(
              filmListSelector.contains(<th>Film</th>)
            ).toBe(true);
          });
  
          it('user clicks cancel should return back to List form with same number of items', () => {
            const initialSize = filmListSelector.numberOfFilms();
  
            filmListSelector.cancelFilm();
  
            const sizeAfterCancel = filmListSelector.numberOfFilms();
            expect(sizeAfterCancel).toEqual(initialSize);
          });
        });
  
        describe('user clicks Submit button on Add form', () => {
          it('should add new item', () => {
            const origSize = filmListSelector.numberOfFilms();
  
            filmListSelector.submit();
  
            const sizeAfterSubmit = filmListSelector.numberOfFilms();
            expect(sizeAfterSubmit).toEqual(origSize + 1);
          });
  
          it('should display new item in form list', () => {
            const expectedTitle = 'testTitle';
            filmListSelector.changeTitle(expectedTitle);
  
            const expectedReleaseDate = '01/01/1995';
            filmListSelector.changeReleaseDate(expectedReleaseDate);
  
            const expectedImdbRating = 6.5;
            filmListSelector.changeImdb(expectedImdbRating);
  
            const expectedDirector = 'testDirector';
            filmListSelector.changeDirector(expectedDirector);
  
            filmListSelector.submit();
  
            const lastFilmSelector = LastFilmSelector(filmListSelector.getLastFilmWrapper());
            expect(
                lastFilmSelector.columnEquals('title', <td>{expectedTitle}</td>)
            ).toBe(true);
            expect(
                lastFilmSelector.columnEquals('releaseDate', <td>{expectedReleaseDate}</td>)
            ).toBe(true);
            expect(
                lastFilmSelector.columnEquals('imdb', <td>{expectedImdbRating}</td>)
            ).toBe(true);
            expect(
                lastFilmSelector.columnEquals('director', <td>{expectedDirector}</td>)
            ).toBe(true);
          });
        });
      });
});