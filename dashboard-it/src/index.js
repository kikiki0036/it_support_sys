import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";

import reportWebVitals from './reportWebVitals'

import { createStore } from 'redux'

import { Provider } from 'react-redux'

import rootReducer from './redux/reducers'

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import './assets/css/scroll.css'
import './assets/css/style.css'
import './assets/css/datetime-local-style.css'

import { SnackbarProvider, useSnackbar } from 'notistack';
import { Slide } from '@mui/material';

import App from './App';

const store = createStore(
  rootReducer
)

document.title = 'IT SERVICE'
axios.defaults.withCredentials = true;

ReactDOM.render(

  <Provider store={store}>
    <React.StrictMode>

      <SnackbarProvider maxSnack={2}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        TransitionComponent={Slide}
      >

              <App />

      </SnackbarProvider>

    </React.StrictMode>
  </Provider>,
  document.getElementById('root')

);
reportWebVitals();
