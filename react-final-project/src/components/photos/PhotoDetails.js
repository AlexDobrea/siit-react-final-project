import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { apiUrl, apiKey } from '../../config';

function PhotoDetails() {
    const { photoId } =useParams();
    const [photo, setPhoto] = useState(null);

    async function getPhoto(id) {
        const res = await axios(apiUrl + '?key=' + apiKey + '&id=' + id);
        setPhoto(res.data.hits);
    }

    useEffect(() => {
        getPhoto(photoId);
    }, [photoId]);

    
    if(photo && photo.length) {
        const item = photo[0];
        // console.log( photo );
        return (
                <div className="photoDetails">
                    <h5>Tags: { item.tags }</h5>
                    <img src={ item.largeImageURL } alt="Poster"/>
                    <p>Views: { item.views } </p>
                    <p>Downloads: { item.downloads } </p>
                    <p>Likes: { item.likes } </p>
                </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default PhotoDetails;