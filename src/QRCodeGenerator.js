// QRCodeGenerator.js
import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const QRCodeGenerator = ({ formUrl }) => {
  const navigate = useNavigate();


  // useEffect(() => {
  //   const hash = window.location.hash;
  //   const token = new URLSearchParams(hash.substring(1)).get('access_token');
  //   if (token) {
  //     localStorage.setItem('salesforceToken', token);
  //   } else {
  //     console.error('Token not found in URL');
  //   }
  // }, [navigate]);

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h2>Scan the QR code to give your rating.</h2>
      <QRCodeSVG value="https://qrcodescanner-63f2a251e001.herokuapp.com/user-rating" size={256} />
    </div>
  );
};

export default QRCodeGenerator
