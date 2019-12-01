import FilmList from './FilmList';
import FilmListSelector from './FilmList.selector';

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

    it('should have Delete buttons', () => {
      expect(
        filmListSelector.numberOfDeleteButtons()
      ).toEqual(2);
    });

    it('user clicks delete button should delete an item', () => {
      const origSize = filmListSelector.numberOfDeleteButtons();

      filmListSelector.deleteFirst();

      const sizeAfterDelete = filmListSelector.numberOfDeleteButtons();
      expect(sizeAfterDelete).toEqual(origSize - 1);
    });

    it('click imdb rating column header once should sort by ascending', () => {
      filmListSelector.clickImdbRatingHeader();

      const rows = document.body.querySelectorAll('tbody tr');
      expect(rows[0].children[3].innerHTML).toEqual('6.9');
      expect(rows[1].children[3].innerHTML).toEqual('7.3');
    });

    it('click imdb rating column header twice should sort by descending', () => {
      filmListSelector.clickImdbRatingHeader();
      filmListSelector.clickImdbRatingHeader();

      const rows = document.body.querySelectorAll('tbody tr');
      expect(rows[0].children[3].innerHTML).toEqual('7.3');
      expect(rows[1].children[3].innerHTML).toEqual('6.9');
    });

    it('click imdb rating column header third time should sort by orig order', () => {
      filmListSelector.clickImdbRatingHeader();
      filmListSelector.clickImdbRatingHeader();
      filmListSelector.clickImdbRatingHeader();

      const rows = document.body.querySelectorAll('tbody tr');
      expect(rows[0].children[3].innerHTML).toEqual('7.3');
      expect(rows[1].children[3].innerHTML).toEqual('6.9');
    });

    it('type in ID filter column filters records', () => {
      expect(filmListSelector.numberOfDeleteButtons()).toEqual(2);
      
      filmListSelector.filterId('1');

      expect(filmListSelector.numberOfDeleteButtons()).toEqual(1);
      expect(filmListSelector.getTextContent('1')).toBeVisible();
      expect(filmListSelector.getTextContent('Spiderman')).toBeVisible();
    });

    describe('user clicks add button', () => {
      let initialSize;
    
      beforeEach(() => {
        initialSize = filmListSelector.numberOfDeleteButtons();
        filmListSelector.addFilm();
      });

      it('should display Add form', () => {
        expect(
          filmListSelector.filmInput()
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
          it('requires film', async () => {
            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();

            await filmListSelector.submitFilm();
      
            expect(
                filmListSelector.getValidationError('Film is required')
            ).toBeVisible();
          });

          it('requires release date', async () => {
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeNull();

            await filmListSelector.submitFilm();
      
            expect(
                filmListSelector.getValidationError('Release Date is required')
            ).toBeVisible();
          });

          it('should add new item', async () => {
            // initial size (number of delete buttons) needs to be called 
            // in beforeEach (FilmList before addFilm)

            // Add mandatory fields
            filmListSelector.changeTitle('testFilm');
            filmListSelector.changeReleaseDate('1995-01-01');

            await filmListSelector.submitFilm();
  
            const sizeAfterSubmit = filmListSelector.numberOfDeleteButtons();
            expect(sizeAfterSubmit).toEqual(initialSize + 1);

            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeNull();
          });

          it('should display new item in form list', async () => {
            const expectedTitle = 'testTitle';
            filmListSelector.changeTitle(expectedTitle);
            const expectedReleaseDate = '1995-01-01';
            filmListSelector.changeReleaseDate(expectedReleaseDate);
            const expectedImdbRating = '6.5';
            filmListSelector.changeImdb(expectedImdbRating);
            const expectedDirector = 'testDirector';
            filmListSelector.changeDirector(expectedDirector);
  
            await filmListSelector.submitFilm();

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

          it('submit with no mandatory fields, then film, requires only release date', async () => {
            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();
            await filmListSelector.submitFilm();
            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeVisible();

            filmListSelector.changeTitle('testFilm');
            await filmListSelector.submitFilm();

            expect(
              filmListSelector.getValidationError('Film is required')
            ).toBeNull();
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeVisible();
          });

          it('submit with no mandatory fields, then release date, requires only film', async () => {
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeNull();
            await filmListSelector.submitFilm();
            expect(
              filmListSelector.getValidationError('Release Date is required')
            ).toBeVisible();

            filmListSelector.changeReleaseDate('2010-01-01');
            await filmListSelector.submitFilm();

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