import React from 'react';
import './About.css';
import author from '../../images/anteater.jpg';

const About = (props) => {

  return (
    <section className="about">
      <img src={author} className="about__image" alt="фото автора" />
      <div className="about__text-container">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__text">
          Этот проект реализовал обычный муравьед Семён. Всю жизнь он занимался обработкой фотографий. Работал в журналах, где занимался препрессом и немного версткой. Также он сотрудничал с фотографами и участвовал в других проектах. Обычной его работой было собирать коллажи разной сложности по макетам арт-директоров, делать ретушь, применяя в том числе частотное разложение, заниматься цветокоррекцией и цветоделением, готовить файлы к печати.
        </p>
        <p className="about__text">
          Но почему-то он решил, что нужно попробовать себя в другом деле. Так он оказался в Яндекс.Практикуме. В обычные учебные заведения не принимают мурвьедов. Но в Яндексе возможно всё! 
        </p>
        <p className="about__text">
          На каждом этапе обучения ему казалось, что он не справится. Но как-то ему удавалось проскочить. Теперь он немного верстает, чуть-чуть овладел JS, попробовал React и даже Node. Но будущее все равно видится ему туманным. Ведь далеко не каждая компания понимает ценность муравьеда и решится взять его на работу.
        </p>
      </div>

    </section>
  )
};

export default About;