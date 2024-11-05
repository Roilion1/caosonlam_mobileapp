
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Cập nhật URL cơ bản

const register = async (formData: any) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Đặt header cho multipart
            },
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error during registration:', error); // In ra lỗi nếu có
        throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi
    }
};

const login = async (email: any, password: any) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message); // In ra lỗi từ phản hồi
        throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi
    }
};

export default {
    register,
    login,
};
