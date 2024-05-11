import React from 'react'
import useSpotifyData from './UseSpotifyData'
import { Paper } from '@mui/material'
export default function History({track}) {
    const {trackData} = useSpotifyData(track)
    return (
        <div>
            <Paper  elevation={0} style={{ zIndex: 2,width: 430, height: 70 , position: 'relative',backgroundColor: 'transparent', overflowX: 'hidden'}}>
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
        
    )
}