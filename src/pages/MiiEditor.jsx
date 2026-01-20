import { useEffect, useMemo, useState } from "react";
import Mii from "@pretendonetwork/mii-js";
import axios from 'axios';

import { Loading } from "../components/Loading.jsx";
import { base64ToArrayBuffer, uint8ToBase64 } from "../components/MiiRender.jsx";
import { PartsBtn } from "../components/PartsBtn.jsx";

import { getUserInfo } from "../modules/getUserInfo.jsx";

export default function MiiEditor() {
    const [user, setUser] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const [partsId, setPartsId] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const UserMii = useMemo(() => {
        if (!user?.miiData) return null;
        return new Mii(base64ToArrayBuffer(user.miiData));
    }, [user]);

    const MII_PARTS = {
        height: 128,
        build: 128,
        faceType: 12,
        skinColor: 9,
        wrinklesType: 12,
        makeupType: 12,
        hairType: 132,
        hairColor: 8,
        flipHair: 2,
        eyeType: 60,
        eyeColor: 6,
        eyeScale: 8,
        eyeVerticalStretch: 7,
        eyeRotation: 8,
        eyeSpacing: 13,
        eyeYPosition: 19,
        eyebrowType: 25,
        eyebrowColor: 8,
        eyebrowScale: 9,
        eyebrowVerticalStretch: 7,
        eyebrowRotation: 12,
        eyebrowSpacing: 13,
        eyebrowYPosition: 16,
        noseType: 18,
        noseScale: 9,
        noseYPosition: 19,
        mouthType: 36,
        mouthColor: 5,
        mouthScale: 9,
        mouthHorizontalStretch: 7,
        mouthYPosition: 19,
        mustacheType: 6,
        beardType: 6,
        facialHairColor: 8,
        mustacheScale: 9,
        mustacheYPosition: 17,
        glassesType: 9,
        glassesColor: 6,
        glassesScale: 8,
        glassesYPosition: 21,
        moleEnabled: 2,
        moleScale: 9,
        moleXPosition: 17,
        moleYPosition: 31
    };

    function reloadMii() {
        if (!UserMii) return;

        const studioUrl = UserMii.studioUrl({
            width: 512,
            type: "face"
        });

        setUserImg(studioUrl);
    }

    useEffect(() => {
        getUserInfo().then((userData) => {
            setUser(userData);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!UserMii) return;
        reloadMii();
    }, [UserMii]);

    if (isLoading || !UserMii) {
        return <Loading />;
    }

    return (
        <div className="relative h-screen">
            <div className="absolute top-0 w-full h-15 p-2 flex justify-end">
                <button className="w-30/100 h-full rounded bg-linear-to-r to-sky-300 from-sky-500 font-bold" onClick={() => {
                    UserMii.miiName = "abcdefghij";
                    UserMii.creatorName = "abcdefghij";

                    axios.post('https://backend.streetweb.fr/api/users/updateMii',
                        {
                            identifier: user.identifier.toString(),
                            miiData: uint8ToBase64(UserMii.encode())
                        },
                        {
                            withCredentials: true
                        }
                    );
                }}>Save</button>
            </div>

            <div className="h-45/100">
                <img src={userImg} />
            </div>

            <div className="h-60/100 w-full absolute bottom-0 z-10 drop-shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <div className="w-full h-10/100 flex flex-row justify-between border-b-8 border-neutral-300 px-1">
                    <button onClick={() => setPartsId(0)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Face.png" alt="Face icon" className="w-80/100" />
                    </button>

                    <button onClick={() => setPartsId(1)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Hair.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button onClick={() => setPartsId(2)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/EyeBrown.png" alt="EyeBrown icon" className="w-80/100" />
                    </button>

                    <button onClick={() => setPartsId(3)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Eyes.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button onClick={() => setPartsId(4)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Nose.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button onClick={() => setPartsId(5)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/lips.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button onClick={() => setPartsId(6)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Accesory.png" alt="Hair icon" className="w-80/100" />
                    </button>

                    <button onClick={() => setPartsId(7)} className="bg-linear-to-t to-sky-300 from-sky-500 w-10/100 h-full rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <img src="/images/Icons/Height.png" alt="Hair icon" className="w-80/100" />
                    </button>
                </div>

                <div className="h-90/100 w-full bg-white py-3 absolute bottom-0 z-10 drop-shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-y-auto flex justify-center">
                    {partsId === 0 && (
                        <>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-1">
                                {Array.from({ length: MII_PARTS.faceType }).map((_, i) => (
                                    <PartsBtn
                                        key={i}
                                        mii={UserMii}
                                        part="faceType"
                                        value={i}
                                        onChange={reloadMii}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {partsId === 1 &&
                        <>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-1">
                                {
                                    Array.from({ length: MII_PARTS.hairType }).map((_, i) => (
                                        <PartsBtn
                                            key={i}
                                            mii={UserMii}
                                            part="hairType"
                                            value={i}
                                            onChange={reloadMii}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    }

                    {partsId === 2 &&
                        <>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-1">
                                {
                                    Array.from({ length: MII_PARTS.eyebrowType }).map((_, i) => (
                                        <PartsBtn
                                            key={i}
                                            mii={UserMii}
                                            part="eyebrowType"
                                            value={i}
                                            onChange={reloadMii}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    }

                    {partsId === 3 &&
                        <>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-1">
                                {
                                    Array.from({ length: MII_PARTS.eyeType }).map((_, i) => (
                                        <PartsBtn
                                            key={i}
                                            mii={UserMii}
                                            part="eyeType"
                                            value={i}
                                            onChange={reloadMii}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    }

                    {partsId === 4 &&
                        <>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-1">
                                {
                                    Array.from({ length: MII_PARTS.noseType }).map((_, i) => (
                                        <PartsBtn
                                            key={i}
                                            mii={UserMii}
                                            part="noseType"
                                            value={i}
                                            onChange={reloadMii}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    }

                    {partsId === 5 &&
                        <>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-1">
                                {
                                    Array.from({ length: MII_PARTS.mouthType }).map((_, i) => (
                                        <PartsBtn
                                            key={i}
                                            mii={UserMii}
                                            part="mouthType"
                                            value={i}
                                            onChange={reloadMii}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
