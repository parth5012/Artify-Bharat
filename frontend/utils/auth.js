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

export async function signup(formData,userRole){
    const response =  await axios.post('http://localhost:8000/store/signup/',JSON.stringify({
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
    craftSpecialty: formData.craftSpecialty | '',
    experience: formData.experience | '',
    bio: formData.bio | '',
    interests: formData.interests | [],
  }))
    if (response.status == 200){
        console.log('Account Created Successfully!!')
    }
    else{
        console.log('Account could not be created!!')

    }
}