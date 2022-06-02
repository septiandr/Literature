import NavbarAdmin from '../../components/navbar-admin'
import './index-owner.css'
import CardOwner from './card-owner'
import { Table } from 'reactstrap'
import { useState } from 'react'
import { API } from '../../config/api'
import { useEffect } from 'react'
export default function IndexOwner(){
    const [status, setStatus]=useState([])
    const getStatus = async () => {
        try {
          const response = await API.get(`/literatures`);
          setStatus(response.data.data);
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getStatus();
      }, []);
     

    return(
        <>
        <NavbarAdmin/>
        <div id="index-owner">
            <h1>Book Verification</h1>
            <div id="owner-container">
                <Table striped bordered hover>
              <thead>
                  <tr>
                    <th >No.</th>
                    <th>Users of Authors</th>
                    <th>ISBN</th>
                    <th>Literature</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
            <tbody>
            {status.map((item,i) =>(<CardOwner item={item} i={i}/>)) }
            </tbody>
          </Table>
            </div>
        </div>
        </>
    )
}