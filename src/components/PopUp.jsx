import React from 'react';

/**
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 */

function PopUp({ title, children, style }) {
    return (
        <div className='h-full w-full bg-black/80 absolute top-0 flex justify-center items-center'>
            <div className={`ZoomIn max-w-md w-80/100 bg-white rounded shadow-2xl overflow-hidden inset-shadow-sm inset-shadow-[#20bab3] ${style ?? ''}`}>
                <div className='bg-[#147f7a] text-white flex items-center justify-center h-12 text-2xl font-bold inset-shadow-sm inset-shadow-[#20bab3]'>
                    <p>{title}</p>
                </div>

                <div className='flex flex-col p-3 space-y-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export { PopUp };