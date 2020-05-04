import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import loginLogo from './loginLogo.png';
import './Auth.css'
import UserContext from './UserContext';

const errorMessage = {
    'username':'Please enter a username',
    'password':'Please enter a password',
}

function Login() {
    const [ formData, setFormData] = useState({
        'username':'',
        'password':'',
    });

    const [formError, setFormError] = useState({
        'username':'',
        'password':'',
    });

    const [isDirty, setIsDirty] = useState(false);
    const [isSuccessfull, setIsSuccessfull] = useState(false);
    const [isInvalidData, setIsInvalidData] = useState(false);
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        setIsSuccessfull(false);

        const isInvalid = validateFormData();

        if(!isInvalid) {
            setIsDirty(false);

            const res = await axios('/users?username=' + formData.username + '&password=' + formData.password);
                   
            if(res.data.length) {
                setUser(formData.username);
                localStorage.setItem('user', formData.username);
                setIsSuccessfull(true);

                setTimeout(() => {
                    setIsSuccessfull(false);
                }, 5000);

                history.push('/')
            }

            if(!res.data.length) {
                setIsInvalidData(true); 

                setTimeout(() => {
                    setIsInvalidData(false);
                }, 5000);
            }
        }
    }

    function validateFormData() {
        const inputs = [ 'username', 'password'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessage[input];
                isInvalid = true;
            }
        }

        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e) {
        setIsDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]:e.currentTarget.value,
        })

        const newError={
            ...formError,
            [e.currentTarget.id]:'',
        }

        setFormError(newError);
    }

    return (
        <div className="auth-container">
            { (isSuccessfull ?
                <div className="auth-successfull">
                    { formData.username }, your are successfully logged in!
                </div> 
            :
            null)}

            { (isInvalidData ?
                <div className="auth-successfull">
                    Wrong username or password!
                </div> 
            :
            null)}

            <form className="auth" onSubmit={handleSubmit }>
                <div>
                    <img src={ loginLogo } alt="logo" className="login-logo" />
                </div>

                <div className="auth-form">
                    <label htmlFor="username">Username </label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData.username }
                        type="text" 
                        placeholder="Enter Username" 
                        id="username"
                        />
                    <div>{ formError.username }</div>

                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData.password }
                        type="password" 
                        placeholder="Enter Password" 
                        id="password" 
                        />
                    <div>{ formError.password }</div>

                    <button type="submit" disabled={ !isDirty }>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;