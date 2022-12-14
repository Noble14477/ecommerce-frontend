import axios from "axios"

export const createcategory = async (inputData) =>{
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.post("/api/category", inputData, config)
    return response;
}

export const getCategories = async () =>{
    const response = await axios.get("/api/category");
    
    return response;
}