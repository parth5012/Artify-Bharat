import axios from "axios";

export async function getProductsList() {
    try {
        const response = await axios.get('http://localhost:8000/store/products/');
        
        // Check for successful status and ensure data.results exists
        if (response.status === 200 && Array.isArray(response.data.results)) {
            console.log(response.data.results)
            return response.data.results;
        }
        
        // If results isn't an array, return an empty array to prevent .filter() crashes
        return [];
    } catch (error) {
        // Log the specific error (like ECONNREFUSED) for debugging
        console.error("API Call Failed:", error.message);
        
        // Always return an array so the frontend doesn't break
        return [];
    }
}
// getProductsList();



export async function getDashboardStats() {
    const response = await axios.get('http://localhost:8000/store/stats/');
    stats = respponse.data['stats']; 
    change = response.data['change'];
}   