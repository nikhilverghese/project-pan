import {useState} from 'react';
import { Typography, useScrollTrigger} from '@mui/material';
import './text.css'
import Login from './Login'
import { useNavigate} from 'react-router-dom';
export default function Text({loginStatus}) {
    const [login,showLogin] = useState(false);
    const [signup,showSignup] = useState(false);
    const navigate = useNavigate();

    const setLogin = () => {
        showLogin(true);
        navigate('/Login');
    }
    const setSignup = () => {
        showSignup(true);
    }

    return (
        <>
        <div className="fade-in" style={{ position: 'absolute', top: '60px', left: '55px' }}>
        <Typography variant="h3" color="white" fontWeight="bold">
                Welcome To Project Pan.
            </Typography>
            <Typography variant="h5" color="white" style={{marginTop: 15, fontWeight:300}}>
                A tool that allows users to download songs and get metadata. 
            </Typography>
        </div>   
        <div style={{ position: 'relative', top: '900px', display: 'flex', justifyContent: 'center'}}>
            <Typography variant="h6" color="white" fontWeight="light">
            Built by Musicians for Musicians
            </Typography>
        </div>
        {loginStatus===undefined &&
        <div style={{display:"flex",justifyContent:"right", marginRight:55,marginTop:"-10px"}}>
            <button onClick={setLogin} className="login" style={{marginRight:5,backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",color:"white",fontFamily: 'Gotham',fontWeight:500,fontSize:16, borderRadius: 8}}>Login</button>
            <button onClick={setSignup} className="signup" style={{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",color:"white",fontFamily: 'Gotham',fontWeight:500,fontSize:16, borderRadius: 8}}>Sign Up</button>
        </div>
        }
        </>
    )
}