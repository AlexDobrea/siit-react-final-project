import React, { useState, useContext} from 'react';
import axios from 'axios';
import loginLogo from './loginLogo.png';
import UserContext from './UserContext';

import './Auth.css';

const errorMessage = {
    'username':'You must enter a username',
    'password':'You must enter a password',
    'retype-password':'You must retype the password',
    'different-password':'You must enter the same password twice!',
}

function Register() {
    const [formData, setFormData] = useState({
        'username':'',
        'password':'',
        'retype-password':'',
    })

    const [formError, setFormError] = useState({
        'username':'',
        'password':'',
        'retype-password':'',
        'different-passwords':'',
    }) 

    const [isDirty, setIsDirty] = useState(false);

    const { setUser } = useContext(UserContext);

    const [isSuccessfull, setIsSuccessfull] = useState(false);

    const [ isGlobalError, setIsGlobalError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        let isInvalid = validateFormData();

        const res = await axios('/users');
        const users = res.data;

        for(const user of users) {            
            if(user.username === formData.username) {
                setIsDirty(false);
                setIsGlobalError(true);

                setTimeout(() => {
                    setIsGlobalError(false);
                }, 5000);
                
                return isInvalid = true;
            }
        }

        if(!isInvalid) {
            setIsDirty(false);
            const data = {...formData};
            delete data['retype-password'];

            await axios('/users', {
                method: 'POST',
                data: JSON.stringify( data ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            
            setUser(formData.username);
            localStorage.setItem('user', formData.username); 

            setIsSuccessfull(true);

            setTimeout(() => {
                setIsSuccessfull(false);
            }, 5000);
        }
    }

    function validateFormData() {
        const inputs = ['username', 'password', 'retype-password'];
        const newError = {...formError};
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessage[input]
                isInvalid = true;
            }
        }

        if(formData.password !== formData['retype-password']) {
            newError['different-passwords'] = errorMessage['different-password'];            
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }
    
    function handleInputChange(e) {
        setIsDirty(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        });

        const newError= {
            ...formError,
            [e.currentTarget.id]:'',
        };
        
        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords'] = '';            
        }

        setFormError(newError);
    }

    return (
        <div className="auth-container">          
            { (isSuccessfull ?
                <div className="auth-successfull">
                    { formData.username }, your username was created successfully!
                </div> 
            :
            null)}

            { (isGlobalError ?
                <div className="auth-successfull">
                    Username already exists!
                </div> 
            :
            null)}
           
            <form className="auth" onSubmit={ handleSubmit }>
                <div>
                    <img src={ loginLogo } alt="logo" className="register-logo" />
                </div>
                <div className="auth-form">
                    <label htmlFor="username">Username</label>
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

                    <label htmlFor="retype-password">Password</label>
                    <input 
                        onChange={ handleInputChange }
                        value={ formData['retype-password'] }
                        type="password" 
                        placeholder="Retype Password" 
                        id="retype-password" 
                    />
                    <div>
                        { formError['retype-password'] }
                        { formError['retype-password'] ? <br /> : ''}
                        { formError['different-passwords'] }
                    </div>

                    <button type="submit" disabled={ !isDirty }>Register</button>
            </div>
            </form>
        </ div>
    );
}

export default Register;