// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeGenerator from './QRCodeGenerator';
import Form from './components/userRating'; // Ensure that this matches your actual filename
import './App.css'; // Import the CSS for styling
import SalesforceLogin from './auth';

const App = () => {
  // Replace with the actual URL of your form
  const formUrl = 'https://qrcodescanner-63f2a251e001.herokuapp.com/user-rating'; 

  return (
    <Router>
      <div>
        {/* <h1>QR Code Example</h1> */}
        {/* <QRCodeGenerator formUrl={formUrl} /> */}
        <Routes>
          {/* <Route path="/" element={<SalesforceLogin />} /> */}
          <Route path="/" element={<QRCodeGenerator formUrl={formUrl} />} />
          <Route path="/user-rating" element={<Form />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
