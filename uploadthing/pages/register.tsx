// pages/register.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({email:  '', password: ''});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    
    try {
      await axios.post('/api/register', { email, password });
      console.log('Registration successful');
      router.push('/login');  
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Registration failed', error.response.data.message);
      } else {
        console.error('An unexpected error occurred during registration', error);
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
