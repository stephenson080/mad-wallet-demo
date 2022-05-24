import '../styles/globals.css'
import '../styles/Register.css'
import "../styles/Nav.css"
import '../styles/Modal.css'
import "../styles/Bank.css"
import type { AppProps } from 'next/app'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware} from 'redux';
import rootReducer from '../store/reducer'

const store = createStore(rootReducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  
}

export default MyApp
