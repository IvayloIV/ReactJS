import ReactDOM from 'react-dom';
import './style/app.css';
import './style/index.css';
import App from './App';

export default function render() {
    ReactDOM.render(App(), document.getElementById('root'));
}

render();
