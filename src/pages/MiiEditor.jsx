import { useEffect, useState } from "react";

import { Loading } from "../components/Loading.jsx";
import { MiiRender } from "../components/MiiRender.jsx";
import { PartsBtn } from "../components/PartsBtn.jsx";

import { getUserInfo } from "../modules/getUserInfo.jsx";

export default function MiiEditor() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getUserInfo().then((userData) => {
            setUser(userData);
            setLoading(false);
        });
    }, []);

    console.log(user?.miiData);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="relative h-screen">
            <div className="h-45/100">
                <MiiRender miiData={user?.miiData} body="face" />
            </div>

            <div className="h-60/100 w-full absolute bottom-0 z-10 drop-shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <div className="w-full h-10/100 flex flex-row justify-between border-b-8 border-neutral-300 px-1">
                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Face.png" alt="Face icon" className="w-80/100" />
                    </button>

                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Hair.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/EyeBrown.png" alt="EyeBrown icon" className="w-80/100" />
                    </button>

                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Eyes.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Nose.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/lips.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Accesory.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Height.png" alt="Hair icon" className="w-80/100" />
                    </button>
                </div>

                <div className="h-90/100 w-full bg-white absolute bottom-0 z-10 drop-shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                
                </div>
            </div>
        </div>
    );
}
