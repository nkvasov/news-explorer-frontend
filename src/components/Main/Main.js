import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';

import './Main.css';

const Main = () => {
  return (
    <main className="content">
      <SearchForm />
      <SearchResult />
      <Preloader />
      <About />
    </main>
  );
};

export default Main;
