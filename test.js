// import AWS from 'aws-sdk';

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// export const test = async (event , _context) => {
//    console.log("Ok")
//    console.log({event})
//   const data = JSON.parse(event.body);
//   const params = {
//     TableName: 'SensorDataTable',
//     Item: {
//       sensorid: data.id,
//       data: data.data
//     }
//   };
    
//   await dynamoDb.put(params).promise();

//   return {
//     statusCode: 200,
//     body: JSON.stringify(params.Item)
//   };
// };

import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const testCreate = async (event, _context) =>{
  console.log("Ok")
  console.log({event})

  if (!event.body) {
    return {
        statusCode: 400,
        body: JSON.stringify({ "error": "body is invalid" })
      };
    }

  const data = JSON.parse(event.body);
  const params = {
    TableName: 'SensorDataTable',
    Item: {
      sensorid: data.id,
      data: data.data
    }
  };
    
  await dynamoDb.put(params).promise();
    
  return {
    statusCode: 200,
    body: JSON.stringify(params.Item)
  };
};

export const get = async (event, _context) => {
  const params = {
    TableName: 'SensorDataTable',
    Key: {
      id: event.pathParameters.id
    }
  };
    
  const result = await dynamoDb.get(params).promise();
    
  if (result.Item) {
    return {
      statusCode: 200,
      body: result.Item
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Item not found' })
    };
  }
};