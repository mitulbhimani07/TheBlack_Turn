import axios from 'axios';
const API_URL = import.meta.env.OFFLINE_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const AddBlog = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/blogs/create`, payload)

        console.log("blog----", response.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const GetAllBlogs = async () => {
    try {
        const response = await axios.get(`${API_URL}/blogs/all`)

        console.log("blogs----", response.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const GetBlogById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/blogs/all/${id}`)

        console.log("blog by id----", response.data.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}
export const Signup = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/user/signup`, payload)

        console.log("signup----", response.data)
        return response.data

    } catch (error) {
        console.error("Error in signup API:", error);
        throw error;
    }
}

export const Googlesignup = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/user/googleSignup`, payload)

        return response.data
    } catch (error) {
        console.error("Error in signin API:", error);
        throw error;
    }
}

export const Googlesignin = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/user/googleSignin`, payload)
        return response.data
    } catch (error) {
        console.error("Error in signin API:", error);
        throw error;
    }
}
export const signin = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, payload)

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
        const response = await axios.post(`${API_URL}/ReleseNewAlbum/create`, payload, {
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
        const response = await axios.get(`${API_URL}/ReleseNewAlbum/all`, payload);
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
export const ViewSingleSongCT = async (payload) => {
    try {
        const response = await axios.get(`http://localhost:3001/singlesongCT/all`, payload);

        console.log("single song ct by id----", response.data.data)
        return response.data

    } catch (error) {
        console.error("Error in single song ct API:", error);
        throw error;
    }
}
export const SingleViewAlbum = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/ReleseNewAlbum/${id}`)

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
        const response = await axios.post(`${API_URL}/NOC/create`, payload, {
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
        const response = await axios.post(`${API_URL}/singlesongCT/create`, payload, {
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
    const response = await axios.get(`${API_URL}/NOC/singleNoc`, {
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
        const response = await axios.post(`${API_URL}/singlesongWithoutCT/create`, payload, {
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
        console.log('Sending payload:', payload);

        const response = await axios.post(
            `${API_URL}/OnlyCallerTune/create`,
            payload,
            {
                // DO NOT set 'Content-Type' for FormData; Axios handles it
                headers: {
                    'Accept': 'application/json'
                },
                timeout: 30000
            }
        });

        );

        console.log('✅ Caller Tune submitted successfully:', response.data);
        return {
            status: true,
            message: 'Submission successful',
            data: response.data
        };
    } catch (error) {
        console.error('❌ Full error object:', error);
        console.error('❌ Error response data:', error.response?.data);
        console.error('❌ Error config:', error.config);

        let errorMessage = 'Failed to submit caller tune';
        let errorData = null;

if (error.response) {
            errorData = error.response.data;
            errorMessage = error.response.data?.message ||
                           error.response.statusText ||
                           `Server responded with status ${error.response.status}`;
        } else if (error.request) {
            errorMessage = 'No response received from server - it might be down';
        } else {
            errorMessage = error.message || 'Request setup failed';
        }

        return {
            status: false,
            message: errorMessage,
            error: errorData || error.message
        };
    }
};



export const getLoggedInUser = async () => {
    const token = localStorage.getItem('Token');
    return axios.get(`${API_URL}/user/singleUser`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const changePassword = async (payload) => {
    const token = localStorage.getItem("Token");
    try {
        const response = await axios.post(
            `${API_URL}/user/change-password`,
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
        const response = await axios.post(`${API_URL}/user/forgot-password`, payload);
        console.log("Forgot password response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in forgot password API:", error);
        throw error;
    }
}

export const verifyOtp = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/user/verify-Otp`, payload);
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

        const response = await axios.post(`${API_URL}/user/reset-password`, finalPayload, {
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
export const ViewSingleSongCTById = async (id) => {
    const token = localStorage.getItem("Token");
    try {
        const response = await axios.get(`${API_URL}/singlesongCT/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in view single song ct by id API:', error);
        throw error;
    }
};