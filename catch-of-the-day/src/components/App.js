import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

const App = (props) => (
    <div className="catch-of-the-day">
        <div className="menu">
            <Header tagline="Fresh Seafood Market"/>
        </div>
        {/* bunch of fish components */}
        <Order/>
        <Inventory/>
    </div>
);

export default App;
