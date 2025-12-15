import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { Footer } from '../components/footer.jsx';
import { FriendsList } from '../components/FriendsList.jsx';
import { PopUp } from '../components/PopUp.jsx';
import { QrCode } from '../components/QrCode.jsx';
import { CameraScanner } from '../components/CameraScanner.jsx';

import { isUserConnected } from '../modules/isUserConnected.jsx';
import { getUserInfo } from '../modules/getUserInfo.jsx';
import { scanCodeFile } from '../modules/scanCodeFile.jsx';
import { addFriend } from '../modules/addFriend.jsx';

import plazaMusic from '../assets/music/Plaza-Music-3.mp3';

function Home() {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isScannerOpen, setScannerOpen] = useState(false);

    const [user, setUser] = useState(null);

    const audioRef = useRef(null);

    const onFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        scanCodeFile(file)
            .then(result => {
                console.log("QR Code Text:", result);
                addFriend(result);
            })
    };

    useEffect(() => {
        audioRef.current = new Audio(plazaMusic);
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }

        else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(error => {
                    console.error("Audio playback failed (Autoplay blocked or other error):", error);
                });
        }
    };

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            const connected = await isUserConnected();
            setIsLoading(false);

            if (connected === false) {
                console.log("chiasse: Utilisateur non connecté. Redirection...");
                navigate('/login');
            }
        };
        checkAuthAndRedirect();
    }, [navigate]);

    useEffect(() => {
        togglePlay();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserInfo();

            if (userData) {
                setUser(userData);
            }

            else {
                console.log("Failed to get user data.");
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return <div>Chargement de la page...</div>;
    }

    return (
        <div className="h-screen bg-white w-full">
            <div className="w-full h-full bg-green-500 background-grass flex justify-center items-start">
                <FriendsList />
            </div>
            <Footer setPopupOpen={setPopupOpen} />

            {isPopupOpen && (
                <PopUp title="Add friends" onClose={() => setPopupOpen(false)}>
                    {!isScannerOpen && (
                        <>
                            <QrCode data={user.identifier} size='1080' />
                            <div className='flex flex-col items-center'>
                                <p className='font-bold text-xl'>--- Scan your friend's code ---</p>

                                <button
                                    className='mt-4 mb-1 text-lg active:text-red-500'
                                    onClick={() => setScannerOpen(true)}
                                >
                                    Scan with camera
                                </button>

                                <input
                                    id='qr-input'
                                    type='file'
                                    className='hidden'
                                    accept='image/*, .jpg, .png, .webp'
                                    onChange={onFileChange}
                                />
                                <label htmlFor="qr-input" className='text-lg active:text-red-500'>
                                    Import as a file
                                </label>
                            </div>
                        </>
                    )}

                    {isScannerOpen && (
                        <>
                            <CameraScanner onDetected={(result) => addFriend(result)} />

                            <button
                                className='mt-4 mb-1 text-lg active:text-red-500'
                                onClick={() => setScannerOpen(false)}
                            >
                                Back
                            </button>
                        </>
                    )}
                </PopUp>
            )}
        </div>
    );
}

export default Home;