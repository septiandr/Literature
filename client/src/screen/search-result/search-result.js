import './search-result.css'
import Navbar from '../../components/navbar'
import Card from '../../components/card'
import { useState,useEffect } from 'react'
import {API} from '../../config/api'
import dateFormat from "dateformat";

export default function SearchResult(){

    const [literature,setLiterature]= useState([])
    const [input,setInput] = useState()
    const search =sessionStorage.getItem('search')
    sessionStorage.setItem('search',input)
    const getLiterature = async () => {
        try {
        
          const response = await API.get(`/literatures`);
          setLiterature(response.data.data);
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
          getLiterature()
        
      }, [])
      const [filter,setFilter] =useState()
      const year =(e)=>{
          setFilter(
            e.target.value
          )
      }
      const Maps =()=>{
           if(search == 'undefined'){
            if(typeof(filter) == "undefined" || filter ==""){
              return(<>
                {literature.filter((item) => item.status =='Approve').map((item) => (<Card item={item} />))}
                </>
              )
            }else{
              return(<>
                {literature.filter((item) => item.status =='Approve' && dateFormat(item.publication_date, "yyyy")== filter).map((item) => (<Card item={item} />))}
                
                </>
              )
            }
          } else if((item) => item.title == search){
            return(<>
              {literature.filter((item) => item.title.includes(search) && item.status =='Approve').map((item) => (<Card item={item} />))}
            </>)
            }
          }

      console.log(filter)
    return(
        <>
        <Navbar/>
        <div id="search-result">
            <div>
                <input onChange ={(e)=>setInput(e.target.value)} placeholder="Search"></input>
               
            </div>
            <div id="result">
                <div id="result-left">
                    <label>Anytime</label><br/>
                    <select style={{color:'black'}} onChange={year}>
                    <option selected></option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    </select>
                </div>
                <div id="result-right">
                    <Maps/>
                </div>
            </div>
        </div>
        </>
    )
}

