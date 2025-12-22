import { useEffect, useState } from "react";
import { MiiRender } from '../components/MiiRender.jsx';
import { getUserFriends } from '../modules/getUserFriends.jsx';

function FriendsList({ reloadKey }) {
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        async function fetchFriends() {
            try {
                const response = await getUserFriends();
                if (response && response.data) {
                    setFriends(response.data);
                }

                else {
                    setFriends([]);
                }
            }

            catch (error) {
                console.error("Failed to fetch friends:", error);
                setFriends([]);
            }

            finally {
                setIsLoading(false);
            }
        }

        fetchFriends();

    }, [reloadKey]);

    if (isLoading) {
        return <div className="p-3 text-white">Chargement des amis...</div>;
    }

    if (friends.length === 0) {
        return <div className="p-3 text-white">Ajoutez vos premiers amis !</div>;
    }

    return (
        <div className='grid grid-cols-3 gap-x-10 gap-y-5 p-3'>
            {friends.map(user => (
                <div className="w-25 h-25 bg-gray-300/60 rounded-lg flex justify-center items-center shadow-xl/50 ZoomIn">
                    <div className="w-85/100 h-85/100 bg-white rounded-lg">
                        <MiiRender
                            key={user.id}
                            name={user.name}
                            miiData={user.miiData}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export { FriendsList };