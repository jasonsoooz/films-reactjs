import React from 'react';

import '../css/App.css';
import 'semantic-ui-css/semantic.min.css'

import FilmList from './FilmList';

function App() {
  return (
    <div className='App'>
      <FilmList initialFilms={[]} />
    </div>
  );
}

export default App;
