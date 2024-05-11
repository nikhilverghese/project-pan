import React from 'react'
import useSpotifyData from './UseSpotifyData'
import {Paper, Typography} from '@mui/material/';

export default function MetadataDisplays({track}) {
    const {trackAudioData} = useSpotifyData(track);
    const pitchMap = new Map([[0, 'C'], [1, 'Db'], [2, 'D'], [3, 'Eb'], [4, 'E'], [5, 'F'], [6, 'Gb'], [7, 'G'], [8, 'Ab'], [9, 'A'], [10, 'Bb'], [11, 'B']]);

    return (
        <>
        <Paper  elevation={2} style={{ width: 214, height: 214 , position: 'absolute', top: 200, left:1003, backgroundColor:'#5D2496', borderRadius: 16}}>
            <Typography variant='h5' color='white' style={{position: 'absolute', top: 10, left:45, fontWeight: 300}}>
            The Key Is
            </Typography>
            <Typography variant='h1' color='white' style={{position: 'absolute', top: 60, left:'center', fontWeight: 700, width:'100%',display: 'flex', justifyContent: 'center'}}>
            {trackAudioData && (pitchMap.get(trackAudioData.key))}
            </Typography>
        </Paper>
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
        </>
    )
}