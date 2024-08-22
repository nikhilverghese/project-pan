import React from 'react'
import useSpotifyData from '../utilities/UseSpotifyData'
import { Paper } from '@mui/material'
import DownloadIcon from '../assets/icons/download.svg'
import downloadFile from '../utilities/DownloadFile';
export default function History({track,index,updateTrack}) {
    const {trackData} = useSpotifyData(track)
    const pressed = (trackToDownload) => {
        downloadFile(trackToDownload,trackData);
    }
    const changeTrack = (newTrack) => {
        updateTrack(newTrack);
    }
    return (
    <div key={index} className='recent song' style={{display:"flex"}}>
        <button onClick={() => changeTrack(track)} style={{width: '370px', display: 'flex', position: 'relative',backgroundColor:'#262525',cursor: 'pointer', border: 'none', marginTop: 10,marginBotton:10}}> 
            <div style={{ height: 68, position: 'relative' }}>
                <div>
                    <Paper  elevation={0} style={{ zIndex: 2,width: 370, height: 70 , position: 'relative',backgroundColor: 'transparent', overflowX: 'hidden'}}>
                        {trackData && (
                            <>
                                <img
                                    src={trackData.album.images[1].url}
                                    alt="Track Cover"
                                    style={{ width: '60px', height: '60px', position: 'absolute', top: 5, left: 20, borderRadius: 10 }}
                                />
                                <p style={{ textAlign: 'left', position: 'absolute', left: 95, top: -6, fontFamily: 'Gotham', fontWeight: '400', color: '#A6A6A6', fontSize: 16, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: 'calc(100% - 180px)', }}>
                                    {trackData.name}
                                </p>
                                <p style={{ position: 'absolute', left: 95, top: 20, fontFamily: 'Gotham', fontWeight: '400', color: '#5D5D5D', fontSize: 16 }}>
                                    {trackData.artists[0].name}
                                </p>
                            </>
                        )}
                    </Paper>
                </div>
            </div>
        </button>
        <button onClick={() => pressed(track)} style={{display: 'flex', backgroundColor:'transparent', cursor: 'pointer', border: 'none', marginTop: 30}}>
                <img src={DownloadIcon} alt="download" style={{width:'25.1px',height:'22px',filter:"brightness(55%)"}}/>
        </button>       
    </div>
    )
}