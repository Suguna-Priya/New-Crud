import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService';
import './user.css'
import axios from 'axios';

export const Users = ({data}) => {

    const [users,setUser] = useState([]);
    const [filterUser,setFilterUser] = useState([]);
    //For add and edit user pop-up
    const [isModelOpen,setIsModelOpen] = useState(false);
    const [userDetails,setUserDetails] = useState({firstName:"",lastName:"",email:""});

    useEffect(()=>{
        setUser(data);
        setFilterUser(data);
    },[data])

    //Get all Users
    const getAllUsers=async()=>{
        try{
          const response = await UserService.getUser();
            setUser(response.data);
            setFilterUser(response.data);
        }catch(err){
          console.error("Error : ",err);
        }finally{
          console.warn('API call is done');
        }
      }

   //Search User & City
   const handleSearch=(e)=>{
        const searchText = e.target.value.toLowerCase();
        const filteredText = users.filter((user)=>user.firstName.toLowerCase().includes(searchText) 
        || user.lastName.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText));

        setFilterUser(filteredText);
   }
   
   //Delete User
   const handleDelete=async(id)=>{
        const isConfirmed = window.confirm("Are you sure, you want to delete this user?")
        if(isConfirmed){
            await UserService.deleteUser(id);
            setUser(users.filter((user)=>user.id != id));
            setFilterUser(users.filter((user)=>user.id != id));
        }
   }

   //close Model
   const handleClose=()=>{
    setIsModelOpen(false);
   }

   //Add User Details
   const handleAddUser=()=>{
    setUserDetails({firstName:"",lastName:"",email:""});
    setIsModelOpen(true);
   }

   const handleData=(e)=>{
    setUserDetails({...userDetails,[e.target.name]:e.target.value})
   }


   const handleUpdateUser=async()=>{
        
        console.log(userDetails);
        const userId = parseInt(userDetails.id);
        const response =  await axios.put('http://localhost:8080/api/user/'+userId,userDetails);
        console.log(response);
    
        getAllUsers();
        setIsModelOpen(false);
        setUserDetails({firstName:"",lastName:"",email:""});
   }

   //Submit Data
   const handleSubmit=async(e)=>{
        const response = await axios.post('http://localhost:8080/api/create-user',userDetails);
        //UserService.addUser(userDetails);
        console.log(response);
        getAllUsers();
        setIsModelOpen(false);
        setUserDetails({firstName:"",lastName:"",email:""})
    }


   //Update User
   const handleUpdate=(user)=>{
        setUserDetails(user);
        setIsModelOpen(true);
   }


   //console.log(data)

  return (
    <>
        <div className='user-container'>

            <h3 className='title'>CRUD Operations with Springboot and React</h3>
            <div className="inputs">
                <input type="search" placeholder='Enter Search Here' onChange={handleSearch}/>
                <button className='btn green' onClick={handleAddUser}>Add User</button>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <td>User Id</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {filterUser.map((user)=>(
                        <tr key={user.id}>
                            <td>00{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td className='btn-col'><button className='btn green' onClick={()=>handleUpdate(user)}>Edit</button></td>
                            <td className='btn-col' onClick={()=>handleDelete(user.id)}><button className='btn red'>Delete</button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>

            {isModelOpen && (
                <div className="model">
                    
                    <div className='model-content'>
                    <span className='close' onClick={handleClose}>&times;</span>
                        <h3>Add User</h3>
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name='firstName' id='firstName' value={userDetails.firstName} onChange={handleData}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name='lastName' id='lastName' value={userDetails.lastName} onChange={handleData}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' id='email' value={userDetails.email} onChange={handleData}/>
                        </div>

                        {userDetails.id?
                        (
                        <button className='btn green' onClick={handleUpdateUser}>Update User</button>
                        ):(
                            <button className='btn green' onClick={handleSubmit}>Add User</button>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    </>
  )
}
