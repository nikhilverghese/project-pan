import {useEffect, useState} from 'react';
import {Paper, Typography} from '@mui/material/';
import './GetTrackMeta.scss'
import library from '../assets/icons/library.svg'
import History from './History';
import {getCache, addToCache,clearCache} from '../utilities/Cache'
import "./Downloads.css"

export default function Downloads({track,updateNewTrack,trackData,artistData}) {
    const [trackDetails, setTrackDetails] = useState(track.split("=")[0]);
    const [newTrack, setNewTrack] = useState(null);
    const [cache, setCache] = useState([]);
    const [isCacheCleared, setIsCacheCleared] = useState(false);
   useEffect(() => {
        const updateCache = async () => {
            await addToCache(trackDetails);
            const updatedCache = await getCache();
            setCache(updatedCache);
        };
        updateCache();
    }, [trackDetails]);

    useEffect(()=> {
        const changeTrack = (newTrack) => {
            updateNewTrack(newTrack);
            setTrackDetails(newTrack)
        }
        if(newTrack !== null) {
            changeTrack(newTrack);
        }
    },[newTrack, updateNewTrack])

    useEffect(() => {
        const updateCache = async () => {
            setCache([]);
            const updatedCache = await getCache();
        };
        updateCache();
    }, [isCacheCleared]);

    const triggerClearCache = async () => {
        await clearCache();
        setIsCacheCleared((prev) => !prev);
    }

    return (
        <div style={{display:'flex', alignItems:"center",flexDirection: "column", marginTop:152}}>
            <Paper  elevation={2} style={{ display: "flex", width: 440, height: 455 , top: 200, backgroundColor:'#262525', borderRadius: 16,flexDirection: "column"}}>
            <div className="Song card">
                    {trackData && (
                        <div style={{display:'flex', marginTop:20, marginLeft:20}}>
                            <img
                                src={trackData.album.images[1].url}
                                alt="Track Cover"
                                style={{ width: '101px', height: '101px', borderRadius: 10 }}
                            />
                            <div style={{display:'flex', flexDirection: "column", marginLeft:20, marginTop:-27}}>
                                <p style={{
                                    fontFamily: 'Gotham', fontWeight: 'bold', color: 'white', fontSize: 30, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',width:'280px'}}>
                                    {trackData.name}
                                </p>
                                <p style={{marginTop:-28,fontFamily: 'Gotham', fontWeight: '400', color: 'white', fontSize: 22,whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',width: '280px' }}>
                                    {trackData.artists[0].name}
                                </p>
                                <p style={{marginTop:-17,fontFamily: 'Gotham', fontWeight: '400', color: '#A6A6A6', fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',width: '280px'}}>
                                    {trackData.album.name}
                                </p>
                            </div>
                        </div>
                    )}
            </div>
            <h1 style={{backgroundImage:`url(${library})`,backgroundRepeat:'no-repeat',paddingLeft:45, marginTop:15,marginLeft:20, fontFamily: 'Gotham', fontWeight: 'bold', color: '#A6A6A6', fontSize: 30 }}>Recent Downloads</h1>
            <div className='track-cache' style={{ height:240, width:440, zIndex: 1, marginTop:-10, overflow: 'auto'}} >
                {cache.length > 0 && cache.toReversed().map((singleTrack,index)=> {
                    return singleTrack !== trackDetails ? (
                        <History track={singleTrack} key={index} updateTrack={setNewTrack}/>
                    ) : null
            })}
            {cache.length > 1 && 
                <div style={{display:"flex",justifyContent:"center"}}>
                    <button className="clear" onClick={triggerClearCache} style={{backgroundColor:"#474747",border:"none",borderRadius:"6px",fontFamily:"Gotham",color:"white",padding:"5px",fontWeight:500, marginTop:10, paddingLeft:7,paddingRight:7,cursor:"pointer"}}>
                    Clear Recents
                    </button>
                </div>
                
            }
            </div>
            </Paper>
            <Paper  elevation={2} style={{ width: 440, height: 107 , position: 'absolute', top: 680, backgroundColor:'#303030', borderRadius: 16}}>
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