import axios from "axios";

export async function login(formData){
    const response =  await axios.post('http://localhost:8000/store/login/',{
        "email": formData.email,
        "password": formData.password
    })
    if (response.status == 200){
        console.log('Logged In Successfully!!')
    }
    else{
        console.log('Invalid Credentials!!')

    }
}