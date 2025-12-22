import { LoaderMii } from "./LoaderMii.jsx";

function Loading({ text = "Loading..." }) {
    return (
        <div className="h-screen w-full bg-gradient-to-b from-[#2d9650] to-slate-50 flex items-center justify-center">
            <div className='flex flex-col justify-center items-center h-25/100 ZoomIn max-w-md w-80/100 bg-white rounded shadow-2xl overflow-hidden inset-shadow-sm inset-shadow-[#20bab3]'>
                <p className="mb-4 text-lg">{text}</p>
                <LoaderMii />
            </div>
        </div>
    );
}

export { Loading };