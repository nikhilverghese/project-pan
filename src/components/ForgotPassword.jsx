import React, { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate,Link} from 'react-router-dom';
import {auth} from "../utilities/firebase"
import "./Login.css"
export default function Login() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            navigate("/login")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <>
        <div style={{display:"flex",justifyContent:"center",marginTop:150}}>
            
            <div style={{display:"inline-flex",backgroundColor:"#262525",justifyContent:"center",zIndex: 2,position:"relative",fontFamily:"Gotham",borderRadius:12}}>
                <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",marginLeft:30,marginRight:30,paddingBottom:50,paddingLeft:50,paddingRight:50,paddingTop:20}}>
                    <h1 style={{fontWeight:700, color:"white",marginBottom:'5px',fontSize:28}}>Reset your password</h1>
                    <p style={{color:"#d1d1d1",fontFamily:"Gotham",fontSize:15}}>Please enter the email associated with your account <br />and a link will be sent to reset your password.</p>
                    <h2 style={{fontWeight:500, color:"white",marginBottom:'15px'}}>Email</h2>
                    <input
                        type="email"
                        value={email}
                        placeholder='isaiahrashad@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{paddingLeft:8,fontSize:16,borderRadius:5,border:"none",width:370,height:42,backgroundColor: '#4F4F4F',color:"white",paddingRight:8}}
                    />
                    <button style={{border:"none",marginTop:20,height:42, fontSize:16, fontWeight:700, borderRadius:5, backgroundColor:"#5D2496",color:"white",cursor:'pointer'}}>
                        Continue
                    </button>
                    <p style={{color:"white",fontSize:14,alignContent:'center',textAlign:"center",marginTop:20}}><Link to='/login' className="link" style={{textDecoration:"none",color:"#a52cd1"}}>Return to Sign in</Link></p>
                </form>
            </div>
        </div>
        </>
    )
}