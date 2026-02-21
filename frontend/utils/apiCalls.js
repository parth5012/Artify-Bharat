import api from "./axiosConfig";

export async function getProductsList(myProductsOnly = false, page = 1) {
    try {
        const params = myProductsOnly ? { my_products: 'true', page } : { page };
        const response = await api.get('store/products/', { params });

        console.log("Products API Response:", response.data);

        // Check for successful status
        if (response.status === 200) {
            // Return the full response with pagination data
            return response.data;
        }

        // If no data, return empty structure
        return { results: [], count: 0, next: null, previous: null };
    } catch (error) {
        // Log the specific error (like ECONNREFUSED) for debugging
        console.error("API Call Failed:", error.message);
        console.error("Full error:", error);

        // Always return a structure so the frontend doesn't break
        return { results: [], count: 0, next: null, previous: null };
    }
}
// getProductsList();

export async function getDashboardStats() {
    const response = await api.get("store/stats/");
    return {
        stats: response.data["stats"],
        change: response.data["change"],
    };
}

export async function getOrders() {
    const response = await api.get("store/orders/");
    console.log(response.data);
    return response.data;
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

export async function getProductDetail(productId) {
    try {
        const response = await api.get(`store/products/${productId}/`);
        console.log("Product detail response:", response.data);

        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("Get product detail error:", error.message);
        return null;
    }
}
