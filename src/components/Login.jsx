import React, { useState } from 'react'
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import {Paper} from '@mui/material/';

import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import {auth} from "../utilities/firebase"
import "./Login.css"
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate('/');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <>
        <div style={{display:"flex",justifyContent:"center",marginTop:150}}>
            
            <Paper elevation={2} style={{display:"inline-flex",backgroundColor:"#262525",justifyContent:"center",zIndex: 2,position:"relative",fontFamily:"Gotham",borderRadius:12}}>
                <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",marginLeft:30,marginRight:30,paddingBottom:50,paddingLeft:50,paddingRight:50,paddingTop:20}}>
                    <h1 style={{fontWeight:700, color:"white",marginBottom:'5px',fontSize:28}}>Log in</h1>
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>Email</h2>
                    <input
                        type="email"
                        value={email}
                        placeholder='kanyewest@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:370,height:42,backgroundColor: '#4F4F4F',color:"white",paddingRight:8}}
                    />
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>Password</h2>
                        <p style={{color:"white",fontSize:'12px',alignContent:'left',overflowWrap:"break-word",textAlign:"center",marginTop:30,marginLeft:160}}> <Link to='/reset' className="link" style={{color:"#a52cd1",textDecoration:"none"}}>Forgot password?</Link></p>
                    </div>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:370,height:42,backgroundColor: '#4F4F4F',color:"white",paddingRight:8}}

                        required
                    />
                    <p style={{color:"white",fontSize:'12px',alignContent:'left',overflowWrap:"break-word",textAlign:"center",marginTop:20}}> Don't have an account? Create one <Link to='/register' className="link" style={{color:"#a52cd1",textDecoration:"none"}}>here</Link></p>
                    <button style={{border:"none",marginTop:10,height:42, fontSize:16, fontWeight:700, borderRadius:5, backgroundColor:"#5D2496",color:"white",cursor:'pointer',width:"100%"}}>
                        Sign in
                    </button>
                </form>
            </Paper>
        </div>
        </>
    )
}