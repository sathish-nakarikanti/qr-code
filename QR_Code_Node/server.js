const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for development purposes

// Replace with your actual Salesforce credentials

const salesforceAuthUrl = 'https://login.salesforce.com/services/oauth2/token';
const clientId = '3MVG9wt4IL4O5wvJIl7cdJQWvXM0hWUcFkpGCrK92BWKX.G3c3l.68cCxmQLk89Q_9szLdpdXxZ3_cNmOyHke';
const clientSecret = '9BDA8BD23671233E6351654F60219E872FBD62F546BFDA0DB5F5ECDFAD74578A';
const username = 'ptejazd@gmail.com';
const password = 'satya1359'; // password + security token


// Route for OAuth authentication
app.post('/api/authenticate', async (req, res) => {
  try {
    const response = await axios.post('https://login.salesforce.com/services/oauth2/token', null, {
      params: {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username: username,
        password: password,
      },
    });

    const accessToken = response.data.access_token; // Get the access token
    res.json({ accessToken }); // Send the access token to the frontend
  } catch (error) {
    console.error('Error authenticating with Salesforce:', error.message);
    res.status(500).json({ error: 'Failed to authenticate with Salesforce' });
  }
});

// Route for submitting form data to Salesforce
app.post('/api/submit-feedback', async (req, res) => {
  const { feedbackData, accessToken } = req.body;

  try {
    // Example of how you'd use the access token to send data to Salesforce
    const response = await axios.post(
      'https://intelogik-68e-dev-ed.my.salesforce.com/services/apexrest/feedback/', // Replace with your API endpoint
      feedbackData, // Send the feedback data from the frontend
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach the access token
        },
      }
    );

    res.json({ message: 'Feedback submitted successfully!', data: response.data });
  } catch (error) {
    console.error('Error submitting feedback to Salesforce:', error.message);
    res.status(500).json({ error: 'Failed to submit feedback to Salesforce' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
