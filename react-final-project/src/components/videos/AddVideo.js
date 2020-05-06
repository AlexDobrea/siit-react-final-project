import React, { useContext, useState } from 'react';
import UserContext from '../auth/UserContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const errorMessages = {
    'tags': 'Please enter video tags',
    'url': 'Please enter a full url',
    'type': 'Please enter video type', 
    'validUrl': 'Please enter a valid url',
};

export default function AddVideo() {
    const { user } = useContext(UserContext);
    const history = useHistory();

    const [isDirty, setIsDirty]= useState(false);

    const [newVideo, setNewVideo] = useState({
        'tags': '',
        'url': '',
        'type': '',
    });

    const [error, setError]=useState({
        'tags': '',
        'url': '',
        'type': '',
        'validUrl': '',
    });

    async function handleSubmit(e) {
        e.preventDefault();

       const isInvalid = validateData();

       if(!isInvalid) {
            setIsDirty(false);
        
            await Axios('/videos', {
                method: 'POST',
                data: JSON.stringify( newVideo ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            history.push('/videos');
        }

    }

    function validateData() {
        const inputs = ['tags', 'url', 'type'];
        const newError={...error};
        let isInvalid = false;

        for(const input of inputs) {
            if(!newVideo[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if(!(/((http|ftp|https):\/\/)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/i.test(newVideo.url))) {
            newError.validUrl = errorMessages['validUrl']; 
            isInvalid = true;   
        }

        setError(newError);

        return isInvalid;
    }

    function handleInputChange(e) {
        setIsDirty(true);

        setNewVideo({
            ...newVideo,
            username: user,
            [e.currentTarget.id]: e.currentTarget.value,
        });

        const newError = {
            ...error,
            [e.currentTarget.id]:'',
        }

        if(e.currentTarget.id === 'url') {
            newError.validUrl = '';
        }

        setError(newError);
    }

    return(
        <div className="addVideo-container">
            <form onSubmit={ handleSubmit } className="addVideo-form" noValidate> 
                <label htmlFor="tags">Tags:</label>
                <input 
                    onChange={ handleInputChange }
                    value={ newVideo.tags }
                    type="text" 
                    id="tags" 
                    placeholder="Enter video tags"
                />
                <div>{ error.tags }</div>

                <label htmlFor="url">Url:</label>
                <input 
                    onChange={ handleInputChange }
                    value={ newVideo.url }
                    type="url" 
                    id="url" 
                    placeholder="https://example.com"
                />
                <div> 
                    { error.url } 
                    { error.url ? <br/> : ''}
                    { error.validUrl}
                </div>

                <label htmlFor="type">Type:</label>
                <input 
                    onChange={ handleInputChange }
                    value={ newVideo.type }
                    type="text" 
                    id="type" 
                    placeholder="Enter video type"
                />
                <div>{ error.type }</div>

                <label htmlFor="username">Username:</label>
                <input 
                    onChange={ handleInputChange }
                    type="text" 
                    id="username" 
                    placeholder={ user } 
                    disabled
                />
                <button type="submit" disabled={ !isDirty }>Add video</button>
            </form>
        </div>
    )
}