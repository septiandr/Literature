import React from 'react'
import './navbar.css'
import { useHistory,useParams } from "react-router-dom";

export default function Navbar() {   
    const id = sessionStorage.getItem('user')
    let history = useHistory()
    const logout =()=>{
        sessionStorage.setItem('isLogin',false);
        localStorage.removeItem("token");
        history.push('/')
    }
    return ( <>
    <div id="navbar">
        <div id = "nav-left" >
            <label onClick={()=>history.push(`/profile/${id}`)} > Profile </label> 
            <label onClick={()=>history.push('/my-collection')} > My Collection </label> 
            <label onClick={()=>history.push('/add-literature')}> Add Literature </label> 
            <label onClick={logout} > Logout </label> 
        </div> 
        <img onClick={()=>history.push('/search')} src = { require('../assets/Group 4.png').default }/> 
    </div>

        </>
    )
}

