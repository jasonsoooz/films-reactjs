import IdGenerator from './IdGenerator';

describe('GetNextId', () => {
    it('should getNextId correctly for empty array', () => {
        const films = [];

        const nextId = IdGenerator().getNextId(films);

        expect(nextId).toEqual(1);
    });

    it('should getNextId correctly for ordered array', () => {
        const films = [{id: 1}, {id: 2}, {id: 3}];

        const nextId = IdGenerator().getNextId(films);

        expect(nextId).toEqual(4);
    });

    it('should getNextId correctly for unordered array', () => {
        const films = [{id: 5}, {id: 1}, {id: 3}];

        const nextId = IdGenerator().getNextId(films);

        expect(nextId).toEqual(6);
    });

    it('should getNextId correctly for no array', () => {
        const nextId = IdGenerator().getNextId();

        expect(nextId).toEqual(1);
    });
});