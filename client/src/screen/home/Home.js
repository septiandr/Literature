import React, { useState } from "react";
import "../home/Home.css";
import SignIn from '../../components/SignIn'
import SignUp from "../../components/SignUp";
import { useHistory } from "react-router-dom";

export default function Home() {
    let history = useHistory()
    const [signIn,setSignIn]=useState(false)
    const [signUp,setSignUp]=useState(false)
    return ( <>
        <div id = 'landing-con' >
        {signIn && <SignIn/>}
        {signUp && <SignUp/>}
            <div>
                <img src = { require('../../assets/Group 4.png').default}/> 
                <h1 > source of<br/> intelligence </h1> 
                <p> Sign - up and receive unlimited accesss to all of your literatur - share your literature. </p> 
                <div>
                    <button onClick={()=>setSignUp(true)} id='btn-signUp'>Sign Up</button>
                    <button onClick={()=>setSignIn(true)} id='btn-signIn'>Sign In</button>
                </div>
            </div>
            <img onClick={()=>history.push('/search')} id="img-landing" src = {require('../../assets/g12.png').default }/> 
        </div> 
        
        </>
    )
    }