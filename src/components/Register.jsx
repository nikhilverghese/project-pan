import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../utilities/firebase"

import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

export default function Login() {
    const [displayNameOption, setDisplayName] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: displayNameOption });
            navigate('/');
        } catch (error) {
            console.error('Error creating user:', error);
        }
          
    }

    return (
        <div style={{display:"flex",justifyContent:"center",marginTop:150}}>
            <div style={{display:"inline-flex",backgroundColor:"#262525",justifyContent:"center",zIndex: 2,position:"relative",fontFamily:"Gotham",borderRadius:16}}>
                <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",marginLeft:30,marginRight:30,paddingBottom:30}}>
                    <h1 style={{fontWeight:700, color:"white",marginBottom:'5px'}}>Create an Account</h1>
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>Email</h2>
                    <input
                        type="email"
                        value={email}
                        placeholder='kanyewest@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:300,height:30,backgroundColor: '#4F4F4F',color:"white"}}
                    />
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>First Name</h2>
                    <input 
                        type="text" 
                        id="first-name" 
                        placeholder='Kanye'
                        onChange={(e) => setDisplayName(e.target.value)}
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:300,height:30,backgroundColor: '#4F4F4F',color:"white"}}
                        required
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
                    <p style={{color:"gray",fontSize:'12px',alignContent:'left',overflowWrap:"break-word",textAlign:"center",marginTop:20}}> Already have an account? Login in <Link to='/login'>here</Link></p>
                    <button style={{border:"none",marginTop:10,height:35, fontSize:16, fontWeight:700, borderRadius:5, backgroundColor:"#5D2496",color:"white",cursor:'pointer'}}>
                        Create account
                    </button>
                </form>
            </div>
        </div>
    )
}