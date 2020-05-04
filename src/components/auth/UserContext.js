import React from 'react';

const UserContext= React.createContext( {
    user: null,
    setuser: () => {},
});

export default UserContext;