import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel/AdminPanel';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import closeIconImage from '../icons/close.png';
import "../App.css";


const LoginForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('username') ? true : false);

  const api = axios.create({
    baseURL: 'http://localhost:5001',
  });

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('username') ? true : false);
  }, []);

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
  };

  const handleRegistrationButtonClick = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('api/login', { username, password });
      const token = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);


      setIsLoggedIn(true);

      setShowLoginForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        alert("User registered successfully");
        setShowLoginForm(false);
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error("error");
      alert("Error occurred");
    }
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseForm = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(false);
  };

  const logOutHandle = () => {

    Swal.fire({
      title: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User logged out");
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        Swal.fire(
          'Logged out!'
        )
      }
    })

  }

  if (isLoggedIn) {
    return (
      <div>
        {localStorage.getItem('username') === "admin" ? (
          <div>
            <div className="loginInfo" onClick={logOutHandle}>
              Hello, {localStorage.getItem('username')}!
            </div>

            <div className="adminFormTrigger">
              <button onClick={() => { setShowAdminPanel(!showAdminPanel) }}>Show admin panel</button>
            </div>
            {showAdminPanel && <AdminPanel />}
          </div>
        ) : (
          <div className="loginInfo" onClick={logOutHandle}>
            Hello, {localStorage.getItem('username')}!
          </div>
        )}
      </div>
    );
  }

  if (showLoginForm) {
    return (
      <div className="loginAndRegisterForm">
        <div className='headerDiv'>
          <h2>Login</h2>
          <div onClick={handleCloseForm}>
            <img src={closeIconImage} alt="Close" className="closeButton" />
          </div>
        </div>
        <form onSubmit={handleLoginFormSubmit}>
          <input type="text" value={username} onChange={handleNameChange} />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Zaloguj</button>
          <button type="button" onClick={handleRegistrationButtonClick}>
            Zarejestruj się
          </button>
        </form>
      </div>
    );
  }

  if (showRegistrationForm) {
    return (
      <div className="loginAndRegisterForm">
        <div className='headerDiv'>
          <h2>Register</h2>
          <div onClick={handleCloseForm}>
            <img src={closeIconImage} alt="Close" className="closeButton" />
          </div>
        </div>
        <form onSubmit={handleRegisterFormSubmit} className="registration-form">
          <input type="text" value={username} onChange={handleNameChange} />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Zarejestruj</button>
          <button type="button" onClick={handleLoginButtonClick}>
            Wróć do logowania
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="loginFormTrigger">
      <button onClick={handleLoginButtonClick}>Zaloguj</button>
    </div>
  );
};

export default LoginForm;
