import {useState,useEffect} from 'react';
import { Typography, useScrollTrigger} from '@mui/material';
import './text.css'
import {onAuthStateChanged,signOut } from "firebase/auth";
import {auth} from "../utilities/firebase"
import { useNavigate} from 'react-router-dom';
export default function Text() {
    const [loginStatus, setLoginStatus] = useState(false)
    const [mainMessage,setMainMessage] = useState('Welcome To Project Pan.')
    const [subMessage,setSubMessage] = useState('A tool that allows users to download songs and get metadata.')
    const navigate = useNavigate();
    const setLogin = () => {
        navigate('/login');
    }

    const logout = () => {
        signOut(auth).then(() => {
            setLoginStatus(false);
            window.location.reload();
          }).catch((error) => {
          });
    }
    const setSignup = () => {
        navigate('/register');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoginStatus(true);
                setMainMessage(`Welcome back ${user.displayName}.`);
                setSubMessage("Let's start producing something amazing today.");
            } else {
                setLoginStatus(false);
            }
        });
        return () => unsubscribe();
    }, []);
    

    return (
        <>
        <div className="fade-in" style={{ position: 'absolute', top: '60px', left: '55px' }}>
        <Typography variant="h3" color="white" fontWeight="bold">
                {mainMessage}
        </Typography>
        <Typography variant="h5" color="white" style={{marginTop: 15, fontWeight:300}}>
            {subMessage}
        </Typography>
        </div>   
        <div style={{ position: 'relative', top: '900px', display: 'flex', justifyContent:'center'}}>
            <Typography variant="h6" color="white" fontWeight="light">
            Built by Musicians for Musicians
            </Typography>
        </div>
        {loginStatus===false ?
        <div style={{display:"flex",justifyContent:"right", marginRight:55,marginTop:"-10px"}}>
            <button onClick={setLogin} className="login" style={{marginRight:5,backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",color:"white",fontFamily: 'Gotham',fontWeight:500,fontSize:16, borderRadius: 8}}>Login</button>
            <button onClick={setSignup} className="signup" style={{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",color:"white",fontFamily: 'Gotham',fontWeight:500,fontSize:16, borderRadius: 8}}>Sign Up</button>
        </div> :
        <div style={{display:"flex",justifyContent:"right", marginRight:55,marginTop:"-10px"}}>
            <button onClick={logout} className="login" style={{marginRight:5,backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",color:"white",fontFamily: 'Gotham',fontWeight:500,fontSize:16, borderRadius: 8}}>Log out</button>
        </div>
        }
        </>
    )
}