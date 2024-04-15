import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

import "./index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading]); 
  
  

  return (
    <div className="signup-container">
     <div className="signup-form-container">
       <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="user-input">
          <FontAwesomeIcon icon={faEnvelope} />
          <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="user-input">
          <FontAwesomeIcon icon={faLock} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="forgot-password">Forgot Password ? <span>Click Here!</span></div>
        <div className="submit-container">
          <div className="submit"  onClick={() => logInWithEmailAndPassword(email, password)}>Login</div>
          <Link to='/signup'>
            <div className="submit">Sign Up</div>
          </Link>
        </div>
        <div className="social-container">
          <div className="google" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle}/></div>
          <div className="facebook"><FontAwesomeIcon icon={faFacebook}/></div>
        </div>
      </div>
     </div>
    </div>
  );
}

export default Login;