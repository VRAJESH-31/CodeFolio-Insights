import { useState, useEffect } from "react";
import { axiosInstance } from "../api/export.js";

const useHighlights = () => {
    const [highlights, setHighlights] = useState({ 
        totalUsers: 0, 
        sampleUsers: [], 
        totalResumes: 0, 
        totalGithubProfiles: 0, 
        totalLeetcodeProfiles: 0, 
        totalApiKeys: 0, 
        totalPublicApiCalls: 0 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const response = await axiosInstance.get("/api/user/highlights");
                setHighlights(response.data);
            } catch (err) {
                console.error("Failed to fetch highlights:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlights();
    }, []);

    return { highlights, loading, error };
};

export { useHighlights };
