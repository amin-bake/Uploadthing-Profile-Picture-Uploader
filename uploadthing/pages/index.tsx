// pages/index.tsx
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };
  const handleRegisterClick = () => {
    router.push('/register');
  };
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    );
  };
  
  export default Home;
  