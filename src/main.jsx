import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
// import store from './Redux/store'
import store from './Redux/Fetures/store'
import NextPrev from './components/Screen/NextAndPrev/NextPrev';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
      {/* <React.StrictMode> */}

      <App  /> 
      {/* <NextPrev/> */}
      {/* </React.StrictMode> */}
  
  </Provider>
   

)
