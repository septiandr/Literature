import Navbar from'../../components/navbar'
import './search.css'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'

export default function Search(){
    const [search, setSearch] =useState("")
    sessionStorage.setItem('search', search)
    let history = useHistory()
    console.log(search)
    return(
        <>
            <Navbar/>
            <button id="btn-search" onClick={()=>history.push('/search-result')}><img src={ require('../../assets/Vector (2).png').default}/></button>
            <div id="search-container">
                <img src = { require('../../assets/Vector (1).png').default}/> <br/>
                <input onChange={(e)=>setSearch(e.target.value)} id="input-search" placeholder="Search for literature"></input>
                
            </div>
           
        </>
    )
}