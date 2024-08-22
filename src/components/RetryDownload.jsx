import React from 'react'
import {Paper, Typography} from '@mui/material/';
import Download from '../assets/icons/download.svg'
import downloadFile from '../utilities/DownloadFile';
export default function RetryDownload({track, trackData}) {
    const pressed = () => {
        downloadFile(track,trackData);
    }
    return (
        <Paper  elevation={2} style={{ width: 214, height: 107 , position: 'absolute', top: 680, left:295, backgroundColor:'#5D2496', borderRadius: 16}}>
        <Typography variant='h5' color='white' style={{position: 'absolute', top: 10, left:17, fontWeight: 'bold',lineHeight:1.1}}>
        Retry Download.
        </Typography>
        <Typography color='white' style={{position: 'absolute', top: 72, left:17, fontWeight: '300',lineHeight:1.1, fontSize:10, width:'80%'}}>
        Didn’t automatically download? Try again here.
        </Typography>
        <button onClick={pressed} style={{position: 'absolute', top: 20, left:161, backgroundColor:'transparent',cursor: 'pointer', border: 'none'}}>
            <img src={Download} alt="download" style={{width:'32px',height:'28px'}}/>
        </button>
    </Paper>
    )
}