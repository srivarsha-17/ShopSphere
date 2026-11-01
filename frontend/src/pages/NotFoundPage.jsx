import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'var(--primary-light)',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
      }}>
        <Compass size={40} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 2rem' }}>
        The page you are trying to visit may have been moved, renamed, or no longer exists.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
