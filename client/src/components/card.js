import { useHistory } from 'react-router-dom'
import './card.css'
import dateFormat from "dateformat";
import { Document, Page,pdfjs } from 'react-pdf';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Card({item}){  
    const url = require(`../../../server/uploads/${item.image}`).default
    let history =useHistory()
    return(
        <div onClick ={()=>history.push(`/detail-literature/${item.id}`)} key={item.idUser} id="card">
               <Document className="img" file={url} >
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

  
