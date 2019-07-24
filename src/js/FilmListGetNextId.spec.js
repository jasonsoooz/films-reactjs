import React from 'react';
import FilmList from './FilmList';
import { mount } from 'enzyme';

describe('GetNextId', () => {
    let filmListInstance;
  
    beforeEach(() => {
      filmListInstance = mount(<FilmList />).instance();
    });

    it('should getNextId correctly for empty array', () => {
        const films = [];

        const nextId = filmListInstance.getNextId(films);

        expect(nextId).toEqual(1);
    });

    it('should getNextId correctly for ordered array', () => {
        const films = [{id: 1}, {id: 2}, {id: 3}];

        const nextId = filmListInstance.getNextId(films);

        expect(nextId).toEqual(4);
    });

    it('should getNextId correctly for unordered array', () => {
        const films = [{id: 5}, {id: 1}, {id: 3}];

        const nextId = filmListInstance.getNextId(films);

        expect(nextId).toEqual(6);
    });
});