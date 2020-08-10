import React from 'react';
import ReactDom from 'react-dom';

import './customStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App.jsx';


// Will have to somehow get product_id from proxy request to here
ReactDom.render(<App questions={[]} product_id={5}/>, document.getElementById('app'));
