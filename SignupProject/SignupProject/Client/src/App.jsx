import { useState } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/${isLogin ? 'login' : 'signup'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage('Cannot connect to server. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">

        <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : 'Already a member?'}
          <span onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
          }}>
            {isLogin ? ' Sign Up' : ' Log In'}
          </span>
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>

        </form>

        {message && <p className="message">{message}</p>}

      </div>
    </div>
  );
}

export default App;