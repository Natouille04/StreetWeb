import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import { Loading } from '../components/Loading.jsx';
import { Footer } from '../components/footer.jsx';
import { FriendsList } from '../components/FriendsList.jsx';
import { PopUp } from '../components/PopUp.jsx';
import { QrCode } from '../components/QrCode.jsx';
import { CameraScanner } from '../components/CameraScanner.jsx';
import { ProfilePopUp } from '../components/PopUp.jsx';

import { isUserConnected } from '../modules/isUserConnected.jsx';
import { getUserInfo } from '../modules/getUserInfo.jsx';
import { scanCodeFile } from '../modules/scanCodeFile.jsx';
import { addFriend } from '../modules/addFriend.jsx';

function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isScannerOpen, setScannerOpen] = useState(false);

    const [user, setUser] = useState(null);

    const [reloadFriendsKey, setReloadFriendsKey] = useState(0);

    const triggerFriendsReload = () => {
        setReloadFriendsKey(prevKey => prevKey + 1);
    };

    const onFileChange = useCallback((event) => {
        const file = event.target.files[0];

        if (!file) {
            console.log("No file was selected.");
            return;
        }
        
        scanCodeFile(file)
            .then(result => {
                console.log("QR Code Text:", result);
                return addFriend(result);
            })
            .then(() => {
                console.log("Ami ajouté avec succès.");
                setPopupOpen(false); 
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'ami:", error);
            })
            .finally(() => {
                triggerFriendsReload();
            });
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserInfo();

            if (userData) {
                setUser(userData);
                setIsLoading(false);
            }

            else {
                console.log("Failed to get user data.");
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="h-screen bg-white w-full">
            <div className="w-full h-full bg-green-500 background-grass flex justify-center items-start">
                <FriendsList reloadKey={reloadFriendsKey} />
            </div>
            <Footer setPopupOpen={setPopupOpen} />

            {isPopupOpen && (
                <PopUp title="Add friends" onClose={() => setPopupOpen(false)}>
                    {!isScannerOpen && user && (
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
                            <CameraScanner onDetected={(result) => {
                                addFriend(result)
                                    .catch(error => {
                                        console.error("Erreur lors de l'ajout via scanner:", error);
                                    })
                                    .finally(() => {
                                        triggerFriendsReload();
                                    });

                                setScannerOpen(false)
                                setPopupOpen(false)
                            }} />

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

            {/* <ProfilePopUp /> */}
        </div>
    );
}

export default Home;