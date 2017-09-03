import React from 'react';
//import Header from '../shared/header/';
//import Footer from '../shared/footer/';

const app = (props) => (
  <div>
    <div className='main'>
     {props.children}
    </div>
  </div>
);

export default app;
