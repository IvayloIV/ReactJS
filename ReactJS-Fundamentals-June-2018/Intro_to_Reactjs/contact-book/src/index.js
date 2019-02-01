import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let rerender = ReactDOM.render;

ReactDOM.render(App(), document.getElementById('root'));

export default rerender;