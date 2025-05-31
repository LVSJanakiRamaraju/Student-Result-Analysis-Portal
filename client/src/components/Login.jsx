import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'student') {
      navigate('/student-dashboard');
    } else {
      navigate('/faculty-dashboard');
    }
  }, [navigate]);

  return null;
};

export default Login;
