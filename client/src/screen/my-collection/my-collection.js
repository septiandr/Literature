import Navbar from '../../components/navbar'
import CardCollection from '../../components/card-col'
import './my-collection.css'
import { useState } from 'react'
import { API } from '../../config/api'
import { useEffect } from 'react'
export default function MyCollection(){
    const id = sessionStorage.getItem('user')
    const [collection, setCollection] = useState([])
    const getCollection = async () => {
        try {
        
          const response = await API.get(`/favorites`);
          setCollection(response.data.data);
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        getCollection();
        
      }, []);
    console.log(collection)
     const Collection =()=>{
      if(!collection){
        return(<></>)
      }else{
        return(
          <>
           {collection.filter((item) => item.idUser == id).map((item) => (<CardCollection item={item} />))}
  
          </>
        )
      }
     } 

    return(
        <>
        <Navbar/>
        <div id="myCollection">
            <h1>My Collection</h1>
            <div id="literature-list">
              <Collection/>
            </div>
        </div>
        </>
    )
}