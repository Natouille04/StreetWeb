import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL = 'https://backend.streetweb.fr/';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "L'email est requis.";
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis.";
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

        try {
            await axios.get('/sanctum/csrf-cookie', {
                withCredentials: true
            }).then(async () => {
                const response = await axios.post('/login', {
                    email: formData.email,
                    password: formData.password
                });

                if (response.status === 200 || response.status === 204) {
                    navigate("/");
                }

                else {
                    setErrors({ general: "Réponse du serveur inattendue." });
                }
            })
        }

        catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setErrors({ general: "Les données fournies ne sont pas valides." });
                }

                else if (error.response.status === 401) {
                    setErrors({ general: "Email ou mot de passe incorrect." });
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
                    <p>Login</p>
                </div>

                <div className='flex flex-col p-8 space-y-4'>

                    {errors.general && (
                        <div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-medium text-center'>
                            {errors.general}
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="email" className='text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                            type="text"
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

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='text-black focus:text-red-500 pt-3 text-black cursor-pointer'
                    >
                        {isSubmitting ? 'Login in...' : 'Login'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className='text-black focus:text-red-500 pt-3 text-black cursor-pointer'
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;