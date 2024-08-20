import {useState} from 'react'
import useSpotifyData from '../utilities/UseSpotifyData'
import {Paper, Typography} from '@mui/material/';
import Transposer from './Transposer';
export default function MetadataDisplays({track,trackAudioData}) {
   // const {trackAudioData} = useSpotifyData(track);
    const pitchMap = new Map([[0, 'C'], [1, 'Db'], [2, 'D'], [3, 'Eb'], [4, 'E'], [5, 'F'], [6, 'Gb'], [7, 'G'], [8, 'Ab'], [9, 'A'], [10, 'Bb'], [11, 'B']]);
    const songKey = trackAudioData && (pitchMap.get(trackAudioData.key));
    const [note, setNote] = useState(null);

    const buttonOnClick = (current) => {
        setNote(current);
    };

    const handleCloseTranspose = (value) => {
        setNote(value);
    };
    return (
        <>
        <button elevation={2} style={{ border: 'none',cursor:'pointer',width: 214, height: 214 , position: 'absolute', top: 200, left:1003, backgroundColor:'#5D2496', borderRadius: 16}} onClick={() => buttonOnClick(songKey)}>
            <Typography variant='h5' color='white' style={{position: 'absolute', top: 10, left:45, fontWeight: 300}}>
            The Key Is
            </Typography>
            <Typography variant='h1' color='white' style={{position: 'absolute', top: 60, left:0, fontWeight: 700, width:'100%',display: 'flex', justifyContent: 'center'}}>
            {songKey}
            </Typography>
        </button>
        <Paper  elevation={2} style={{ width: 214, height: 214 , position: 'absolute', top: 441, left:1003, backgroundColor:'#484848', borderRadius: 16}}>
            <Typography variant='h5' color='white' style={{position: 'absolute', top: 10, left:32, fontWeight: 300}}>
            With BPM Of
            </Typography>
            <Typography variant='h1' color='white' style={{position: 'absolute', top: 60, left:'center', fontWeight: 700, width:'100%',display: 'flex', justifyContent: 'center'}}>
            {trackAudioData && (Math.trunc(trackAudioData.tempo))}
            </Typography>
        </Paper>
        <Paper  elevation={2} style={{ width: 214, height: 107 , position: 'absolute', top: 680, left:1003, backgroundColor:'#430086', borderRadius: 16}}>
            <Typography variant='h5' color='white' style={{position: 'absolute', top: 10, left:26, fontWeight: 400}}>
            The Length Is
            </Typography>
            <Typography variant='h3' color='white' style={{position: 'absolute', top: 43, left:'center', fontWeight: 700, width:'100%',display: 'flex', justifyContent: 'center'}}>
            {trackAudioData && (`${Math.trunc(trackAudioData.duration_ms/60000)}:${Math.trunc((trackAudioData.duration_ms/1000)%60).toString().padStart(2, "0")}`)}
            </Typography>
        </Paper>
        {note && (
                <>
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
                    <Transposer initialKey={note} resetNote={handleCloseTranspose}/>
                </>
            )}
        </>
        
    )
}