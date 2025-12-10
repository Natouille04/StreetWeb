import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { Footer } from '../components/footer.jsx';
import { FriendsList } from '../components/FriendsList.jsx';
import { PopUp } from '../components/PopUp.jsx';
import { QrCode } from '../components/QrCode.jsx';

import { isUserConnected } from '../modules/isUserConnected.jsx';

import plazaMusic from '../assets/music/Plaza-Music-3.mp3';

function Home() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

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

    if (isLoading) {
        return <div>Chargement de la page...</div>;
    }

    return (
        <div className="h-screen bg-white w-full">
            <div className="w-full h-full bg-green-500 background-grass">
                <FriendsList />
            </div>
            <Footer />

            <PopUp title='Add friends' style='h-50/100'>
                <div className='h-50/100'>
                    <QrCode data="test" />
                </div>
            </PopUp>
        </div>
    );
}

export default Home;