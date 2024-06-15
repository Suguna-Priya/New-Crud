import {useEffect, useReducer, useState} from 'react'
import UserService from '../services/UserService';
import { Users } from './Users';

export const UserComponent=()=>{
    //const url = 'http://localhost:8080/api/user';

    const [records,setRecords] = useState([]);

    // useEffect(()=>{
    //      fetch(url)
    //     .then(response=>response.json())
    //     .then(data=> setRecords(data))
    //     .catch(err => console.log(err))
    // },[])


    useEffect(()=>{
      getAllUsers();
    },[]);

    const getAllUsers=async()=>{
      try{
        const response = await UserService.getUser();
        setRecords(response.data);
      }catch(err){
        console.error("Error : ",err);
      }finally{
        console.warn('API call is done');
      }
    }
    
  return (
    <>
        <div>
          <Users data={records}/>
        </div>
    </>
  )
}
