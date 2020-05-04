import React, { useState } from 'react';

export default function SearchField({ type, name, label, onSearchInputChange, onSearchStatusChange}) {
    const [value, setValue] = useState('');

    function handleSearchInputChange(e) {
        onSearchStatusChange('isDirty', name);
        onSearchInputChange(name, e.currentTarget.value);
        setValue(e.currentTarget.value);
    }

    return( 
        <>
            <label htmlFor={ name }></label>
            <input 
                onChange={ handleSearchInputChange }
                value={ value }
                type= { type } 
                id= { name }
                placeholder= { label } 
            />
        </>
    )
}