import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './App';
import allReducers from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
//===============================================================================================//

const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider
        store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

export default store;