import axios from 'axios';

async function test() {
    const response = await axios.get('http://localhost:8000/store/products/'); // Wait for the data
    console.log(response.data); // Now this prints the actual output
}
test();