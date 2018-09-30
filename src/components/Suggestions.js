import React from 'react';
import UnorderedList from './UnorderedList';

const Suggestions = ({ suggestions: { suitable, unsuitable } }) => {
    const suitableVenues = suitable.map(item =>
        <UnorderedList content={item} key={item.name} />
    );

    const unsuitableVenues = unsuitable.map(item =>
        <UnorderedList content={item} children={item.problems} key={item.name} />
    );

    return (
        <div className="suggestions">
            {suitableVenues.length ?
                <div className="panel suitable">
                    <h3>Places to go:</h3>
                    <ul>{suitableVenues}</ul>
                </div>
            : null}
            {unsuitableVenues.length ?
                <div className="panel unsuitable">
                    <h3>Places to avoid:</h3>
                    <ul>{unsuitableVenues}</ul>
                </div>
            : null}
        </div>
    );
};

export default Suggestions;
