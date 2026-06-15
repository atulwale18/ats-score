import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
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
