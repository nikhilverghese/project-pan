import React from 'react';
import { Typography} from '@mui/material';
import './text.css'
export default function Text() {
    return (
        <>
        <div className="fade-in" style={{ position: 'absolute', top: '40px', left: '55px' }}>
        <Typography variant="h3" color="white" fontWeight="bold">
                Welcome To Project Pan.
            </Typography>
            <Typography variant="h5" color="white" style={{marginTop: 15, fontWeight:300}}>
                A tool that allows users to download songs and get metadata. 
            </Typography>
        </div>   
        <div style={{ position: 'relative', top: '900px', display: 'flex', justifyContent: 'center'}}>
            <Typography variant="h6" color="white" fontWeight="light">
            Built by Musicians for Musicians
            </Typography>
        </div>
        </>
    )
}