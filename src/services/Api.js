import axios from "axios";

const fetchProducts = async () => {
    try {
        const response = await axios.get("https://dummyjson.com/products");
        return response.data.products;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default fetchProducts