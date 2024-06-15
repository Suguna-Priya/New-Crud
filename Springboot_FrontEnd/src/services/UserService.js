import axios from "axios";

const USER_REST_API_URL = 'http://localhost:8080/api/';

class UserService{

    getUser(){
       return axios.get(USER_REST_API_URL+"user");
    }

    deleteUser(id){
        return axios.delete(USER_REST_API_URL+"user/"+id);
    }

    addUser(newUser){
        axios.post(USER_REST_API_URL+'create-user',{newUser})
        .then((response)=>console.log(response))
        .catch((error)=> console.log(error));
    }

    // addUser(userDetails){
    //     console.log(userDetails);
    //     const newUser = JSON.stringify(userDetails)
    //     return axios.post(USER_REST_API_URL+"create-user",{data:newUser})
    // }
}

export default new UserService();