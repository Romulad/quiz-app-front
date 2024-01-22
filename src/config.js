
export const baseUrl = (
    window.location.host.includes("localhost") ? 
    "http://127.0.0.1:5000/api" : `https://quiz-geiw.onrender.com/api`
)