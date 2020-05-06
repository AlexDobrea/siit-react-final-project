import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard';

import './Videos.css';
import FormField from '../shared/FormField';

function VideoList() {
    const [videos, setVideos]=useState([]);

    useEffect(() => {
        getVideoList()
    }, []);
    
    async function getVideoList() {

        const res = await axios('/videos?_start=0&_end=6');
        setVideos(res.data);
    }

    const [values, setValues] = useState({});
    const [status, setStatus] = useState({
        isDirty: []
    })

    async function handleSearchEvent(e) {
        e.preventDefault();

        setStatus({...status, isDirty: []});

        const res = await axios('/videos?_start=0&_end=6&tags_like=' + values.search);
        setVideos(res.data);
    }

    function handleSearchInputChange(name, value) {        
        setValues({...values, [name]: value});
    }

    function handleSearchStatusChange(statusName, inputName) {        
        const newStatus= {...status};
        newStatus[statusName].push(inputName);
        setStatus(newStatus);
    }

    return (
        <>
            <form onSubmit={ handleSearchEvent} className="videoList-search"> 
                <FormField
                    type= "text"
                    name="search"
                    label= "Search by tags"
                    onSearchInputChange={ handleSearchInputChange}
                    onSearchStatusChange={ handleSearchStatusChange }
                />
                <button type="submit" disabled={ !status.isDirty.length }>Search</button>
            </form>

            { videos.length ?
                videos.map(video => <VideoCard film={ video } key={ video.id }/>)
                : 
                <div>Your search did not match any items!</div>
            }
        </>
    )
}

export default VideoList;