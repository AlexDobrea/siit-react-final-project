import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Header from './shared/header/Header';
import PhotoList from './photos/PhotosList';
import PhotoDetails from './photos/PhotoDetails';
import Register from './auth/Register';
import Login from './auth/Login';
import VideosList from './videos/VideosList';
import VideoDetails from './videos/VideoDetails';
import { jsonUrl } from '../config';
import UserContext from './auth/UserContext';
import AddVideo from './videos/AddVideo';
import EditComment from './videos/EditComment';

axios.defaults.baseURL = jsonUrl;

function App() {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user) {
            setUser(user);
        }
    }, []);

    return(
        <UserContext.Provider value={ {user, setUser} }>
            <BrowserRouter>
                <Header />
                <div className="container">
                    <Route exact path="/">
                        <PhotoList />
                    </Route>
                    <Route exact path="/photos/:photoId">
                        <PhotoDetails />
                    </Route>
                    <Route exact path="/videos" >
                        <VideosList />
                    </Route>
                    <Route exact path="/videos/:videoId" >
                        <VideoDetails />
                    </Route>
                    <Route exact path="/comments/:commentId">
                        <EditComment />
                    </Route>
                    <Route exact path="/addVideo">
                        <AddVideo />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;