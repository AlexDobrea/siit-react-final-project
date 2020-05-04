import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Axios from 'axios';
import './Videos.css';

export default function EditComment() {
    const { commentId } = useParams();
    const [comment, setComment] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [redirect, setRedirect] = useState(false);   

    async function getCommentById(id) {
        const res = await Axios ('/comments/'+ id);
        console.log(res.data);
        setComment(res.data);
    }

    useEffect(() => {
        getCommentById(commentId)
    }, [commentId]);

    async function handleChangeEvent(e) {
        e.preventDefault();

        setIsDirty(false);

        console.log(comment);
        
        await Axios ( '/comments/'+ commentId, {
            method: 'PATCH',
            data: ({'body': comment.body})
        });

        setRedirect(true);
    }

    function handleCommentInputChange(e) {
        setIsDirty(true);

        setComment({
            ...comment,
            body: e.currentTarget.value
        });
    }
    
    if(redirect) {
        return <Redirect to={'/videos/' + comment.videoId} />
    }

    return(
        <div className="editComment-container">
            <h1> Edit comment "{ comment.body }"</h1>
            <form onSubmit={ handleChangeEvent}>
                <label htmlFor="comment"></label>
                <input
                    onChange={ handleCommentInputChange }
                    value={ comment.body }
                    type="text"
                    id="comment"
                    placeholder="Enter comment"
                />

                <button type="submit" disabled={ !isDirty }>Save</button>
            </form>
        </div>
    )
}