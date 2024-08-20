import {useState} from 'react'
import Downloads from './Downloads';
import MetadataDisplays from './MetadataDisplays';
import ArtistModule from './ArtistModule';
import RetryDownload from './RetryDownload';
import UseSpotifyData from '../utilities/UseSpotifyData'
export default function Modules({trackFromDownload}) {
    const [updateTrack,setUpdatedTrack] = useState(trackFromDownload);
    const { trackData,artistData,trackAudioData,relatedArtistData} = UseSpotifyData(updateTrack); 
    const changeTrack = (newTrack) => {
        setUpdatedTrack(newTrack);
    }
    return(
        <>
            <Downloads track = {updateTrack} updateNewTrack = {changeTrack} trackData={trackData} artistData={artistData}/>
            <MetadataDisplays track = {updateTrack} trackAudioData={trackAudioData}/>
            <ArtistModule track = {updateTrack} relatedArtistData={relatedArtistData}/>
            <RetryDownload />
        </>
    )
}