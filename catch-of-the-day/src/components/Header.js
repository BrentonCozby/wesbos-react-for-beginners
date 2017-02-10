import React from 'react';

const Header = ({tagline}) => (
    <header className="top">
        <h1>
            Catch
            <span className="ofThe">
                <span className="span of">of</span>
                <span className="the">the</span>
            </span>
            Day
        </h1>
        <h3 className="tagline">
            <span>{tagline}</span>
        </h3>
    </header>
);

Header.propTypes = {
    tagline: React.PropTypes.string
};

export default Header;
