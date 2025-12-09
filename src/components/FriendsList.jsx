import React, { useEffect, useState } from "react";
import { MiiRender } from '../components/MiiRender.jsx';
import { getUserFriends } from '../modules/getUserFriends.jsx';

function FriendsList() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function fetchFriends() {
            try {
                const response = await getUserFriends();
                if (response && response.data) {
                    setFriends(response.data);
                }
            } 
            
            catch (error) {
                console.error("Failed to fetch friends:", error);
            }
        }
        
        fetchFriends();
        
    }, []);

    if (friends.length === 0) {
        return <div className='p-3'>No friends :(</div>;
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-3'>
            {friends.map(user => (
                <MiiRender 
                    key={user.id}
                    name={user.name} 
                    miiData={user.miiData}
                />
            ))}
        </div>
    );
}

export { FriendsList };