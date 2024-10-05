import { useState, useEffect } from 'react';
import { getUserMyUserRequest } from '../../../Apis/apiGeneral';

export const useMyPerfil = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userDetails = localStorage.getItem('user');

            if (userDetails) {
                const { uid } = JSON.parse(userDetails); // Usamos uid

                try {
                    const userData = await getUserMyUserRequest();

                    const user = userData.user;

                    // Convertir las barras invertidas a barras normales en ambos campos, si existen
                    if (user && user.imagesUser && user.imagesUser.length > 0) {
                        user.imagesUser = user.imagesUser.map(path => path.replace(/\\/g, '/'));
                    }
                    if (user && user.imageUrl) {
                        user.imageUrl = user.imageUrl.replace(/\\/g, '/');
                    }

                    setUser(user);
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('No user details found in localStorage.');
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};
