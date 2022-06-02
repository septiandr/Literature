import './add-literature.css'
import Navbar from '../../components/navbar'
import { useState } from 'react'
import { API } from '../../config/api'
import { useHistory } from 'react-router-dom'
import { Document, Page,pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function AddLiterature(){
    let history = useHistory()
    const user = sessionStorage.getItem('user')
    const [preview, setPreview] = useState(null)
    const [form,setForm]=useState({
        title:'',
        publication_date:'',
        pages:'',
        isbn:'',
        author:'',
        status:'Waiting to be verified',
        image:'',
        idUser:0,
    })
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
      
        // Create image url for preview
        if (e.target.type === "file") {
      
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
    }
    const handleSubmit =async (e)=>{
        try {
            e.preventDefault()
            const isLogin = sessionStorage.getItem('user')
            const config ={
                headers:{
                    "Content-type":"multipart/form-data"
                }
            }
            const formData = new FormData();
            formData.set("title", form.title);
            formData.set("publication_date", form.publication_date);
            formData.set("pages", form.pages);
            formData.set("isbn", form.isbn);
            formData.set("author", form.author);
            formData.set("status", form.status);
            formData.set("idUser", isLogin);
            formData.append("image", form.image[0])
          
            const response = await API.post('/literature',formData,config)
            console.log(response)
            history.push(`/profile/${user}`)
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
            <Navbar/>
            <div>
                <h1 id="title-addLiterature">Add Literature</h1>
                <form id="addLiterature" onSubmit={handleSubmit}>
                <input onChange={handleChange} name="title" placeholder="Title" type="text"></input><br/>
                <input onChange={handleChange} type="date" name="publication_date" placeholder="Publication Date"></input><br/>
                <input onChange={handleChange} name="pages" placeholder="Pages" type="Number"></input><br/>
                <input onChange={handleChange} name="isbn" placeholder="ISBN" type="text"></input><br/>
                <input onChange={handleChange} name="author" placeholder="Author, Ex : E E Rizky, Astina Haris" type="text"></input><br/>
                <div id="pdf-preview">
                    <Document  file={preview} >
                        <Page   pageNumber={1} />
                    </Document> 
                </div>

                <div id="input-file">
                    <label for="input">Attache book file <img src={require('../../assets/Frame 1.png').default}/></label>
                    <input onChange={handleChange} id="input" name="image" accept=".pdf" type="file" hidden></input><br/>
                   
                </div>
                <button type="submit" id="btn-addLiterature">Add Literature</button>
                </form>
            </div>
        </>
    )
}