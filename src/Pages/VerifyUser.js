import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { App } from "realm-web";
import FaultyDashboard from './FaultyDashboard';
import StudentsDashboard from './StudentsDashboard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function VerifyUser() {
    const app = new App({
        id: "application-0-vldvg",
    });
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const tokenId = searchParams.get('tokenId');
    const navigate = useNavigate(); // Move useNavigate hook to the top level

    useEffect(() => {
        const confirmUser = async () => {
            try {
                await app.emailPasswordAuth.confirmUser({ token, tokenId });
                // User email address confirmed.
                console.log("Successfully confirmed user.");
                toast.success("Login successful!");

                // Navigate to StudentsDashboard
                setTimeout(() => {
                    navigate("/StudentsDashboard");
                }, 2000);

                // Show toast notification
            } catch (err) {
                console.log(`User confirmation failed: ${err}`);
            }
        }
        confirmUser();
    }, [token, tokenId, navigate]); // Add navigate to the dependency array

    return (
        <ToastContainer/>
    )
}