const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const apiKey = process.env.API_KEY;

app.get("/chatbot/", async (req, res) => {
  const prompt = req.query.prompt; // Change to req.query.prompt
  if (prompt.includes("messin")){
  res.send("ronaldo is the GOAT");
    
  }
  {
     if (!prompt) {
    return res.status(400).send("Missing 'prompt' parameter.");
  }

  const requestData = {
    prompt: {
      text: prompt,
    },
  };

  const apiUrl = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText";

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        key: apiKey,
      },
    });

    console.log('Response:', response.data);
    res.send(response.data.candidates[0].output);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
  }
 
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
