const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.all('*', (req, res) => {
    const ip = req.ip;

    // Match the content of the brackets in the user agent.
    // We take the one at index 1 because that one doesn't include the brackets itself.
    const operatingSystem = req.get('User-Agent').match(/\((.+?)\)/)[1];

    // Match the first language string (first before the comma).
    const language = req.get('Accept-Language').match(/(.+?),/)[1];
    
    res.json({
      ipaddress: ip,
      language,
      software: operatingSystem,
    });
});

app.listen(app.get('port'), () => {
  console.log('Header Microservice running on port', app.get('port'));
});
