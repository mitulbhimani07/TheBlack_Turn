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
export const ViewAlbum = async () => {
  const token = localStorage.getItem("Token");
  try {
    const response = await axios.get(`${API_URL}/ReleseNewAlbum/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // Extract albums array from response.data.data
    const albums = response.data.data || [];
    console.log('✅ Albums fetched successfully:', albums);
    
    return {
      status: true,
      message: 'Data fetched successfully',
      data: albums // Return the actual array of albums
    };
  } catch (error) {
    console.error('❌ Error fetching albums:', error.message);
    throw error;
  }
};

export const ViewSingleSongCT = async () => {
  const token = localStorage.getItem("Token");
  try {
    const response = await axios.get(`http://localhost:3001/singlesongCT/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetched CT songs:", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching single song CT data:", error);
    throw error;
  }
};

export const SingleViewAlbum = async (id) => {
   const token = localStorage.getItem("Token");
    try {
        const response = await axios.get(`${API_URL}/ReleseNewAlbum/${id}`,{
           headers: {
        Authorization: `Bearer ${token}`,
      }
        })
  
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
    const response = await axios.post(
      `${API_URL}/singlesongWithoutCT/create`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in single song without ct create API:", error);
    throw error;
  }
};
export const OnlyCallerTunedata = async (payload) => {
        const token = localStorage.getItem("Token");

    try {
        const response = await axios.post("http://localhost:3001/OnlyCallerTune/create", payload, {
            headers: {
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
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
    console.log('Raw API Response:', response); // Debug
    return response.data;
  } catch (error) {
    console.error('Error in view single song ct by id API:', error);
    throw error;
  }
};
export const viewOnlyCallerTuneData = async () => {
  const token = localStorage.getItem("Token");
  try {
    const response = await axios.get(`${API_URL}/OnlyCallerTune/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Raw API Response:', response); // Debug
    return response.data;  // Should return data array or object containing your data
  } catch (error) {
    console.error('Error in view only caller tune data API:', error);
    throw error;
  }
};

export const viewSingleOnlyCallerTune = async (id) => {
  const token = localStorage.getItem("Token");
  try {
    const response = await axios.get(`${API_URL}/OnlyCallerTune/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('API Response Data:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const viewSingleSongWithoutCT = async () => {
    const token = localStorage.getItem("Token");
    try{
        const response = await axios.get('http://localhost:3001/singlesongWithoutCT/all',{
             headers: {
        Authorization: `Bearer ${token}`
      }
        });
        console.log('view sinlge song without CT Response Data:', response.data);
        return response.data;

    }catch(error){
         console.error('Error fetching single song without Ct:', error);
    throw error;
    }
};
export const viewSingleSongWithoutCTById = async (id) => {
  const token = localStorage.getItem("Token");
  try {
    const response = await axios.get(`http://localhost:3001/singlesongWithoutCT/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching single song:', error);
    throw error;
  }
};