import FilmList from './FilmList';
import FilmListSelector from './FilmList.selector';
import FilmForm from './FilmForm';
import FilmFormSelector from './FilmForm.selector';

import {cleanup} from '@testing-library/react'

afterEach(cleanup);

describe('FilmList', () => {
    let filmListSelector;

    beforeEach(() => {
      filmListSelector = FilmListSelector(FilmList);
    });

    it('should have table with header info', () => {
      expectTableHeaderInfo(filmListSelector);
    });

    it('should have Add button', () => {
        expect(
          filmListSelector.addButton()
        ).toBeVisible();
    });

    describe('user clicks add button', () => {
      let initialSize;
    
      beforeEach(() => {
        initialSize = filmListSelector.numberOfDeleteButtons();
        filmListSelector.addFilm();
      });

      it('should display Add form', () => {
        const filmFormSelector = FilmFormSelector(FilmForm);

        expect(
          filmFormSelector.filmInput()
        ).toBeVisible();
      });
    
      describe('on Add form', () => {
        it('user clicks cancel should return back to List form', () => {
          filmListSelector.cancel();
    
          expectTableHeaderInfo(filmListSelector);
        });

        it('user clicks cancel should return back to List form with same number of items', () => {
          // initial size (number of delete buttons) needs to be called 
          // in beforeEach (FilmList before addFilm)
          filmListSelector.cancel();

          const sizeAfterCancel = filmListSelector.numberOfDeleteButtons();
          expect(sizeAfterCancel).toEqual(initialSize);
        });

        describe('user clicks Submit button on Add form', () => {
          it('requires film', () => {
            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();

            filmListSelector.submitFilm();
      
            expect(
                filmListSelector.getValidationError('Film is required')
            ).toBeVisible();
          });

          it('requires release date', () => {
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeNull();

            filmListSelector.submitFilm();
      
            expect(
                filmListSelector.getValidationError('Release Date is required')
            ).toBeVisible();
          });

          it('should add new item', () => {
            // initial size (number of delete buttons) needs to be called 
            // in beforeEach (FilmList before addFilm)

            // Add mandatory fields
            filmListSelector.changeTitle('testFilm');
            filmListSelector.changeReleaseDate('1995-01-01');

            filmListSelector.submitFilm();
  
            const sizeAfterSubmit = filmListSelector.numberOfDeleteButtons();
            expect(sizeAfterSubmit).toEqual(initialSize + 1);

            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeNull();
          });

          it('should display new item in form list', () => {
            const expectedTitle = 'testTitle';
            filmListSelector.changeTitle(expectedTitle);
            const expectedReleaseDate = '1995-01-01';
            filmListSelector.changeReleaseDate(expectedReleaseDate);
            const expectedImdbRating = '6.5';
            filmListSelector.changeImdb(expectedImdbRating);
            const expectedDirector = 'testDirector';
            filmListSelector.changeDirector(expectedDirector);
  
            filmListSelector.submitFilm();

            expect(
              filmListSelector.getTextContent(expectedTitle)
            ).toBeVisible();
            expect(
              filmListSelector.getTextContent(expectedReleaseDate)
            ).toBeVisible();
            expect(
              filmListSelector.getTextContent(expectedImdbRating)
            ).toBeVisible();
            expect(
              filmListSelector.getTextContent(expectedDirector)
            ).toBeVisible();
          });

          it('submit with no mandatory fields, then film, requires only release date', () => {
            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();
            filmListSelector.submitFilm();
            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeVisible();

            filmListSelector.changeTitle('testFilm');
            filmListSelector.submitFilm();

            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeVisible();
          });

          it('submit with no mandatory fields, then release date, requires only film', () => {
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeNull();
            filmListSelector.submitFilm();
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeVisible();

            filmListSelector.changeReleaseDate('2010-01-01');
            filmListSelector.submitFilm();

            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeNull();
            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeVisible();
          });
        });
      });
    });
});

const expectTableHeaderInfo = filmListSelector => {
  expect(
    filmListSelector.getTextContent('ID')
  ).toBeVisible();
  expect(
    filmListSelector.getTextContent('Film')
  ).toBeVisible();
  expect(
    filmListSelector.getTextContent('Release Date')
  ).toBeVisible();
  expect(
    filmListSelector.getTextContent('Imdb Rating')
  ).toBeVisible();
  expect(
    filmListSelector.getTextContent('Director')
  ).toBeVisible();
}