import React from 'react';
import './Videos.css';
import { Link } from 'react-router-dom';

export default function Comments({ opinion }){  
    return (
        <div className="videoDetails-comments">
            <p >
                { opinion.userName } : { opinion.body } 
            </p>
            <Link to={'/comments/' + opinion.id}><button>Edit comment</button></Link>
        </div>
    )
}