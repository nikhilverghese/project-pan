import React from 'react'
import Arrow from '../assets/icons/arrow.svg'
export default function NextDownload({toggle}) {
    const toggleTrack = (track) => {
        toggle(track)
    }
    return (
        <button onClick={() => toggleTrack(null)} style={{position: 'absolute', left:650, top: 824,width: "210px", height: "52px", backgroundColor: "#5D2496",  fontFamily: 'Gotham', fontSize: '18px', fontWeight:'bold',cursor: 'pointer', border: 'none',borderRadius: '16px',color:'white'}}>
            <span style={{position:'relative', left:0,top:-4}}>Download Next</span>
            <img src={Arrow} alt="arrow" style={{position:'relative',marginLeft:10,top:2.5}}/>
        </button>
    )
}