import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    const api = axios.create({
        baseURL: 'http://localhost:5001',
      });

    const handleLoginButtonClick = () => {
        setShowLoginForm(true);
        setShowRegistrationForm(false);
      };

  const handleRegistrationButtonClick = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
  };


  //  LOGIN
  const handleLoginFormSubmit = async (event) => {
    console.log(username, password);

    event.preventDefault();

    try {
        const response = await api.post('api/login', { username, password });
        const token = response.data.token;
        
        localStorage.setItem('token', token);
  
        setLoggedIn(true);     
        
        setShowLoginForm(false);
      } catch (error) {
            alert(error.message);
        
      }

  };


  //  REGISTER
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
          setLoggedIn(true);
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

  //  RENDER
  if (loggedIn) {
    console.log("username:" + username)
    return (
      <div className="loginInfo">
        Witaj, {username}!
      </div>
    );
  }

  if (showLoginForm) {
    return (
      <div className="loginAndRegisterForm">
        <h2>Login</h2>
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
        <h2>Register</h2>
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