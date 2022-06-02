import { Modal } from "reactstrap"
import './SignUp.css'
import { useState,useContext } from "react"
import {API} from '../config/api'
import { useHistory } from "react-router-dom"
import { setAuthToken } from "../config/api"
import React from "react"
import { UserContext } from "../context/userContext"
import { Alert } from "react-bootstrap"
export default function SignUp(){
    let history =useHistory()
    const [message, setMessageLogin] = useState(null);
    const [state, dispatch] = useContext(UserContext)
    const [modal,setModal]=useState(true)

    const [signUp , setsignUp] =useState({
        email:"",
        password:'',
        full_name:'',
        gender:'',
        phone:'',
        address:'',
        photo:''
    })

    const handleChange=(e)=>{
        setsignUp({
            ...signUp,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            
        const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
     
    
        const response = await API.post("/register", signUp, config);
        console.log(response)
        setAuthToken(response.data.data.token);

        sessionStorage.setItem('isLogin',true);
        sessionStorage.setItem('user',response.data.data.id);
        localStorage.setItem("token", response.data.data.token);
        if (response?.status === 200) {
            // Send data to useContext
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: response.data.data,
            });
        }
        history.push('/search')
            
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                  Login failed
                </Alert>
              );
              setMessageLogin(alert);
            console.log(error)
        }
            
    }
 
    return(
    <Modal id="modal-signUp" isOpen={modal} >
        <button id="btn-close" onClick={()=>{setModal(false)}}> X</button>
        <form id="form-signIn" onSubmit={handleSubmit}>
            <h1 id="title-signIn">Sign Up</h1>
            {message && message}
            <input onChange={handleChange} type="email" name="email" placeholder="Email" required ></input><br/>
            <input style={{marginTop:20}} type="password" name="password" onChange={handleChange} placeholder="password" required ></input><br/>
            <input style={{marginTop:20}} type="text" name="full_name" onChange={handleChange} placeholder="Full Name" required ></input><br/>
            <select id="gender" style={{marginTop:20}} type="text" name="gender" onChange={handleChange} placeholder="Gender">
                <option selected disabled>-select gender-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br/>
            <input style={{marginTop:20}} type="text" name="phone" onChange={handleChange} placeholder="Phone" required ></input><br/>
            <input style={{marginTop:20}} type="text" name="address" onChange={handleChange} placeholder="Address" required ></input><br/>
            <button id="btn-signIn" type="submit">Sign Up</button>
            <p>Already have an account ?<span>Klik Here</span></p>
        </form>
        
    </Modal>
    )
}