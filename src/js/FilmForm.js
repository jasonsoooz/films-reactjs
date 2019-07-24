import React, { useState } from 'react';

const FilmForm = props => {

    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [imdbRating, setImdbRating] = useState(0);
    const [director, setDirector] = useState('');
    const [isFilmInValid, setIsFilmInValid] = useState(false);
    const [isReleaseDateInValid, setIsReleaseDateInValid] = useState(false);

    const handleCancel = event => {
        props.onAddCancel();
        event.preventDefault();
    };

    const handleAddSubmit = event => {
        if (title !== '' && releaseDate !== '') {
            props.onAddSubmit(props.id, title, releaseDate, imdbRating, director);
        }

        if (title === '') {
            setIsFilmInValid(true);
        } else {
            setIsFilmInValid(false);
        }
        if (releaseDate === '') {
            setIsReleaseDateInValid(true);
        } else {
            setIsReleaseDateInValid(false);
        }
        event.preventDefault();
    }

    const updateTitle = evt => setTitle(evt.target.value)
    const updateReleaseDate = evt => setReleaseDate(evt.target.value);
    const updateImdbRating = evt => setImdbRating(evt.target.value);
    const updateDirector = evt => setDirector(evt.target.value);

    return(
        <form onSubmit={handleAddSubmit} className='ui form'>
            <h1>Add Film</h1>
            <input type='hidden' name='id' value={props.id} />  
            <div className='field'>
                <label htmlFor='title'>Film</label>
                <input id='title' type='text' value={title} onChange={evt => updateTitle(evt)} />
                {isFilmInValid && <span className='App-validation-error'>Film is required</span>}
            </div>
            <div className='field'>
                <label htmlFor='releaseDate'>Release Date</label>
                <input id='releaseDate' type='date' value={releaseDate} onChange={evt => updateReleaseDate(evt)} />
                {isReleaseDateInValid && <span className='App-validation-error'>Release Date is required</span>}
            </div>
            <div className='field'>
                <label htmlFor='imdbRating'>Imdb Rating</label>
                <input id='imdbRating' type='number' step='0.1' value={imdbRating} onChange={evt => updateImdbRating(evt)} />
            </div>
            <div className='field'>
                <label htmlFor='director'>Director</label>
                <input id='director' type='text' value={director} onChange={evt => updateDirector(evt)} />
            </div>
            <input type='submit' value='Submit' className='ui primary button' />&nbsp;
            <button onClick={handleCancel} className='ui button'>Cancel</button>
        </form>
    );
}

export default FilmForm;