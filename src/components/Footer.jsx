// Footer.jsx
import React from 'react';

const Footer = () => {
    return (
      <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} <b>Patel Enterprises Ltd.</b> All rights reserved.</p>
      </footer>
    );
};

const footerStyle = {
  backgroundColor: '#54b6f7' ,
  color: '#fff',
  padding: '10px',
  textAlign: 'center',
  height:'50px',
  flexShrink: 0
};

export {Footer};