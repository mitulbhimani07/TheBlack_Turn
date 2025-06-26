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
export const GetAllBlogs=async()=>{
    try{
        const response=await axios.get('http://localhost:3001/blogs/all')

        console.log("blogs----",response.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const GetBlogById=async(id)=>{
    try{
        const response=await axios.get(`http://localhost:3001/blogs/all/${id}`)

        console.log("blog by id----",response.data.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const Signup=async(payload)=>{
    try{
        const response=await axios.post('http://localhost:3001/user/signup',payload)

        console.log("signup----",response.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}

export const Googlesignup=async(payload)=>{
    try{
        const response=await axios.post('http://localhost:3001/user/googleSignup',payload)

        return response.data
    }catch(error){
        console.error("Error in signin API:", error);
        throw error;
    }
}