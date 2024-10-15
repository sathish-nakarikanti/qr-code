import React, { useEffect } from 'react';

const clientId = '3MVG9wt4IL4O5wvJIl7cdJQWvXM0hWUcFkpGCrK92BWKX.G3c3l.68cCxmQLk89Q_9szLdpdXxZ3_cNmOyHke'; // From Salesforce Connected App
const redirectUri = 'https://qrcodescanner-63f2a251e001.herokuapp.com/qr-code'; // Your callback URL for localhost


const SalesforceLogin = () => {
    useEffect(()=>{
        const authorizationUrl = `https://login.salesforce.com/services/oauth2/authorize`;
        const responseType = 'token'; // Implicit Grant Flow (get token directly)
        const scope = 'full'; // Define the scope based on the access required
        const authUrl = `${authorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        
        console.log(authUrl,'authUrl');
        
        // Redirect the user to Salesforce's login page
        window.location.href = authUrl;
    },[])
  return (
    <div>
    </div>
  );
};

export default SalesforceLogin;
