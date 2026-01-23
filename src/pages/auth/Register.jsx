import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Mii from '@pretendonetwork/mii-js';

import { base64ToArrayBuffer } from "../../components/MiiRender";

const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [gender, setGender] = useState(0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });

        if (errors[e.target.id] || errors.general) {
            const newErrors = { ...errors };
            delete newErrors[e.target.id];
            setErrors(newErrors);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = "Le nom d'utilisateur est requis.";
        }

        if (!formData.email) {
            newErrors.email = "L'email est requis.";
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis.";
        }

        else if (formData.password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        const DupeMii = new Mii(
            base64ToArrayBuffer("AwEAMMaKAO9XzBI0gP9wmXzr1MnDFgAAAABCAGEAcwBlAAAAAAAAAAAAAAAAAEBAAAAhAQJoRBgmNEYUgRIXZgwAACkAUkhQbgBhAHQAAAAAAAAAAAAAAAAAAAAAAHkJ")
        );

        const JsonMiiObj = JSON.stringify(DupeMii);
        const base64 = btoa(encodeURIComponent(JsonMiiObj));

        try {
            await axios.get('/sanctum/csrf-cookie', {
                withCredentials: true
            });

            console.log(base64);

            const response = await axios.post('/register', {
                name: formData.username,
                email: formData.email,
                miiData: base64,
                genre: gender,
                password: formData.password,
                password_confirmation: formData.confirmPassword
            });

            if (response.status === 201 || response.status === 200 || response.status === 204) {
                navigate("/");
            }

            else {
                setErrors({ general: "Réponse du serveur inattendue lors de l'inscription." });
            }

        }

        catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    const newErrors = {};
                    const validationErrors = error.response.data.errors;
                    
                    let generalMessage = "Veuillez corriger les erreurs ci-dessous.";

                    if (validationErrors.email) {
                        newErrors.email = validationErrors.email[0];
                    }
                    if (validationErrors.name) {
                        newErrors.username = validationErrors.name[0];
                    }
                    if (validationErrors.password) {
                        newErrors.password = validationErrors.password[0];
                        newErrors.confirmPassword = newErrors.password;
                    }

                    setErrors({
                        ...newErrors,
                        general: generalMessage
                    })
                }

                else {
                    setErrors({ general: `Erreur de serveur: ${error.response.status}` });
                }
            }

            else {
                setErrors({ general: "Impossible de se connecter au serveur." });
                console.error("Erreur réseau:", error);
            }
        }

        finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="h-screen w-full bg-gradient-to-b from-[#2d9650] to-slate-50 flex items-center justify-center">
            <form className='ZoomIn max-w-md w-80/100 bg-white rounded shadow-2xl overflow-hidden inset-shadow-sm inset-shadow-[#20bab3]' onSubmit={handleSubmit}>
                <div className='bg-[#147f7a] text-white flex items-center justify-center h-12 text-2xl font-bold inset-shadow-sm inset-shadow-[#20bab3]'>
                    <p>Register</p>
                </div>

                <div className='flex flex-col p-8 space-y-4'>

                    {errors.general && (
                        <div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-medium text-center'>
                            {errors.general}
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="username" className='text-sm font-medium text-gray-700 mb-1'>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`p-3 border rounded-lg transition duration-200 ${errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-[#147f7a] focus:border-[#147f7a] outline-none'}`}
                            placeholder="Matt"
                        />
                        {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className='text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`p-3 border rounded-lg transition duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-[#147f7a] focus:border-[#147f7a] outline-none'}`}
                            placeholder="your.email@exemple.com"
                        />
                        {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className='text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`p-3 border rounded-lg transition duration-200 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-[#147f7a] focus:border-[#147f7a] outline-none'}`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className='text-sm font-medium text-gray-700 mb-1'>Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`p-3 border rounded-lg transition duration-200 ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-[#147f7a] focus:border-[#147f7a] outline-none'}`}
                            placeholder="••••••••"
                        />

                        {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex flex-row justify-between">
                        <button type='button' onClick={() => setGender(0)} className={`w-1/2 flex flex-row justify-center text-xl border-2 border-r-0 rounded-tl-xl rounded-bl-xl ${gender === 0 ? "text-blue-500" : "text-gray-400"}`} >
                            <i className="ri-men-fill"></i>
                        </button>

                        <button type='button' onClick={() => setGender(1)} className={`w-50/100 flex flex-row justify-center text-xl border-2 border-l-1 rounded-tr-xl rounded-br-xl ${gender === 1 ? "text-red-500" : "text-gray-400"}`} >
                            <i className="ri-women-fill"></i>
                        </button>
                    </div>

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='text-black focus:text-red-500 pt-3 text-black cursor-pointer'
                    >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className='text-black focus:text-red-500 pt-3 text-black cursor-pointer'
                    >
                        Login
                    </button>
                </div >
            </form >
        </div >
    );
}

export default Register;