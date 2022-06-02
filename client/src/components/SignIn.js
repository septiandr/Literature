import { Modal } from "reactstrap"
import './SignIn.css'
import { useState,useContext } from "react"
import { API,setAuthToken } from "../config/api"
import { useHistory } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { Alert } from "react-bootstrap"
export default function SignIn(){

    const [message, setMessageLogin] = useState(null);
    const [state, dispatch] = useContext(UserContext)
    let history = useHistory()
    const [modal,setModal]=useState(true)

    const [signIn, setsignIn]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setsignIn({
            ...signIn,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit= async (e)=>{
        
        try {
            e.preventDefault()
            const config ={
                headers:{
                    "Content-type":"application/json"
                }
            }
            const response = await API.post('/login',signIn,config)
            setAuthToken(response.data.data.token);
            sessionStorage.setItem('isLogin',true);
            sessionStorage.setItem('user',response.data.data.id);
            localStorage.setItem("token", response.data.data.token);
            console.log(response);
            if (response?.status === 200) {
                // Send data to useContext
                dispatch({
                  type: "LOGIN_SUCCESS",
                  payload: response.data.data,
                });
                const alert = (
                    <Alert variant="success" className="py-1">
                      Login success
                    </Alert>
                  );
                  setMessageLogin(alert);
            }
            if(response.data.data.status =="user"){
                history.push('/search')
            }else if(response.data.data.status =="admin"){
                history.push('/index-owner')
            }
            
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
    return(<div style={{ backgroundColor:'#161616'}}>
    <Modal id="modal-signIn" isOpen={modal} >
        <button id="btn-close" onClick={()=>{setModal(false)}}> X</button>
        <form onSubmit={handleSubmit} id="form-signIn">
            <h1 id="title-signIn">Sign In</h1>
            {message && message}
            <input type="text" name="email" onChange={handleChange} placeholder="Email" required ></input><br/>
            <input style={{marginTop:20}} onChange={handleChange} type="password" name="password" placeholder="password" required ></input><br/>
            <button id="btn-signIn" type="submit">Sign In</button>
            <p>Don't have an account ? <span>Klik Here</span></p>
        </form>
        
    </Modal></div>
    )
}