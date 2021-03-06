import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {createStore} from 'redux'
import Reducer from './redux/reducer';
import {Provider} from 'react-redux'

const store = createStore(Reducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
    ,
  document.getElementById('root')
);
