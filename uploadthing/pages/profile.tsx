// pages/profile.tsx
'use client';
import "@uploadthing/react/styles.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import axios from 'axios';
import { UploadButton } from "@/pages/utils/uploadthing";
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>('');

  useAuth('/profile');

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

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/login');
  };

  const handleImageUploadComplete = async (res: any) => {
    try {
      const imageUrl = res[0].url;
      setImageUrl(imageUrl);

      // Send the imageUrl to the backend to update the user's profile
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('/api/update-profile-picture', { imageUrl }, {
          headers: {
            'x-auth-token': token,
          },
        });
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }else{

  
  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Profile Picture: {user.profilePicture}</p>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={handleImageUploadComplete}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        {imageUrl.length ? (
          <div>
            <Image src={imageUrl} alt="profile picture" width={450} height={250}/>
          </div>
        ) : null}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
};

export default Profile;
