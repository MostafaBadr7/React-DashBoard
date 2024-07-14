import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const [twist, setTwist] = useState('Open DashBoard');
  const navigate = useNavigate();

  const displayDash = () => {
    if (twist.includes('Open')) {
      setTwist('Close DashBoard');
    } else {
      setTwist('Open DashBoard');
    }
    
    if (!window.location.href.includes('Home')) {
      navigate('/Home');
    } else {
      navigate('/');
    }
  };

  return (
    <div className='mt-4'>
      <h3>Welcome to our</h3>
      <h1 className='mb-4'>Banking System</h1>
      <button onClick={displayDash} className='btn btn-primary'>{twist}</button>
      <Outlet />
    </div>
  );
}
