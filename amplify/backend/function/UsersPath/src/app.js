/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_WEBAPPDYNAMODB_ARN
	STORAGE_WEBAPPDYNAMODB_NAME
	STORAGE_WEBAPPDYNAMODB_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

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

app.get('/users/:userId', function(req, res) {
  // Add your code here
  res.json(
    {
        id: "bpereboom",
        profile: {
            id: 5,
            name: "Brian",
            birthdate: "1991-03-12",
            address: "12345 Avenue Street"
        },
        interests: [
            {
                taskName: "music",
                subTasks: [
                    {
                        taskName: "composition",
                        subTasks: []
                    },
                    {
                        taskName: "piano",
                        subTasks: []
                    }
                ]
            },
            {
                taskName: "stocks",
                subTasks: []
            },
            {
                taskName: "programming",
                subTasks: []
            },
            {
                taskName: "camping",
                subTasks: []
            }
        ],
        hosted: [
            0,
            1,
            2,
            3
        ],
        rsvp: [
            5
        ]
    }
  );
});

app.put('/users/:userId', function(req, res) {
    const params = {
      TableName : 'Users',
      Item: 
      {
          profile: {
              id: parseInt(req.params.userId),
              name: "Brian",
              birthdate: "1991-03-12",
              address: "12345 Avenue Street"
          },
          interests: [
              {
                  taskName: "music",
                  subTasks: [
                      {
                          taskName: "composition",
                          subTasks: []
                      },
                      {
                          taskName: "piano",
                          subTasks: []
                      }
                  ]
              },
              {
                  taskName: "stocks",
                  subTasks: []
              },
              {
                  taskName: "programming",
                  subTasks: []
              },
              {
                  taskName: "camping",
                  subTasks: []
              }
          ],
          hosted: [
              0,
              1,
              2,
              3
          ],
          rsvp: [
              5
          ]
      }
    };
    
    const putPort = async (event) => {
      try {
        await docClient.put(params).promise();
        return { body: 'Successfully created item!' };
      } catch (err) {
        return { error: err };
      }
    };
    putPort();
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
