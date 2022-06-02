import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
export default function NavbarAdmin(){
    let history = useHistory()
    const logout =()=>{
        
            sessionStorage.setItem('isLogin',false);
            localStorage.removeItem("token");
            history.push('/')
    }
    return(
        <>
        <div id="nav-admin" style={{display:'flex',justifyContent:"space-between",marginLeft:87,height:120}}>
            <img style={{width:167,height:64,marginTop:34}} onClick={()=>history.push('/search')} src = { require('../assets/Group 4.png').default }/> 
            
            <Dropdown id="dropdown-basic-button">
            <Dropdown.Toggle style={{borderRadius:50,width:50,height:50,marginTop:34,marginRight:88}} id="dropdown-basic">
                <img style={{width:50,height:50,marginLeft:-12,marginTop:-7}} src={require('../../../client/src/assets/user (1).png').default}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={logout} ><img src={require('../assets/logout 1.png').default}/>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        </>
    )
}