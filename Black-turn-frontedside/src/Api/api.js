import axios from 'axios';

export const AddBlog = async (payload) => {
    try {
        const response = await axios.post('https://theblack-turn-2.onrender.com/blogs/create', payload)

        console.log("blog----", response.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const GetAllBlogs = async () => {
    try {
        const response = await axios.get('https://theblack-turn-2.onrender.com/blogs/all')

        console.log("blogs----", response.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const GetBlogById = async (id) => {
    try {
        const response = await axios.get(`https://theblack-turn-2.onrender.com/blogs/all/${id}`)

        console.log("blog by id----", response.data.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const Signup = async (payload) => {
    try {
        const response = await axios.post('http://localhost:3001/user/signup', payload)

        console.log("signup----", response.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}

export const Googlesignup = async (payload) => {
    try {
        const response = await axios.post('https://theblack-turn-2.onrender.com/user/googleSignup', payload)

        return response.data
    } catch (error) {
        console.error("Error in signin API:", error);
        throw error;
    }
}

export const Googlesignin = async (payload) => {
    try {
        const response = await axios.post('https://theblack-turn-2.onrender.com/user/googleSignin', payload)

        return response.data
    } catch (error) {
        console.error("Error in signin API:", error);
        throw error;
    }
}
export const signin = async (payload) => {
    try {
        const response = await axios.post('http://localhost:3001/user/login', payload)

        console.log("signin----", response.data)
        console.log("token--", response.token)
        return response.data

    } catch (error) {
        console.error("Error in signin API:", error);
        throw error;
    }
}
export const CreateAlbum = async (payload) => {
    const token = localStorage.getItem("Token");
    try {
        const response = await axios.post('http://localhost:3001/ReleseNewAlbum/create', payload, {
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        console.log("album create----", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in album create API:", error);
        throw error;
    }
};
export const ViewAlbum = async (payload) => {
    try {
        const response = await axios.get(`https://theblack-turn-2.onrender.com/ReleseNewAlbum/all`, payload);
        console.log('✅ NOC Data fetched successfully:', response.data);
        return {
            status: true,
            message: 'Data fetched successfully',
            data: response.data
        };
    } catch (error) {
        console.error('❌ Error fetching NOC data:', error.message);
        throw error;
    }
}
export const SingleViewAlbum = async (id) => {
    try {
        const response = await axios.get(`https://theblack-turn-2.onrender.com/ReleseNewAlbum/${id}`)

        console.log("blog by id----", response.data.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const CreateNOC = async (payload) => {
    const token = localStorage.getItem("Token");

    try {
        const response = await axios.post('https://theblack-turn-2.onrender.com/NOC/create', payload, {
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        console.log("NOC from", response.data)
        return response.data;
    } catch (error) {
        console.error("Error in Noc create API:", error);
        throw error;
    }
}


export const CreateSingleSongCT = async (payload) => {
    const token = localStorage.getItem("Token");

    try {
        const response = await axios.post('https://theblack-turn-2.onrender.com/singlesongCT/create', payload, {
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        console.log("single song ct from", response.data)
        return response.data;
    } catch (error) {
        console.error("Error in single song ct create API:", error);
        throw error;
    }
}
export const singleViewNoc = async () => {
    const token = localStorage.getItem('Token');
    const response = await axios.get('http://localhost:3001/NOC/singleNoc', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("singleviewNoc", response)
    return response.data
};


export const CreateSingleSongWithoutCt = async (payload) => {
    const token = localStorage.getItem("Token");

    try {
        const response = await axios.post('http://localhost:3001/singlesongWithoutCT/create', payload, {
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        console.log("single song without ct from", response.data)
        return response.data;
    } catch (error) {
        console.error("Error in single song  without ct create API:", error);
        throw error;
    }
}
export const OnlyCallerTuneData = async (payload) => {
    try {
        const response = await axios.post(`http://localhost:3001/OnlyCallerTune/create`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log('✅ Caller Tune submitted successfully:', response.data);
        return {
            status: true,
            message: 'Submission successful',
            data: response.data
        };
    } catch (error) {
        console.error('❌ Error submitting caller tune:', error);

        // Return a consistent error structure
        return {
            status: false,
            message: error.response?.data?.message || error.message || 'Failed to submit caller tune',
            error: error.response?.data || error
        };
    }
};


export const getLoggedInUser = async () => {
    const token = localStorage.getItem('Token');
    return axios.get('http://localhost:3001/user/singleUser', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const changePassword = async (payload) => {
    const token = localStorage.getItem("Token");
    try {
        const response = await axios.post(
            'http://localhost:3001/user/change-password',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Password changed:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
};

export const forgotPassword = async (payload) => {
    try {
        const response = await axios.post('http://localhost:3001/user/forgot-password', payload);
        console.log("Forgot password response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in forgot password API:", error);
        throw error;
    }
}

export const verifyOtp = async (payload) => {
    try {
        const response = await axios.post('http://localhost:3001/user/verify-Otp', payload);
        console.log("OTP verification response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in OTP verification API:", error);
        throw error;
    }
}

export const resetPasswordWithOtp = async (payload) => {
    try {
        // Ensure email is normalized
        const finalPayload = {
            ...payload,
            email: payload.email.trim().toLowerCase()
        };

        const response = await axios.post('http://localhost:3001/user/reset-password', finalPayload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Password reset response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in reset password API:", error.response?.data || error.message);
        throw error;
    }
};