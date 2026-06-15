import axios from 'axios';

// If VITE_API_URL is provided, use it. Otherwise, point to port 8000 on whatever host the frontend is currently loaded from.
// This prevents 'localhost' being hardcoded when deploying to an EC2 instance.
const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        return `http://${hostname}:8000`;
    }
    return 'http://localhost:8000';
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const analyzeResume = async (resumeText, jobDescription) => {
    const formData = new FormData();
    formData.append('resume_text', resumeText);
    formData.append('job_description', jobDescription);
    const response = await api.post('/analyze', formData);
    return response.data;
};

export const getAnalytics = async () => {
    const response = await api.get('/analytics');
    return response.data;
};
