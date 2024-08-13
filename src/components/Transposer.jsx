import {useState} from 'react'
import {Paper, Typography} from '@mui/material/'
import Next from '../assets/icons/next.svg'
export default function Transposer({initialKey, resetNote}) {
    const songKey = initialKey;
    const [transposePos,setTransposePos] = useState(0);
    const [pressedButton,setPressedButton] = useState(null);
    const [transposeNeg,setTransposeNeg] = useState(0);

    const handleButtonClick = (note) => {
        calculateTransposition(note);
    };

    const handleSetResetNote = (event) => {
        resetNote(event);
    }


    return (
        <>
        <Paper  elevation={0} style={{ zIndex: 2,width: 622, height: 504 , position: 'relative',backgroundColor: '#262626', left: 445, top: -100, borderRadius: 16}} >
        <Typography variant='h3' color='white' style={{position: 'absolute', top: 27, left:32, fontWeight: 600}}>Transpose</Typography>
        <div className="Piano">
            {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => 
                 ( 
                 <>
                    <button 
                        key={note} 
                        className={note} 
                        style={{
                            position: "absolute", 
                            width: '59.193px', 
                            height: '275px', 
                            left: getPosition(note), 
                            top: 140, 
                            borderRadius: note === 'C' ? "12px 0 0 12px" : note === 'B' ? "0 12px 12px 0" : 'none',
                            outline: '1px solid #000',
                            border: 'none',
                            cursor: 'pointer',
                            background: pressedButton === note ? '#CC594A' : songKey === note ? '#5D2496' : 'white'
                            }}
                        onClick={() => handleButtonClick(note)}
                    ></button>
                    {songKey === note || pressedButton === note ? <Typography variant='h5' color='white' style={{position: 'absolute', top: 381, left: getPosition(note)+20, fontWeight: 600}}>{note}</Typography> : ''}
                 </>
                    
                )
            )}
            {['Db', 'Eb', 'Gb', 'Ab', 'Bb'].map((note) => 
                 (
                    <button 
                        key={note} 
                        className={note} 
                        style={{
                            position: "absolute", 
                            width: '22.197px', 
                            height: '156.614px', 
                            left: getPosition(note), 
                            top: 140, 
                            borderRadius:"0 0 8px 8px",
                            border:'none',
                            cursor:'pointer',
                            background: pressedButton === note ? '#CC594A' : songKey === note ? '#5D2496' : 'black'
                        }}
                        onClick={() => handleButtonClick(note)}
                    ></button>
                )
            )}
        </div>
        <div style={{ width: 161, height: 63 , position: 'absolute',backgroundColor: 'black', left: 430, top: 21, borderRadius: 12}}>
            <Typography variant='h4' color='white' style={{position: 'absolute', top: 10, left:25,fontWeight:500}}>{transposeNeg}</Typography>
            <Typography variant='h4' color='white' style={{position: 'absolute', top: 10, left:90,fontWeight:500}}>{transposePos}</Typography>
        </div>
        <Typography variant='body1' color='white' style={{position: 'absolute', top: 447, left:158, fontWeight: 300}}>Press the key you want to transpose to</Typography>
        <button style={{position: 'absolute', left: '568px', top: '455px', cursor:'pointer', border:'none',background:'none'}} onClick={()=>handleSetResetNote(null)}>
            <img src={Next} alt="next" style={{position:'relative'}}/>
        </button>
        </Paper>
        
        </>
    )

    function getPosition(note) {
        const notePositions = {
            'C': 104,
            'Db': 152.09,
            'D': 163.19,
            'Eb': 211.29,
            'E': 222.39,
            'F': 281.58,
            'Gb': 329.67,
            'G': 340.77,
            'Ab': 388.87,
            'A': 399.96,
            'Bb': 448.06,
            'B': 459.16
        };
    
        return notePositions[note] || 0;
    }
    
    function calculateTransposition(note) {
        setPressedButton(note);
        const notePositions = {'C': 1, 'Db': 2, 'D': 3, 'Eb': 4, 'E': 5, 'F': 6, 'Gb': 7, 'G': 8, 'Ab': 9, 'A': 10, 'Bb': 11, 'B': 12};
        const currentPos = notePositions[songKey];
        const targetPos = notePositions[note];
    
        const positiveTransposition = (targetPos - currentPos + 12) % 12;
        const negativeTransposition = (currentPos - targetPos + 12) % 12;

        if(currentPos > targetPos) {
            setTransposePos(`+${positiveTransposition}`);
            setTransposeNeg(`-${negativeTransposition}`);
        } else {
            setTransposePos(`-${negativeTransposition}`);
            setTransposeNeg(`+${positiveTransposition}`);
        }
        
    }
}

