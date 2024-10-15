// QRCodeGenerator.js
import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const QRCodeGenerator = ({ formUrl }) => {
  const navigate = useNavigate();


  useEffect(() => {
    // Extract the token from the URL fragment
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');

    if (token) {
      // Store the token in localStorage or state
      localStorage.setItem('salesforceToken', token);

      // Redirect to the user-rating page
      // navigate('/user-rating');
    } else {
      console.error('Token not found in URL');
    }
  }, [navigate]);

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h2>Scan the QR Code to open the form</h2>
      <QRCodeSVG value="https://qrcodescanner-63f2a251e001.herokuapp.com/user-rating" size={256} />
    </div>
  );
};

export default QRCodeGenerator
