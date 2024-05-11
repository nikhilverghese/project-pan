import {useState} from 'react';
import {Paper, Typography} from '@mui/material/';
import './GetTrackMeta.scss'
import library from './icons/library.svg'
import useSpotifyData from './UseSpotifyData';
import History from './History';
import {getCache, addToCache} from './Cache'
export default function Downloads({track}) {
    const [trackDetails, setTrackDetails] = useState(track)
    const { trackData, artistData } = useSpotifyData(trackDetails);
    addToCache(trackDetails);

    return (
        <div>
            <Paper  elevation={2} style={{ width: 440, height: 455 , position: 'absolute', top: 200, left:'35.5%', backgroundColor:'#262525', borderRadius: 16}}>
            <div className="Song card">
                    {trackData && (
                        <>
                            <img
                                src={trackData.album.images[1].url}
                                alt="Track Cover"
                                style={{ width: '101px', height: '101px', position: 'absolute', top: 20, left: 20, borderRadius: 10 }}
                            />
                            <p style={{
                                position: 'absolute', left: 140, top: -5, fontFamily: 'Gotham', fontWeight: 'bold', color: 'white', fontSize: 30, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',width: 'calc(100% - 160px)'}}>
                                {trackData.name}
                            </p>
                            <p style={{ position: 'absolute', left: 140, top: 42, fontFamily: 'Gotham', fontWeight: '400', color: 'white', fontSize: 22,whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',width: 'calc(100% - 160px)' }}>
                                {trackData.artists[0].name}
                            </p>
                            <p style={{ position: 'absolute', left: 140, top: 78, fontFamily: 'Gotham', fontWeight: '400', color: '#A6A6A6', fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',width: 'calc(100% - 160px)'}}>
                                {trackData.album.name}
                            </p>
                        </>
                    )}
            </div>
            <h1 style={{backgroundImage:`url(${library})`,backgroundRepeat:'no-repeat',paddingLeft:45,position: 'absolute', top: 125,left:20,fontFamily: 'Gotham', fontWeight: 'bold', color: '#A6A6A6', fontSize: 30 }}>Recent Downloads</h1>
                
            </Paper>
            <div className='track-cache' style={{ height:240, width:440, zIndex: 1, position:'relative', top:355, left: 539,overflow: 'auto'}} >
                {getCache() && getCache().toReversed().map((singleTrack,index)=> 
                    index !== 0 ? (
                        <button key={index} onClick={() => setTrackDetails(singleTrack)} style={{width: '370px', display: 'block', position: 'relative',backgroundColor:'white',cursor: 'pointer', border: 'none', marginTop: 10,marginBotton:10}}> 
                            <div style={{ height: 68, position: 'relative' }}>
                                <History track={singleTrack} />
                            </div>
                        </button>
                    ) : null
                )}
            </div>
            <Paper  elevation={2} style={{ width: 440, height: 107 , position: 'absolute', top: 680, left:'35.5%', backgroundColor:'#303030', borderRadius: 16}}>
                <Typography variant="h5" color="white" style={{position: 'absolute', left:19,top:12,fontWeight:'bold'}}>
                    Related Genres
                </Typography>
                <div style={{position:'absolute', left: 19,top:55}}>
                {artistData && artistData.genres.map((genre, index) => 
                   <span key = {index} style={{fontFamily: 'Gotham', fontWeight: '400', color: '#A6A6A6'}}>{genre.charAt(0).toUpperCase()+genre.slice(1)}{(index === artistData.genres.length-1 ? "":",")} </span>
                )}
                </div>
                
            </Paper>
        </div>
        
    )
}