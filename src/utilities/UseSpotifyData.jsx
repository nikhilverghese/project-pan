import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utilities/GetToken';


export default function useSpotifyData(track) {
    const [trackAudioData, setTrackAudioData] = useState(null);
    const [trackData, setTrackData] = useState(null);
    const [artistData, setArtistData] = useState(null);
    const [relatedArtistData, setRelatedArtistData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            if (!track) {
                setTrackData(null);
                setTrackAudioData(null);
                setArtistData(null);
                setRelatedArtistData(null);
                setError(null)
                return;
            }
            
            try {
                const token = await getToken();
                
                const trackResponse = await axios.get(`https://api.spotify.com/v1/tracks/${track}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                setTrackData(trackResponse.data); 

                const audioFeaturesResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${track}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                setTrackAudioData(audioFeaturesResponse.data); 

                if (trackResponse.data) {
                    const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${trackResponse.data.artists[0].id}`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    setArtistData(artistResponse.data); 
                    const relatedArtistResponse = await axios.get(`https://api.spotify.com/v1/artists/${trackResponse.data.artists[0].id}/related-artists`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    });
                    setRelatedArtistData(relatedArtistResponse.data); 
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [track]);

    return { trackData, trackAudioData, artistData, relatedArtistData, error };
}