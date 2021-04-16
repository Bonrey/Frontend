import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Just another way of importing custom fonts
const FontFaceObserver = require('fontfaceobserver');

const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap";
link.rel = 'stylesheet';
document.head.appendChild(link);

const addedFont = new FontFaceObserver('Barlow Semi Condensed');
addedFont.load(null, 5000).then(() => {
  document.documentElement.classList.add('Barlow+Semi+Condensed');
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);