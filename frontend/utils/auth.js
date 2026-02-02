import axios from "axios";
import api from "./axiosConfig";

export async function login(formData){
    const response =  await api.post('api/token/',{
        "email": formData.email,
        "password": formData.password
    })
    
    if (response.status == 200){
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        console.log('Logged In Successfully!!')
    }
    else{
        console.log('Invalid Credentials!!')
        
    }
}

export async function signup(formData,userRole){
    const data = {
        userRole: userRole,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        craftSpecialty: formData.craftSpecialty,
        experience: formData.experience ,
        bio: formData.bio ,
        interests: formData.interests ,
    };
  console.log(data);
  const response =  await api.post('store/signup/',data)
  const { token } = response.data;
  
  // Save token to localStorage
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  
  if (response.status == 200){
      console.log('Account Created Successfully!!');
    }
    else{
        console.log('Account could not be created!!');
        
    }
}