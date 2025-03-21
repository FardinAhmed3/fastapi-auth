import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChangeCredentials = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8000/verify-token/${token}`);
                if (!response.ok) {
                    throw new Error('Token verification failed');
                }
            } catch {
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        verifyToken();
    }, [navigate]);

    const validateForm = () => {
        if (!newUsername && !newPassword) {
            setError("Enter a new username or password");
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/change-credentials', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    new_username: newUsername || null,
                    new_password: newPassword || null,
                }),
            });

            setLoading(false);

            if (response.ok) {
                setSuccess("Credentials updated successfully");
                setNewUsername('');
                setNewPassword('');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Failed to update credentials");
            }
        } catch {
            setLoading(false);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Change Credentials</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">New Username:</label>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Updating...' : 'Update Credentials'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangeCredentials;
