import axios from "axios";
import api from "./axiosConfig";

export async function getProductsList() {
    try {
        const response = await api.get('store/products/');

        console.log("Products API Response:", response.data);

        // Check for successful status and ensure data.results exists
        if (response.status === 200) {
            // Handle both paginated (results) and non-paginated responses
            const products = response.data.results || response.data;

            if (Array.isArray(products)) {
                console.log("Products fetched:", products.length);
                return products;
            }
        }

        // If results isn't an array, return an empty array to prevent .filter() crashes
        return [];
    } catch (error) {
        // Log the specific error (like ECONNREFUSED) for debugging
        console.error("API Call Failed:", error.message);
        console.error("Full error:", error);

        // Always return an array so the frontend doesn't break
        return [];
    }
}
// getProductsList();



export async function getDashboardStats() {

    const response = await api.get('store/stats/');
    return {
        'stats': response.data['stats'],
        'change': response.data['change'],
    }
}

export async function getOrders() {
    const response = await api.get('store/orders', {
        params:
        {
            'role': 'artisan'
        }
    })
    console.log(response.data)
    return response.data

}

export async function createProduct(formData) {
    try {
        console.log("Sending product data:", formData);

        // For FormData, don't set Content-Type header - browser will set it automatically with boundary
        const response = await api.post('store/products/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log("Product creation response:", response.data);

        if (response.status === 201 || response.status === 200) {
            console.log('Product added successfully!!');
            return 1;
        }

        return 0;

    } catch (error) {
        console.error("Create product error:");

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error Data:", error.response.data);

            // Show specific error message to user
            if (error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert(`Failed to add product: ${JSON.stringify(error.response.data)}`);
            }
        } else {
            console.error("Network error:", error.message);
            alert("Network error. Please check if backend is running.");
        }

        return 0;
    }
}


export const updateCraftStory = async (storyData) => {
    const response = await api.patch('store/artisan/craft-story/', storyData);
    return response.data;
};

export const getArtisanProfile = async () => {
    const response = await api.get('store/artisan/profile/');
    return response.data;
};

export const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(`store/products/${productId}/`);
        console.log("Product deleted:", response.status);
        return response.status === 204 || response.status === 200;
    } catch (error) {
        console.error("Delete product error:", error);
        if (error.response) {
            console.error("Error Data:", error.response.data);
            alert(`Failed to delete product: ${error.response.data.error || 'Unknown error'}`);
        }
        return false;
    }
};
