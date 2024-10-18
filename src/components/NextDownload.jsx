import React from 'react'
import Arrow from '../assets/icons/arrow.svg'
import './buttonHover.css'
export default function NextDownload({toggle}) {
    const toggleTrack = () => {
        toggle(null);
    }
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"145px"}}>
            <button className="button" onClick={toggleTrack} style={{display:"flex",alignItems:"center",justifyContent:"center",width: "210px", height: "52px", backgroundColor: "#5D2496",  fontFamily: 'Gotham', fontSize: '18px', fontWeight:'bold',cursor: 'pointer', border: 'none',borderRadius: '16px',color:'white'}}>
                <span style={{marginRight:"10px"}}>Download Next</span>
                <img src={Arrow} alt="arrow" style={{}}/>
            </button>
        </div>
       
    )
}