import './detail-literature.css'
import Navbar from '../../components/navbar'
import { useState,useEffect } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import {API} from '../../config/api'
import dateFormat from "dateformat";
import { Document, Page,pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function DetailLiterature(){
    let history = useHistory()
    let { id } = useParams();
    const user = sessionStorage.getItem('user')
    const [literature,setLiterature] = useState([])
    const getLiterature = async (id) => {
        try {
          const response = await API.get(`/literature/${id}`);
          setLiterature(response.data.data);
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getLiterature(id);
        
      }, []);

      const collection =async(e)=>{
        e.preventDefault()
        
        const config ={
            headers:{
              "Content-type": "application/json",
            }
        }
        const data =({"idUser":user, "idLiterature":id})
    
        const response = await API.post('/favorite',data,config)
        console.log(response)
        history.push('/my-collection')
      }
      
     
      const Pdf =()=>{
        if(typeof(literature.image) == "undefined"){
         
          return(
            <></>
          )
        }else{
          return(< Link to ={require(`../../../../server/uploads/${literature.image}`).default}>
                          <Document file={require(`../../../../server/uploads/${literature.image}`).default} >
            <Page pageNumber={1} />
          </Document>
          </Link>

          )
        }
      }
      const Btn =()=>{
        if(typeof(literature.image) == "undefined"){
          return(<button></button>)
        }else{
          return(                
          <button><Link style={{color:"white"}} id="btn" to={require(`../../../../server/uploads/${literature.image}`).default} target="_blank" download>Download</Link></button>
          )
        }
      }

   
    const [collections, setCollection] = useState([])
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
 
    return(
        <>
        <Navbar/>
        <div id="detail-literature">
            <Pdf/>
            <div id="literature">
                <h1 style={{color:'white', fontSize:36,}}>{literature.title}</h1>
                <h3 style={{color:'#929292', fontSize:24,}}>{literature.author}</h3>
                <h2 style={{color:'white', fontSize:24,marginTop:35}}>Publication Date</h2>
                <h3 style={{color:'#929292', fontSize:18,}}>{dateFormat(literature.publication_date, "dddd, d mmmm yyyy")}</h3>
                <h2 style={{color:'white', fontSize:24,marginTop:35}}>Pages</h2>
                <h3 style={{color:'#929292', fontSize:18,}}>{literature.pages}</h3>
                <h2 style={{color:'#AF2E1C', fontSize:24,marginTop:35}}>ISBN</h2>
                <h3 style={{color:'#929292', fontSize:18,}}>{literature.isbn}</h3>
                <Btn/>
            </div>
            <div id='btn-literature'>
                <button onClick={collection}>Add My Collection</button>
            </div>
            
        </div>
        </>
    )
}