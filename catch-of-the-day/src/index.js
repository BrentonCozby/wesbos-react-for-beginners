import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Miss} from 'react-router';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => (
    <BrowserRouter>
        <div>
            <Match exactly pattern="/projects/wesbos-react-for-beginners/" component={StorePicker}/>
            <Match pattern="/projects/wesbos-react-for-beginners/store/:storeId" component={App}/>
            <Miss component={NotFound}/>
        </div>
    </BrowserRouter>
);

render(<Root/>, document.getElementById('main'));
