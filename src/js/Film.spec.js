import Film from './Film';
import FilmList from './FilmList';
import FilmSelector from './Film.selector';
import FilmListSelector from './FilmList.selector';

describe('Film', () => {
    it('should have Delete button', () => {
      const filmSelector = FilmSelector(Film);

      expect(
        filmSelector.deleteButtonExists()
      ).toBe(true)
    });

    describe('user clicks delete button', () => {
      it('should delete an item', () => {
        const filmListSelector = FilmListSelector(FilmList);
        const origSize = filmListSelector.numberOfFilms();
  
        filmListSelector.deleteFirst();
  
        const sizeAfterDelete = filmListSelector.numberOfFilms();
        expect(sizeAfterDelete).toEqual(origSize - 1);
      });
    });
});