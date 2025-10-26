import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/registration logic here
    if (onLogin) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img 
          src="/logo.png" 
          alt="AI-Powered Mortgage CRM" 
          className="login-logo"
        />
        <h1>{isRegistering ? 'Create Account' : 'Sign In'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn-primary">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="toggle-auth">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type="button" 
            onClick={() => setIsRegistering(!isRegistering)}
            className="btn-link"
          >
            {isRegistering ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
