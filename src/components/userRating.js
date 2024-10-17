import React, { useState } from 'react';
import './StarRating.css'; // Import the CSS for styling
import axios from 'axios';

const items = [
  'Ambiance',
  'Dining Experience',
  'Live Music',
  // 'Service Quality',
  // 'Signature Cocktails',
  'Outdoor Seating',
  'Wellness Offerings',
  'Event Spaces',
  // 'Cultural Events',
  // 'Room Service',
];

const firstScreen = [
  { name: "How would you rate the ambiance of the hotel on a scale from 1 (A) to 5 (E)?", item: "Ambiance" },
  { name: "How satisfied were you with your dining experience at the hotel, from 1 (A) to 5 (E)?", item: "Dining Experience" },
  { name: "How would you evaluate the live music performance during your stay, on a scale from 1 (A) to 5 (E)?", item: "Live Music" },
];

const secondScreen = [
  { name: "Outdoor Seating: How would you evaluate the comfort and ambiance of the outdoor seating areas, on a scale from 1 (A) to 5 (E)?", item: 'Outdoor Seating' },
  { name: "Wellness Offerings: How satisfied were you with the wellness offerings provided by the hotel, from 1 (A) to 5 (E)?", item: 'Wellness Offerings' },
  { name: "How would you rate the suitability and ambiance of the event spaces available at the hotel, from 1 (A) to 5 (E)?", item: 'Event Spaces' },
];

const StarRating = () => {
  const [ratings, setRatings] = useState(
    items.map(item => ({ [item]: 0 })) // Initialize each item with a rating of 0
  );
  const [showScreen, setShowScreen] = useState(1);
  const [showButton, setShowButton] = useState(true);

  const handleRatingChange = (index, rating) => {
    const newRatings = [...ratings];
    newRatings[index] = { [items[index]]: rating };
    setRatings(newRatings);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setShowScreen(2);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setShowScreen(1);
  };
  console.log(ratings,'ratings');
  


  function generateRandom10DigitNumber() {
    // Generate a random number between 1000000000 and 9999999999
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber;
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowButton(false)
    // Step 1: Authenticate to Salesforce to get access token
    const salesforceAuthUrl = 'https://login.salesforce.com/services/oauth2/token';
    const clientId = '3MVG9wt4IL4O5wvJIl7cdJQWvXM0hWUcFkpGCrK92BWKX.G3c3l.68cCxmQLk89Q_9szLdpdXxZ3_cNmOyHke';
    const clientSecret = '9BDA8BD23671233E6351654F60219E872FBD62F546BFDA0DB5F5ECDFAD74578A';
    const username = 'ptejazd@gmail.com';
    const password = 'satya1359FFUsS9A3JvpgVmX834A9gNHzO'; // password + security token

    try {
      // Fetch access token
      const response = await axios.post("https://qrcodescannernode-8459795be34c.herokuapp.com/api/authenticate");

      // const accessToken = response.data.access_token;
      // const instanceUrl = response.data.instance_url;

      console.log('Access Token:', response);
      // Convert array of objects to a single object with string values and calculate total
      let total = 0; // Initialize total count
      const singleObject = ratings.reduce((acc, curr) => {
        const key = Object.keys(curr)[0]; // Get the key from the current object
        const value = curr[key]; // Get the value from the current object
        total += value; // Add the value to the total
        acc[key] = String(value); // Set the key in the accumulator to the string value
        return acc; // Return the accumulated object
    }, {});
    
    console.log(singleObject); // The object with string values
    console.log('Total:', total); // The total of all values
    singleObject.avgRating = (total / ratings.length).toFixed(1);

      // Step 2: Submit the form data to Salesforce using the access token
      const salesforceApiUrl = 'https://intelogik-68e-dev-ed.my.salesforce.com/services/apexrest/feedback/';
      const result = await axios.post(salesforceApiUrl, {
        "ratingElements": singleObject,
        "userId":  generateRandom10DigitNumber()
    },
    {
      headers: {
        Authorization: `Bearer ${response.data.accessToken}`, // Use the access token
        'Content-Type': 'application/json',
      }});
      console.log('Form data submitted:', result.data);
      alert('Form data successfully submitted to Salesforce!');
      setRatings( items.map(item => ({ [item]: 0 })))
      setShowButton(true)
      setShowScreen(1)
    } catch (error) {
      console.error('Error submitting data to Salesforce:', error);
      alert('Failed to submit data to Salesforce. Please check the console for errors.');
      setShowButton(true)
      setShowScreen(1)
    }
  };

  console.log(ratings,'ratings')
  return (
    <form className="rating-form">
      <h1 style={{textAlign:'center', marginBottom:"30px"}}>Please Rate Your Experience</h1>
      <div>
        {showScreen === 1 && firstScreen.map((obj, index) => {
          const currentRating = Object.values(ratings[index])[0]; // Get current rating for the item
          return (
            <div key={index}>
              <h3>{index + 1}. {obj.name}</h3>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((value, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      value={value}
                      checked={currentRating === value}
                      onChange={() => handleRatingChange(index, value)}
                    />
                    ({String.fromCharCode(65 + value - 1)}) {value}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        {showScreen === 1 && <button type="submit" onClick={handleNext} className="next-button">Next</button>}
      </div>

      <div>
        {showScreen === 2 && secondScreen.map((obj, index) => {
          const currentRating = Object.values(ratings[index + firstScreen.length])[0]; // Adjust index for second screen
          return (
            <div key={index}>
              <h3>{index + 4}. {obj.name}</h3>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((value, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      value={value}
                      checked={currentRating === value}
                      onChange={() => handleRatingChange(index + firstScreen.length, value)} // Adjust index for second screen
                    />
                    ({String.fromCharCode(65 + value - 1)}) {value}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        {showScreen === 2 && (
          <div className="button-container">
            <button type="button" onClick={handlePrevious} className="previous-button">Previous</button>
            {showButton && <button type="submit" onClick={handleSubmit} className="submit-button">Submit</button>}
          </div>
        )}
      </div>
    </form>
  );
};

export default StarRating;
