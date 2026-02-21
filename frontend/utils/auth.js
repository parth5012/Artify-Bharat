import axios from "axios";
import api from "./axiosConfig";

export async function login(formData) {
    try {
        const response = await api.post('api/token/', {
            "email": formData.email,
            "password": formData.password
        });

        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Fetch user role from backend
            try {
                const profileResponse = await api.get('store/artisan/profile/');
                if (profileResponse.status === 200) {
                    localStorage.setItem('user_role', 'artisan');
                }
            } catch {
                // If artisan profile fails, user might be a buyer
                localStorage.setItem('user_role', 'buyer');
            }

            console.log('Logged In Successfully!!');

            // Return success so we can redirect
            return { success: true };
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid credentials! Please check your email and password.');
        return { success: false, error: error.message };
    }
}

export async function signup(formData, userRole) {
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
        experience: formData.experience,
        bio: formData.bio,
        interests: formData.interests,
    };

    console.log(data);

    try {
        const response = await api.post('store/signup/', data);

        // Save token and role to localStorage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_role', userRole);

        if (response.status === 200) {
            console.log('Account Created Successfully!!');
            return { success: true };
        }
    } catch (error) {
        console.error('Signup failed:', error);
        alert('Account could not be created! Please try again.');
        return { success: false, error: error.message };
    }
}

// Google OAuth Login
export async function googleOAuthLogin(credential, role = 'buyer') {
    try {
        const response = await api.post('api/auth/google/', {
            token: credential,
            role: role
        });

        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user_role', role);

            console.log('Google Login Successfully!!');
            return { success: true, user: response.data.user };
        }
    } catch (error) {
        console.error('Google OAuth failed:', error);
        alert('Google login failed! Please try again.');
        return { success: false, error: error.message };
    }
}

// Facebook OAuth Login
export async function facebookOAuthLogin(accessToken, role = 'buyer') {
    try {
        const response = await api.post('api/auth/facebook/', {
            accessToken: accessToken,
            role: role
        });

        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user_role', role);

            console.log('Facebook Login Successfully!!');
            return { success: true, user: response.data.user };
        }
    } catch (error) {
        console.error('Facebook OAuth failed:', error);
        alert('Facebook login failed! Please try again.');
        return { success: false, error: error.message };
    }
}