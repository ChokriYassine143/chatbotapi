const express=require("express");
const bodyParser = require('body-parser');

const axios=require("axios");
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const apiKey = process.env.API_KEY;
app.get("/chatbot/",async (req,res)=>{
  const prompt = req.body.prompt;

  const requestData = {
    prompt: {
      text:prompt,
    },
  };

  
  apiUrl="https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText"
  axios.post(apiUrl, requestData, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      key: apiKey,
    },
  })
    .then(response => {
      console.log('Response:', response.data);
      res.send(response.data.candidates[0].output);
    })
    .catch(error => {
      console.error('Error:', error.response ? error.response.data : error.message);
    });
})
app.listen(process.env.PORT ||3000,()=>{

  console.log("working in port 3000");
})