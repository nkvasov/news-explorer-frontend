import React from 'react';
import './Preloader.css';

const Preloader = (props) => {
  
  return (
    <section className="preloader">
      <div className="circle-preloader"></div>
      <p className="preloader__caption">Идёт поиск новостей...</p>
    </section>
  );
};
export default Preloader;