// pages/login.tsx
import Signin from '../components/auth/signin';
import Signup from '../components/auth/signup';
import { useState } from 'react';

export default function AuthPage() {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <button
          onClick={() => setIsSignin(true)}
          style={{
            marginRight: 8,
            padding: '8px 16px',
            background: isSignin ? '#333' : '#eee',
            color: isSignin ? '#fff' : '#333',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsSignin(false)}
          style={{
            padding: '8px 16px',
            background: !isSignin ? '#333' : '#eee',
            color: !isSignin ? '#fff' : '#333',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </div>
      {isSignin ? <Signin /> : <Signup />}
    </div>
  );
}
