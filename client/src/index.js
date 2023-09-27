import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div class="overlay-container">
      <div class="content">
        <App />
      </div>
      <div class="custom-scrollbar">
        <div class="scrollbar-thumb"></div>
      </div>
    </div>
  </React.StrictMode>
);


