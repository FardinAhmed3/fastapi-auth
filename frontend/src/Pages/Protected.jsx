import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            try {
                const response = await fetch(`http://localhost:8000/verify-token/${token}`); // Fixed template literal

                if (!response.ok) {
                    throw new Error('Token verification failed');
                }
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        verifyToken();
    }, [navigate]);

    return <div>

        <h1 className='text-6xl justify-center text-center'>This is a protected page. Only visible to auth users</h1>
        
        </div>;
};

export default ProtectedPage;
