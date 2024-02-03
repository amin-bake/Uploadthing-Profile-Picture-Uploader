// pages/profile.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const response = await axios.get('/api/profile', {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(response.data);
        } catch (error: any) {
          if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            router.push('/login');
          } else {
            console.error('Error fetching profile', error);
          }
        }
      };

      fetchProfile();
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Profile Picture: {user.profilePicture}</p>
    </div>
  );
};

export default Profile;
