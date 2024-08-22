import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';

export default function Login() {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:150}}>
            <div style={{display:"inline-flex",backgroundColor:"#262525",justifyContent:"center",zIndex: 2,position:"relative",fontFamily:"Gotham",borderRadius:8}}>
                <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",marginLeft:30,marginRight:30,paddingBottom:30}}>
                    <h1 style={{fontWeight:700, color:"white",marginBottom:'5px'}}>Log in</h1>
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>Email</h2>
                    <input
                        type="email"
                        value={email}
                        placeholder='kanyewest@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:300,height:30,backgroundColor: '#4F4F4F',color:"white"}}
                    />
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>Password</h2>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:300,height:30,backgroundColor: '#4F4F4F',color:"white"}}
                        required
                    />
                    <p style={{color:"gray",fontSize:'12px',alignContent:'left',overflowWrap:"break-word",textAlign:"center",marginTop:20}}> Don't have an account? Create one <a href=''>here</a></p>
                    <button style={{border:"none",marginTop:10,height:35, fontSize:16, fontWeight:700, borderRadius:5, backgroundColor:"#5D2496",color:"white",cursor:'pointer'}}>
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}