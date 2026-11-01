import React from 'react';

const Spinner = ({ size = 32, message = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div 
        className="spinner" 
        style={{ width: `${size}px`, height: `${size}px`, margin: '0 0 1rem 0' }} 
      />
      {message && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{message}</p>}
    </div>
  );
};

export default Spinner;
