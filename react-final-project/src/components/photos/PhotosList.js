import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCard from './PhotoCard';
import { apiUrl, apiKey } from '../../config';
import FormField from '../shared/FormField';

function PhotoList() {
    const [photos, setPhotos]=useState([]);

    useEffect(() => {
        getPhotosList()
    }, []);
    
    async function getPhotosList() {

        const res = await axios(apiUrl + '/?key=' + apiKey);
        setPhotos(res.data.hits);
    }

    // const [searchData, setSearchData] = useState([]);
    // const [isDirty, setIsDirty]=useState(false);
   
    // async function handleSearch(e) {
    //     e.preventDefault(); 

    //     setIsDirty(false);

    //     console.log(searchData);

    //     const res= await axios(apiUrl + '/?key=' + apiKey + '&q=' + searchData.search );
    //     console.log(res.data.hits);
        
    //     setPhotos(res.data.hits);         
    // }

    // function searchFilterChange(e) {
    //     setIsDirty(true);
    //     setSearchData({
    //         ...searchData,
    //         [e.currentTarget.id]: e.currentTarget.value,
    //     });
    // }   
    
    const [values, setValues] = useState({});
    const [status, setStatus] = useState({
        isDirty: [],
    });

    async function handleSearchEvent(e) {
        e.preventDefault();

        setStatus({...status, isDirty: []});     

        const res= await axios(apiUrl + '/?key=' + apiKey + '&q=' + values.search);
        setPhotos(res.data.hits);
    }

    function handleSearchInputChange(name, value) {
        setValues({...values, [name]: value})
    }
    
    function handleSearchStatusChange(statusName, inputName) {
     
        const newStatus = {...status};
        newStatus[statusName].push(inputName);

        setStatus(newStatus);
    }

    return (
        <>
            {/* <form onSubmit={ handleSearch} className="photoList-search"> 
                <input 
                    onChange={ searchFilterChange }
                    value={ searchData.value }
                    type="text" 
                    id= "search"
                    placeholder="Search by tags" />
                <button type="submit" disabled={ !isDirty }>Search</button>
            </form> */}

            <form onSubmit={ handleSearchEvent } className="photoList-search">
                <FormField 
                    type="text"
                    name="search"
                    label="Search by tags"
                    onSearchInputChange={ handleSearchInputChange }
                    onSearchStatusChange= { handleSearchStatusChange}
                />
                <button type="submit" disabled={ !status.isDirty.length }>Search</button>
            </form>

            { photos.length ? 
                photos.map(photo => <PhotoCard image={ photo } key={ photo.id }/>)
                :
                <div>Your search did not match any items!</div>
            }
        </>
    )

}

export default PhotoList;