const express = require("express");
const bodyParser = require("body-parser");

const accountSid ='AC5ef52c0c17ba21ff1da2626bb625c6cd';
const authToken ='2837b3ac8891e02c54c86b8fb94bfdc9';
const fromPhone ='+19565397691';
const toPhone ='+91 9526122367';

const app = express();
const PORT = 3100;
const clientInformation = require('twilio')(accountSid, authToken)

// this application will recieve JSON data
app.use(bodyParser.json());

// start the server on pot 3100
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// process a GET request to http://localhost:3100/hello
app.get("/hello", (request, response) => {
    console.log(request.body);

    response.send("hi this is the response");
})

app.post("/webhook", (request, response) => {
    console.log(request.body);

    const activity = request.body.activity;
    const message = ` ${activity[0].fromAddress} paid you ${activity[0].value} ETH. https://goerli.etherscan.io/tx/${activity[0].hash}` ;

    clientInformation.messages
    .create({
        body: message,
        from: fromPhone,
        to: toPhone
    })
    .then(message => console.log(message.sid))

    response.send(message);
})