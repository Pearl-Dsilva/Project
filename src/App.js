
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import Landing from '../src/landingPage/landing'
import './App.css';
import '.././src/components/home/Header.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firestore/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Booked from './components/bookedEvents/bookedEvents';
import Contact from './components/contact/contact';


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (userToken) => {
      setUser(userToken);
    });
  }, [])

  const navigate = useNavigate();

  useEffect(() => {
    const currentLocation = window.location.href.split('/');

    //   if ((currentLocation[currentLocation.length - 1] === 'login' || currentLocation[currentLocation.length - 1] === 'signup') && user) {
    //     navigate('/', { replace: true })
    //   }
    // }, [user])

    if ((currentLocation[currentLocation.length - 1] === 'login' || currentLocation[currentLocation.length - 1] === 'signup') && user) {
      navigate('/home', { replace: true })
    }
  }, [user])


  return (
    <Routes>
      {/* <Route path="/" element={user ? <Home auth={auth} /> : <Navigate to="/login" replace />} /> */}
      <Route path="/home" element={user ? <Home auth={auth} /> : <Navigate to="/login" replace />} />
      {/* <Route path="/" element={<Home auth={auth} />} /> */}
      <Route path="/login" element={<Login auth={auth} />} />
      <Route path="/signup" element={<Signup auth={auth} />} />
      <Route path="/" element={<Landing auth={auth} />} />
      {/* <Route path="/landing" element={<Landing auth={auth} />} /> */}
      <Route path="/booked" element={<Booked auth={auth} />} />
      <Route path="/contact" element={<Contact auth={auth} />} />

    </Routes>
  )
};

export default App;
