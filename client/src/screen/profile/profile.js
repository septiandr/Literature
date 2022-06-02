import './profile.css'
import Navbar from '../../components/navbar'
import { useEffect,useState } from 'react'
import CardProfile from './card-profile'
import {API} from '../../config/api'

export default function Profile(){
    
    const [user,setuser]=useState([])
    const [preview, setPreview] = useState(null); 
    const [image,setImage]=useState({})
    const [img,setImg]=useState()
    const id = sessionStorage.getItem('user')
    const [literature, setLiterature] = useState([])
    const getuser = async () => {
        try {
        
          const response = await API.get(`/user/${id}`);
          setuser(response.data.data);
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getuser();
        
      }, []);

      const handleChange = (e) => {
        setImage({
          ...image,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
      
        // Create image url for preview
        if (e.target.type === "file") {
      
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
      };
      const handleClick = async (e)=>{
        e.preventDefault();
        const config ={
          headers:{
            "Content-type": "multipart/form-data",
          },
        };
        const formData = new FormData();
      if (image.image) {
        formData.set("image", image?.image[0], image?.image[0]?.name);
      }
  
        const update = await API.put(`/user/${id}`,formData, config);
        console.log(update)

    }

    const getLiterature = async()=>{
      try {
        
          const response = await API.get(`/literatures`);
          setLiterature(response.data.data);
          console.log(response.data)
        } catch (error) {
          window.location.reload()
          console.log(error);
        }
      }
    
      useEffect(() => {
        getLiterature();
        Photo()
      }, []);
    
      function Photo(){
        if(user.photo == undefined){
        return(<>
          <img src={preview}alt="preview"/>
          <input name="image" id="image" type="file" hidden onChange={handleChange}></input>
          <label  for="image" >Uplod your photo</label>
          </>
        )}else{
          console.log(user.photo)
          return(<>
            <img src={require(`../../../../server/uploads/${user.photo}`).default}alt="preview"/>
            <input  name="image" id="image" type="file" hidden onChange={handleChange}></input>
          <label style={{marginTop:0}} for="image" >Change photo</label>
            <input name="image" id="image" type="file" hidden onChange={handleChange}></input>
            </>
            
          )
        }
      }
      const Maps =()=>{
        if(!literature){
          return(
            <></>
          )
        }else{
          return(<>
        {literature.filter((item) => item.idUser == id).map((item) => (<CardProfile item={item} />))}
          </>)
        }
      }
      console.log(literature)
    return(
        <>
        <Navbar/>
        <div>
            <h1 id="title-profile">Profile</h1>
            <div id="profile-con">
                <div id="main-profile">
                    <div>
                        <img src={require('../../assets/Vector1.png').default}/>
                        <div>
                            <label id="label">{user.email}</label><br/>
                            <p>Email</p><br/>
                        </div>
                    </div>
                    <div>
                        <img src={require('../../assets/Vector (3).png').default}/>
                        <div>
                            <label id="label">{user.gender}</label><br/>
                            <p>Gender</p><br/>
                        </div>
                    </div>
                    <div>
                        <img src={require('../../assets/Vector.png').default}/>
                        <div>
                            <label id="label">{user.phone}</label><br/>
                            <p>Mobile Phone</p><br/>
                        </div>
                    </div>
                    <div>
                        <img src={require('../../assets/Vector2.png').default}/>
                        <div>
                            <label id="label">{user.address}</label><br/>
                            <p>Address</p><br/>
                        </div>
                    </div>
                </div>
                <div id="image-profile">
                  <Photo/>
                    
                    <button onClick={handleClick} type="submit" id="btn-profile">Change Photo Profile</button>
                </div>
            </div>
            <h1 id="my-literature">My Literature</h1>
            <div id="profile-list">
              <Maps/>
            </div>
        </div>
        </>
    )
}