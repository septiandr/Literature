import { useHistory } from 'react-router-dom'
import './card.css'
import dateFormat from "dateformat";
import { Document, Page,pdfjs } from 'react-pdf';
import { Button } from 'react-bootstrap';
import { API } from '../config/api';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function CardCollection({item}){
    let history =useHistory()
    const url = require(`../../../server/uploads/${item.literature.image}`).default
    const remove = async(e)=>{
        e.preventDefault()
        
        const response = await API.delete(`/favorite/${item.id}`)
        console.log(response)
        history.push('/my-collection')
    }
    return(<> 
        <div onClick ={()=>history.push(`/detail-literature/${item.literature.id}`)} key={item.idUser} id="card">
            <Document className="img" file={url} >
                   <Page   pageNumber={1} />
            </Document>
            <Button style={{width:200,height:40,marginTop:10}} variant="danger"onClick={remove} >Remove</Button> <br/>
            <label id="detail" name="detail">{item.literature.title}</label>
            <div>
                <p>{item.literature.author}</p>
                <p>{dateFormat(item.literature.publication_date, "yyyy")}</p>
            </div>
        </div></>
    )
}