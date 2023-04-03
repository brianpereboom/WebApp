/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/events/user/:userId', function(req, res) {
  // Add your code here
  res.json(
    [
      {
        "host": 1,
        "details": {
            "id": 0,
            "begin": "2023-03-25T06:30",
            "end": "2023-03-25T09:30",
            "location": "456 def",
            "minAge": 20,
            "maxAge": 50,
            "topics": [
                "swimming"
            ]
        },
        "rsvps": [
            6
        ]
      },
      {
        "host": 0,
        "details": {
            "id": 1,
            "begin": "2023-03-28T15:30",
            "end": "2023-03-25T16:30",
            "location": "123 abc",
            "minAge": 30,
            "maxAge": 40,
            "topics": [
                "camping",
                "swimming",
                "scuba diving"
            ]
        },
        "rsvps": [
            1,
            0
        ]
      }
    ]
  );
});

app.get('/events/recommended/:interest', function(req, res) {
  // Add your code here
  res.json(
    [
      {
        "host": 5,
        "details": {
            "id": 3,
            "begin": "2023-05-25T06:30",
            "end": "2023-05-27T09:30",
            "location": "Irvine Park",
            "minAge": 20,
            "maxAge": 50,
            "topics": [
                "camping"
            ]
        },
        "rsvps": [
            5
        ]
      },
      {
        "host": 5,
        "details": {
            "id": 4,
            "begin": "2023-05-25T06:30",
            "end": "2023-05-27T09:30",
            "location": "Irvine Park",
            "minAge": 20,
            "maxAge": 50,
            "topics": [
                "music",
                "composition"
            ]
        },
        "rsvps": [
            0
        ]
      }
    ]
  );
});

app.put('/events/:eventId', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.delete('/events/:eventId', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.put('/events/rsvp/:eventId/:userId', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.delete('/events/rsvp/:eventId/:userId', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
