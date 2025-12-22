import { useState } from 'react';
import { MiiRender } from './MiiRender';
import { Navigate, useNavigate } from "react-router-dom";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 * @param {function} props.onClose
 */

function PopUp({ title, children, style, onClose }) {
    return (
        <div className='h-full w-full bg-black/80 absolute top-0 flex justify-center items-center z-10'>
            <div className={`ZoomIn max-w-md w-80/100 bg-white rounded-lg shadow-2xl overflow-hidden inset-shadow-sm inset-shadow-[#20bab3] ${style ?? ''}`}>
                <div className='bg-[#147f7a] text-white flex items-center justify-between px-3 h-12 text-2xl font-bold inset-shadow-sm inset-shadow-[#20bab3]'>
                    <div className="w-6"></div>
                    <p>{title}</p>
                    <p onClick={onClose}><i className="ri-close-line"></i></p>
                </div>

                <div className='flex flex-col p-3 space-y-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}

function ProfilePopUp({ title, style, onClose, miiData = "AwEAMMaKAO9XzBI0gP9wmXzr1MnDFgAAAABCAGEAcwBlAAAAAAAAAAAAAAAAAEBAAAAhAQJoRBgmNEYUgRIXaA0AACkAUkhQbgBhAHQAAAAAAAAAAAAAAAAAAAAAAFVP" }) {
    const [isAccountSettingsOpen, SetAccountSettingsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='h-full w-full bg-black/80 absolute top-0 flex justify-center items-center z-10'>
            <div className={`ZoomIn max-w-md h-60 w-90/100 border-5 border-white bg-white rounded-[60px/100%] shadow-2xl overflow-hidden ${style ?? ''}`}>

                <div className='w-full h-10/100 bg-blue-500 flex justify-center items-center text-white px-5'>
                    <p className="font-bold text-xl mb-1">{title}</p>
                </div>

                <div className='w-full h-90/100 flex flex-row relative'>
                    <div className='w-full h-full flex flex-col justify-between'>

                        <div className='w-35/100 p-2 pl-5'>
                            <div className='bg-blue-500 rounded-2xl'>
                                <MiiRender miiData={miiData} />
                            </div>
                        </div>

                        <div className='bg-linear-to-t from-sky-300 to-sky-200 w-full h-50/100 rounded-lg'></div>
                    </div>

                    <div className='absolute right-0 w-65/100 h-full flex flex-col justify-center items-center bg-linear-to-t from-cyan-100 to-cyan-50 rounded-lg border-l-4 border-white drop-shadow-xl/50'>
                        {!isAccountSettingsOpen && (
                            <>
                                <button
                                    className='text-lg active:text-red-500 w-70/100 text-left'
                                    onClick={() => {
                                        onClose();
                                        navigate("/editor")
                                    }}
                                >
                                    Mii Editor
                                </button>

                                <button
                                    className='text-lg active:text-red-500 w-70/100 text-left'
                                    onClick={() => SetAccountSettingsOpen(true)}
                                >
                                    Account settings
                                </button>

                                <button
                                    className='text-lg active:text-red-500 w-70/100 text-left'
                                    onClick={onClose}
                                >
                                    Back
                                </button>
                            </>
                        )}

                        {isAccountSettingsOpen && (
                            <>
                                <button
                                    className='text-lg active:text-red-500 w-70/100 text-left'
                                    onClick={() => SetAccountSettingsOpen(false)}
                                >
                                    Back
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { PopUp, ProfilePopUp };