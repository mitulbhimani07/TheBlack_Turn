import axios from 'axios';

export const AddBlog=async(payload)=>{
    try{
        const response=await axios.post('https://theblack-turn-2.onrender.com/blogs/create',payload)

        console.log("blog----",response.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const GetAllBlogs=async()=>{
    try{
        const response=await axios.get('https://theblack-turn-2.onrender.com/blogs/all')

        console.log("blogs----",response.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const GetBlogById=async(id)=>{
    try{
        const response=await axios.get(`https://theblack-turn-2.onrender.com/blogs/all/${id}`)

        console.log("blog by id----",response.data.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const Signup=async(payload)=>{
    try{
        const response=await axios.post('https://theblack-turn-2.onrender.com/user/signup',payload)

        console.log("signup----",response.data)
        return response.data

    }catch(error){
        console.error("Error in signup API:", error);
        throw error;
    }
}

export const Googlesignup=async(payload)=>{
    try{
        const response=await axios.post('https://theblack-turn-2.onrender.com/user/googleSignup',payload)

        return response.data
    }catch(error){
        console.error("Error in signin API:", error);
        throw error;
    }
}

export const Googlesignin=async(payload)=>{
    try{
        const response=await axios.post('https://theblack-turn-2.onrender.com/user/googleSignin',payload)

        return response.data
    }catch(error){
        console.error("Error in signin API:", error);
        throw error;
    }
}
export const signin=async(payload)=>{
    try{
        const response=await axios.post('https://theblack-turn-2.onrender.com/user/login',payload)

        console.log("signin----",response.data)
        return response.data

    }catch(error){
        console.error("Error in signin API:", error);
        throw error;
    }
}
export const CreateAlbum = async (payload) => {
    try {
        const response = await axios.post('http://localhost:3001/ReleseNewAlbum/create', payload);
        console.log("album create----", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in album create API:", error);
        throw error;
    }
};

