import { useHistory,Link } from 'react-router-dom'
import '../../components/card.css'
import dateFormat from "dateformat";
import { Document, Page,pdfjs } from 'react-pdf';
import { API } from '../../config/api';
import { Button } from 'react-bootstrap';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function CardProfile({item}){  
    const url = require(`../../../../server/uploads/${item.image}`).default
    let history =useHistory()
    const remove = async(e)=>{
        e.preventDefault()
        
        const response = await API.delete(`/literature/${item.id}`)
        console.log(response)
        window.location.reload()

    }
    
    const Status=()=>{
        if(item.status =='Approve'){
            return(<><span style={{color:'#0ACF83'}}>{item.status}</span>
            </>)
        }else if(item.status =="Cancel"){
            return(<><span style={{color:'red',marginBottom:-10}}>{item.status}</span>
            <Link onClick={remove} style={{color:'red',marginLeft:140,marginTop:-20,}}>X</Link> </>)
        }else{
            return(<span style={{color:'#F7941E'}}>{item.status}</span>)
        }
    }
    return(
        <div onClick ={()=>history.push(`/detail-literature/${item.id}`)} key={item.idUser} id="card">
                <Status/>
               <Document  file={url} >
                    <Page   pageNumber={1} />
                </Document>
            <label id="detail" name="detail">{item.title}</label>
            <div>
                <p>{item.author}</p>
                <p>{dateFormat(item.publication_date, "yyyy")}</p>
            </div>
        </div>
    )
}