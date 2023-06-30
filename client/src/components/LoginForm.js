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

  const handleLoginFormSubmit = async (event) => {

    event.preventDefault();

    try {
        const response = await axios.post('api/login', { username, password });
        const token = response.data.token;
        
        localStorage.setItem('token', token);
  
        // ...
        setLoggedIn(true);
        
        
        setShowLoginForm(false);
      } catch (error) {
            console.error(error);
            alert(error.message);
        
      }
    

  };

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();

    // try {
    //     const response = await api.post('api/register', { username, password });
    //     const token = response.data.token;
        
       
    //     localStorage.setItem('token', token);
  
        
    //     // ...
    //     setLoggedIn(true);
        
        
    //     setShowLoginForm(false);
    //   } catch (error) {
    //         console.error(error);
    //         alert(error.message);
        
    //   }

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

  if (loggedIn) {
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
                <input type="text" onChange={(event)=>setUsername(event.target.value)}></input>
                <input type="password" onChange={(event)=>setPassword(event.target.value)}></input>
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
            <input type="text" onChange={(text)=>setUsername(text)}></input>
            <input type="password" onChange={(text)=>setPassword(text)}></input>
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