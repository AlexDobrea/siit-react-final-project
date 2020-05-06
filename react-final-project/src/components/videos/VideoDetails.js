import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import UserContext from '../auth/UserContext';
import Comments from './Comments';
import './Videos.css';


function VideoDetails() {
    const { videoId } = useParams();

    const [video, setVideo] = useState(null);
    const [isDirty, setIsDirty] = useState(false);
    const [comment, setComment] = useState('');
    const [getComments, setGetComments] = useState('');
    const { user } = useContext(UserContext);

    const [redirect, setRedirect ] = useState(false);

    async function getVideoById(id) {
        const res = await axios ('/videos/' + id);
        setVideo(res.data)
    }

    useEffect(() => {
        getVideoById(videoId)
    }, [videoId]);

    async function getVideoComments(id) {
        const res = await axios ('/comments?videoId=' + id);
        setGetComments(res.data);
    }

    useEffect(() => {
        getVideoComments(videoId)
    }, [videoId]);

    async function handleDelete() {
        await axios('/videos/' + videoId, {
            method:'DELETE'
        });

        setRedirect(true);
    }
    
    async function handleAddComment(e) {
        e.preventDefault();

        setIsDirty(false);
       
        const com = await axios('/comments' , {
            method: 'POST',
            data: ({ 
                'body' : comment.comment,
                'userName': user,
                'videoId': videoId
            }),
        }).then(res => res.data);
        setGetComments([...getComments, com]);
    }

    function handleInputChange(e) {
        setIsDirty(true);

        setComment({
            ...comment,
            comment: e.currentTarget.value
        })
    }

    if(redirect) {
        return <Redirect to='/videos' />
    }

    if(video) {
        return (
            <div className="videoDetails">
                <h3>Tags: { video.tags }</h3>
                <ReactPlayer className="video" url={ video.url } controls />
                <p>Views: { video.views } </p>
                <p>Downloads: { video.downloads } </p>
                <p>Likes: { video.likes } </p>
                { (user ?
                    <>
                        <form onSubmit={ handleAddComment } className="videoDetails-addComments">
                            <label htmlFor="comment"></label>
                            <input 
                                onChange={ handleInputChange }
                                value={ comment.value}
                                type="text" 
                                id="comment" 
                                placeholder="Add video comment . . ."
                            />
                            <button type="submit" disabled={ !isDirty }> Add comment</button>
                        </form>
                        <div className="videoDetails-delete">
                            <button onClick={ handleDelete} type="submit">
                                Delete video
                            </button>
                        </div>
                    </>
                    :
                    null)
                }

                <h4> Comments</h4>
                {getComments.length ?
                    getComments.map(comment => <Comments opinion={ comment } key={comment.id}/>)
                    :
                    ''
                }
            </div>
        )
    } else {
        return <p> Loading... </p>
    }
}

export default VideoDetails;