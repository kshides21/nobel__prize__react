import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const loadingSpinnerHome = document.getElementById('home__loading--spinner');

function onSearchHome() {
  loadingSpinnerHome.style.display = "block";
  setTimeout(() => {
  window.location.replace("http://127.0.0.1:5500/scientists.html#features");
  loadingSpinnerHome.style.display = "none";
}, 1200);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
