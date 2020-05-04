import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from './UserContext';


export default function PrivateRoute({ children, ...rest }) {
    let { user } = useContext(UserContext);
    if (!user) {
        user = localStorage.getItem('user');
    }
    return (
        <Route
        {...rest}
        render={({ location }) =>
            user ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
}