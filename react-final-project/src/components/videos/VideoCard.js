import React from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

import './Videos.css';

function VideoCard( { film }) {
    // console.log(film);
    return (
        <div className="video-card">
            <ReactPlayer url={film.url} />
            <h5>Tags: { film.tags }</h5>
            <Link to={ '/videos/' + film.id }>Details</Link>
        </div>
    )
}

export default VideoCard;