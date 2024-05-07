import React, { useState } from 'react';
import axios from 'axios';
import {Paper} from '@mui/material/';

export default function GetTrackMeta() {
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = searchValue;
        const apiUrl = `http://localhost:3001/download-track?trackUrl=${encodeURIComponent(url)}`;
        try {
            const response = await axios.get(apiUrl, { responseType: 'blob' });
            const blob = new Blob([response.data]);
            const { data: { filename } } = response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${filename}.mp3`;
            link.click();
            console.log('Track downloaded successfully');
        } catch (error) {
            console.error('Error occurred while retriving track:', error);
        }
        
    };

    return (
        <Paper elevation={2} style={{ width: 439, height: 131 , position: 'absolute', top: '50%', left: '536px', backgroundColor:'#262525', borderRadius: 16}} >
            <div className="request">
            <div className="form" style={{marginLeft: 8, marginTop: -78}}>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="https://open.spotify.com/track/.."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        name="search"
                        style={{width: 406,height: 46, borderRadius: 16, border: 'none',backgroundColor: '#4F4F4F', fontSize: 18,color: '#FFFFFF',paddingLeft:10,}}
                    />  
                    <button type="submit" style={{width: 416,height: 46, marginLeft: 2, marginTop: 15, borderRadius: 12, border: 'none',backgroundColor: '#5D2496',fontSize: 22,fontFamily: 'Gotham', fontWeight:'600', color: '#FFFFFF', paddingTop:15}}>Download</button>
            </form>
        </div>  
        <style> 
                {` 
                    ::placeholder { 
                        color: #A6A6A6; 
                    }` 
                } 
            </style> 
       </div>
        </Paper>
    );
}