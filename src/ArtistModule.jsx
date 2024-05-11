import React from 'react'
import useSpotifyData from './UseSpotifyData'
import {Paper, Typography} from '@mui/material/';

export default function ArtistModule({track}) {
    const {relatedArtistData} = useSpotifyData(track);

    return (
        <>

        <Paper  elevation={2} style={{ width: 214, height: 455 , position: 'absolute', top: 200, left:295, backgroundColor:'#2B2B2B', borderRadius: 16}}>
            <Typography variant='h5' color='white' style={{ position: 'absolute', width:'100%',display:'flex',justifyContent:'center',top:10, fontWeight:'bold'}}>
                Similar Artists
            </Typography>
            <div style={{position: 'absolute',height: '440px', width: '193px',width:'100%',top:55}}>
                
                {relatedArtistData && relatedArtistData.artists.slice(0,4).map((artist,index) => (
                    <div key={index} style={{ width: 74, height: 100, position: 'relative' }}>
                        <img
                            src={artist.images[0].url}
                            alt="Track Cover"
                            style={{ width: '73px', height: '73px', position: 'absolute', left: 10, borderRadius: '100px' }}
                        />
                        <p style={{
                            position: 'absolute', left: 92, top:-2,fontFamily: 'Gotham', fontWeight: '400', color: 'white', fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',width: 'calc(150%)'}}>
                            {artist.name}
                        </p>
                        <p style={{ position: 'absolute', left: 92, top: 28, fontFamily: 'Gotham', fontWeight: '400', color: '#9F9F9F', fontSize: 10,width: 'calc(100%)',whiteSpace: 'nowrap' }}>
                            {artist.followers.total >= 1000000 ? 
                                `${Math.trunc(artist.followers.total / 1000000)}.${Math.trunc((relatedArtistData.artists[1].followers.total % 1000000) / 100000)}M` :
                                artist.followers.total >= 100000 ?
                                `${Math.trunc(artist.followers.total / 1000)}K` :
                                artist.followers.total.toLocaleString()
                            } total followers
                        </p>
                    </div>
                ))}
            </div>
        </Paper>
        
        </>
    )
}