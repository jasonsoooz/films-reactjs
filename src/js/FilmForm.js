import React from 'react';

import {Formik,Form,Field,ErrorMessage} from 'formik'

import * as yup from 'yup'

const FilmSchema = yup.object().shape({
    title: yup.string().required('Film is required'),
    releaseDate: yup.string().required('Release Date is required'),
})

const FilmForm = props => {
    const handleCancel = () => {
        props.onAddCancel();
    };

    return(
        <Formik
            initialValues={{ title: '', releaseDate: '', imdbRating: 0, director: '' }}
            validationSchema={FilmSchema}
            onSubmit={(values) => {
                props.onAddSubmit(props.id, values.title, values.releaseDate, values.imdbRating, values.director);
            }}
            render={() => (
                <Form className='ui form'>
                    <h1>Add Film</h1>
                    <input type='hidden' name='id' value={props.id} />  
                    <div className='field'>
                        <label htmlFor='title'>Film</label>
                        <Field name='title'
                            render={({ field }) => <input {...field} id='title' type='text' />}
                        />
                        <ErrorMessage name='title' render={msg => <span className='App-validation-error'>{msg}</span>} />
                    </div>
                    <div className='field'>
                        <label htmlFor='releaseDate'>Release Date</label>
                        <Field name='releaseDate'
                            render={({ field }) => <input {...field} id='releaseDate' type='date' />}
                        />
                        <ErrorMessage name='releaseDate' render={msg => <span className='App-validation-error'>{msg}</span>} />
                    </div>
                    <div className='field'>
                        <label htmlFor='imdbRating'>Imdb Rating</label>
                        <Field name='imdbRating'
                            render={({ field }) => <input {...field} id='imdbRating' type='number' step='0.1' />}
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor='director'>Director</label>
                        <Field name='director'
                            render={({ field }) => <input {...field} id='director' type='text' />}
                        />
                    </div>
                    <button type="submit" className="ui primary button">Submit</button>
                    <button onClick={handleCancel} className='ui button'>Cancel</button>
                </Form>
            )}
        />
    );
}

export default FilmForm;