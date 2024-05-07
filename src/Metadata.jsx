import React from 'react'

const token = "BQAG-MQ5qfCaOI4m4s8fh-IccUkRIms0HTxt8AgBcYb6_3ShZ5baNJmd5PizDsfptFZCWjCPfPWGr2ixY_QxCAI1SrcB_iTwomBkVCz7CJ5fMXjjSb8";

export default function Metadata() {
    const [trackAudioData, setTrackAudioData] = useState(null);
    const [trackData, setTrackData] = useState(null);
    const handleSubmit = async(event) => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/audio-features/${track}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const responseTrack = await axios.get(`https://api.spotify.com/v1/tracks/${track}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setTrackData(responseTrack.data);
            setTrackAudioData(response.data);
        } catch (error) {
            console.log("Could not fetch Spotify API:", error);
        }
    }
    return (
        <div className="metadata">
            {trackData && trackAudioData && (
                <div className="info">
                    <p className="track-name">Name: {trackData.name}</p>
                    <p className="track-name">BPM: {Math.trunc(trackAudioData.tempo)}</p>
                    <p className="track-name">Key: {trackAudioData.key}</p>
                    <p className="track-name">Album: {trackData.album.name}</p>
                </div>
            )}
        </div>
    )
    
}