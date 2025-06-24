import axios from 'axios';

export const AddBlog=async(payload)=>{
    try{

        const response=await axios.post('http://localhost:3001/blogs/create',payload)

        console.log("blog----",response.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}