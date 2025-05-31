import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();


if (localStorage.getItem('role') === 'student') {
    navigate('/student-dashboard');
}
navigate('/faculty-dashboard');
