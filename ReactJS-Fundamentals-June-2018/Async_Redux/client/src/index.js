import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';

import './index.css';
import './style/site.css';
import './style/notifications.css';
import './style/Preloader.css';
import 'react-toastify/dist/ReactToastify.min.css'; 

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>), document.getElementById('root'));
registerServiceWorker();
