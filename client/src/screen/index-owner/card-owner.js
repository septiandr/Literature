import './index-owner.css'
import { API } from '../../config/api'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function CardOwner({item,i}){
    const Status =()=>{
    if(item.status =='Approve'){
        return(<>
        <td style={{color:'#0ACF83'}}>{item.status}</td>
        <td><img style={{width:40,height:40}} src={require('../../assets/Group.png').default}></img></td>
        </>)
    }else if(item.status =='Cancel'){
        return(<>
        <td style={{color:'red'}}>{item.status}</td>
        <td><img style={{width:40,height:40}} src={require('../../assets/remove.png').default}></img></td>
         </>)
    }else{
        return(<>
        <td style={{color:'#F7941E'}}>{item.status}</td> 
        <td >
                    <button style={{
                            width: 100,
                            height: 35,
                            color: '#161616',
                            backgroundColor: '#FF0742',
                            borderRadius: 5,
                            fontWeight: 'bold'
                    }} onClick ={cancel} id="btn-cancel">Cancel</button>
                    <button style={{
                            marginLeft: 10,
                            width: 100,
                            height: 35,
                            color: '#161616',
                            backgroundColor: '#0ACF83',
                            borderRadius: 5,
                            fontWeight: 'bold'
                    }} onClick={approve} id="btn-approve">Approve</button>
                </td>
        </>)
    }
}

const approve = async (e)=>{
    e.preventDefault();
    const config ={
      headers:{
        "Content-Type": "application/json",
      },
    };
    const data =({"status":"Approve"})
    const update = await API.put(`/literature/${item.id}`,data, config);
    console.log(update)
    window.location.reload()
   
}
  console.log(i)
const cancel = async (e)=>{
    e.preventDefault();
    const config ={
      headers:{
        "Content-Type": "application/json",
      },
    };
    const data =({"status":"Cancel"})
    const update = await API.put(`/literature/${item.id}`,data, config);
    console.log(update)
    window.location.reload()
}

    return(
              <tr>
                <td>{+i}</td>
                <td>{item.author}</td>
                <td>{item.isbn}</td>
                <td >
                  <Link to ={require(`../../../../server/uploads/${item.image}`).default}>
                    {item.image}</Link>
                  </td>
                <Status/>
              </tr>      
    )
}