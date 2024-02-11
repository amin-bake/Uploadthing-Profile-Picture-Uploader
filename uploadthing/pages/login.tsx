// pages/login.tsx
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth'; 

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useAuth('/login');
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const token = response.data.token;

      // Save the token to localStorage
      localStorage.setItem('token', token);

      console.log('Login successful', token);
      router.push('/profile');
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login failed', error.response.data.message);
      } else {
        console.error('An unexpected error occurred during login', error);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
