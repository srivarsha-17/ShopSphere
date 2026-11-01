import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'var(--danger-light)',
        color: 'var(--danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
      }}>
        <ShieldAlert size={40} />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
        Access Restricted
      </h1>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--danger)', marginBottom: '1rem' }}>
        Administrative Privileges Required
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 2rem' }}>
        You do not have permission to access the administrator control panel with your current user role.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <Home size={18} />
        Return to Storefront
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
