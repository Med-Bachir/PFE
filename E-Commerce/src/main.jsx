import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useDispatch, useSelector  } from 'react-redux'
import { store, persistor } from './redux/store.js'
import { toggleTheme } from './redux/theme.js';




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
 

    <App />
   
  </PersistGate>
</Provider>,
)
