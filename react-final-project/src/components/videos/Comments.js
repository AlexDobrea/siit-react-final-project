import React, { useContext } from 'react';
import './Videos.css';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

export default function Comments({ opinion }){  
    const { user } = useContext(UserContext);

    return (
        <div className="videoDetails-comments">
            <p >
                { opinion.userName } : { opinion.body } 
            </p>
            { user ?
                <Link to={'/comments/' + opinion.id}><button>Edit comment</button></Link>
                :
                ''
            }
        </div>
    )
}