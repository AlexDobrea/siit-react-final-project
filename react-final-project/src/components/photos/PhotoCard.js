import React from 'react';
import { Link } from 'react-router-dom';

import './Photos.css';

function PhotoCard( { image }) {
    return (
        <Link to={ '/photos/' + image.id } className="photo-card ">
            <img src={ image.largeImageURL } alt="Poster"/>
            <h5>Tags: { image.tags }</h5>
        </Link>
    )
}

export default PhotoCard;