import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

axios.defaults.withCredentials = true;

const xsrfToken = Cookies.get('XSRF-TOKEN');

console.log(xsrfToken);

if (xsrfToken) {
    axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;
}

function Footer({ setPopupOpen }) {
    const navigate = useNavigate();
    const LogOut = async () => {
        try {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;
            await axios.post('http://localhost:8000/logout');
            navigate('/login');

        } 
        
        catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
        }
    }

    return (
        <div className="w-full h-10/100 bg-[#2f785d]/60 absolute bottom-0 drop-shadow-xl/50">
            <nav className='h-full flex justify-between overflow-visible px-2'>

                <i className="h-full ri-gamepad-fill text-white text-3xl"></i>
                <i className="h-full ri-user-community-fill text-white text-3xl"></i>

                <div className="w-20 h-20 flex justify-center items-center bg-white rounded-full -translate-y-9" onClick={() => setPopupOpen(true)}>
                    <p className="flex items-center text-3xl pb-1">+</p>
                </div>

                <i className="h-full ri-user-fill text-white text-3xl"></i>
                <i onClick={() => LogOut()} className=" h-full ri-logout-box-fill text-white text-3xl"></i>
            </nav>
        </div>
    );
}

export { Footer };