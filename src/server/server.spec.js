import Client from './client';
import ClientPromise from './clientPromise'

const fetch = require('node-fetch');

describe('Client', () => {

    let client;
    const url = 'http://localhost:3005/api/films';
    
    beforeEach(() => {
        client = new Client();
    });

    it.skip('should get films with Promise from back end', () => {
        const client = new ClientPromise();

        return client.getFilms(url, 
            (films) => {
                // console.log(films);
                expect(films.length).toBeGreaterThanOrEqual(0);
            }
        );
    });

    it.skip('should create and delete film on back end', async () => {
        let films = await client.getFilms(url);
        const origFilmSize = films.length;

        const newFilm = {
            id: 100,
            title: 'Test title',
            releaseDate: '2016-01-01',
            imdbRating: 7.8,
            director: 'Test director'
        }
        await client.addFilm(url, newFilm);

        films = await client.getFilms(url);
        const addedFilmSize = films.length;
        expect(addedFilmSize).toEqual(origFilmSize + 1);

        await client.deleteFilm(url, newFilm);

        films = await client.getFilms(url);
        const deletedFilmSize = films.length;
        expect(deletedFilmSize).toEqual(origFilmSize);
    });
});