import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import './style/car-listings.css';
import './style/footer.css';
import './style/listing-details.css';
import './style/login-register.css';
import './style/my-listings.css';
import './style/navigation.css';
import './style/site.css';
import './style/welcome.css';
import 'react-toastify/dist/ReactToastify.min.css'; 

ReactDOM.render((
        <Router>
            <App />
        </Router>
    ), document.getElementById('root'));
registerServiceWorker();
