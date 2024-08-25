import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../utilities/firebase"
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import './Login.css'
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
            <div style={{display:"inline-flex",backgroundColor:"#262525",justifyContent:"center",zIndex: 2,position:"relative",fontFamily:"Gotham",borderRadius:12}}>
                <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",marginLeft:30,marginRight:30,paddingBottom:50,paddingLeft:50,paddingRight:50,paddingTop:20}}>
                    <h1 style={{fontWeight:700, color:"white",marginBottom:'5px',fontSize:28}}>Create an Account</h1>
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>Email</h2>
                    <input
                        type="email"
                        value={email}
                        placeholder='freddiegibbs@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:370,height:42,backgroundColor: '#4F4F4F',color:"white",paddingRight:8}}
                    />
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>First Name</h2>
                    <input 
                        type="text" 
                        id="first-name" 
                        placeholder='Freddie'
                        onChange={(e) => setDisplayName(e.target.value)}
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:370,height:42,backgroundColor: '#4F4F4F',color:"white",paddingRight:8}}
                        required
                    />
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'10px'}}>Password</h2>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:370,height:42,backgroundColor: '#4F4F4F',color:"white",paddingRight:8}}
                        required
                    />
                    <p style={{color:"white",fontSize:'12px',alignContent:'left',overflowWrap:"break-word",textAlign:"center",marginTop:20}}> Already have an account? Login in <Link to='/login' className="link" style={{textDecoration:"none",color:"#a52cd1"}}>here</Link></p>
                    <button style={{border:"none",marginTop:10,height:42, fontSize:16, fontWeight:700, borderRadius:5, backgroundColor:"#5D2496",color:"white",cursor:'pointer'}}>
                        Create account
                    </button>
                </form>
            </div>
        </div>
    )
}