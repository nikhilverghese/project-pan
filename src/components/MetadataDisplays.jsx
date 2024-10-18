import {useState} from 'react'
import useSpotifyData from '../utilities/UseSpotifyData'
import {Paper, Typography} from '@mui/material/';
import Transposer from './Transposer';
import './buttonHover.css'
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
        <div style={{display: "flex", flexDirection:"column", alignItems: "center", width:"100%",marginLeft:"357px",marginTop:"-455px"}}>
        <button className="button" elevation={2} style={{ display:"flex",alignItems:"center",border: 'none',cursor:'pointer',width: 214, height: 214, backgroundColor:'#5D2496', borderRadius: 16, marginBottom: 27}} onClick={() => buttonOnClick(songKey)}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"}}>
                <Typography variant='h5' color='white' style={{fontWeight: 300,marginTop:"-35px"}}>
                The Key Is
                </Typography>
                <Typography variant='h1' color='white' style={{fontWeight: 700,marginTop:"10px"}}>
                {songKey}
                </Typography>
            </div>
        </button>
        <Paper  elevation={2} style={{ width: 214, height: 214 , display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", backgroundColor:'#484848', marginBottom: 26, borderRadius: 16}}>
            <Typography variant='h5' color='white' style={{fontWeight: 300}}>
            With BPM Of
            </Typography>
            <Typography variant='h1' color='white' style={{fontWeight: 700, width:'100%',display: 'flex', justifyContent: 'center'}}>
            {trackAudioData && (Math.trunc(trackAudioData.tempo))}
            </Typography>
        </Paper>
        <Paper  elevation={2} style={{ width: 214, height: 107 , display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:'#430086', borderRadius: 16}}>
            <Typography variant='h5' color='white' style={{fontWeight: 400}}>
            The Length Is
            </Typography>
            <Typography variant='h3' color='white' style={{fontWeight: 700, width:'100%',display: 'flex', justifyContent: 'center'}}>
            {trackAudioData && (`${Math.trunc(trackAudioData.duration_ms/60000)}:${Math.trunc((trackAudioData.duration_ms/1000)%60).toString().padStart(2, "0")}`)}
            </Typography>
        </Paper>
        {note && (
                <>
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
                    <Transposer initialKey={note} resetNote={handleCloseTranspose}/>
                </>
            )}
        </div>
        
    )
}