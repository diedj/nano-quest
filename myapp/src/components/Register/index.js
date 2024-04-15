import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthState } from "react-firebase-hooks/auth";
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'; 

import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "./index.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
    setName("");
    setPassword("");
    setEmail("");
  }
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/login");
  }, [user, loading]);
  

  return (
    <div className="signup-container">
     <div className="signup-form-container">
       <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="user-input">
          <FontAwesomeIcon icon={faUser}/>
          <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="user-input">
          <FontAwesomeIcon icon={faEnvelope}/>
          <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="user-input">
          <FontAwesomeIcon icon={faLock} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>Sign Up</div>
          <Link to='/login'>
            <div className="submit">Login</div>
          </Link>
        </div>
        <div className="social-container">
          <div className="google" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} /></div>
          <div className="facebook"><FontAwesomeIcon icon={faFacebook}/></div>
        </div>
      </div>
     </div>
    </div>
  );
}

export default Register;
