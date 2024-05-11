import {useState} from 'react'
import Downloads from './Downloads';
import MetadataDisplays from './MetadataDisplays';
import ArtistModule from './ArtistModule';
import RetryDownload from './RetryDownload';
export default function Modules({trackFromDownload}) {
    const [updateTrack,setUpdatedTrack] = useState(trackFromDownload);
    return(
        <>
            <Downloads track = {updateTrack}/>
            <MetadataDisplays track = {updateTrack}/>
            <ArtistModule track = {updateTrack} />
            <RetryDownload />
        </>
    )
}