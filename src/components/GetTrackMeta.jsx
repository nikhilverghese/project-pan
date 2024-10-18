import React, { useState } from 'react';
import {Paper} from '@mui/material/';
import search from '../assets/icons/search.svg'
import download from '../assets/icons/download.svg'
import './GetTrackMeta.scss'
import './buttonHover.css'
export default function GetTrackMeta({trackSelected,buttonPressed,inDownload}) {
    const [searchValue, setSearchValue] = useState('');
    const updateTrackOnDownload = (track) => {
        trackSelected(track)
    }
    const updateButton = () => {
        buttonPressed(true)
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = searchValue;
        updateTrackOnDownload(url.split('/').at(-1));
        updateButton();
        setSearchValue('');
        
    };

    return (
        <div style={{display:'flex', alignItems: 'center',justifyContent: 'center'}}>
            <Paper elevation={0} style={{ width: 440, height: 131, marginTop:300, backgroundColor:'#262525', borderRadius: 16, display:"flex"}} >
            <div className="request">
            <div className="form" style={{marginLeft: 8, marginTop: -78}}>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="https://open.spotify.com/track/.."
                        className="input-text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        name="search"
                        style={{
                            width: 406,
                            height: 46,
                            borderRadius: 16,
                            border: 'none',
                            backgroundColor: '#4F4F4F',
                            fontWeight: 500,
                            fontSize: 18,
                            color: '#FFFFFF',
                            paddingLeft: 10,
                            backgroundImage: searchValue ? 'none' : `url(${search})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 370,
                            textOverflow: 'ellipsis', 
                        }}
                    />  
                    <button 
                    className='button'
                        type="submit" 
                        style={{
                            width: 416,
                            height: 46, 
                            marginLeft: 2, 
                            marginTop: 15, 
                            borderRadius: 12, 
                            cursor: inDownload ? '' : 'pointer',
                            border: 'none',
                            backgroundColor: '#5D2496',
                            fontSize: 22,
                            fontFamily: 'Gotham', 
                            fontWeight:'500', 
                            color: '#FFFFFF', 
                            backgroundImage: `url(${download})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 255,
                            paddingRight:45
                        }}
                        disabled={inDownload}
                        >Download</button>
            </form>
        </div>  
       </div>
        </Paper>

        </div>
    );
}
