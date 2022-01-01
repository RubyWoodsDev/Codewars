//DESCRIPTION:
//Express: Echo Server
//In this Express exercise, your task is to create an app that responds to GET and POST requests on the / route. The responses will echo a message string from the request.

//GET /
//This route will read the message parameter and send a JSON response containing the echoed message value. The response should have a 200 status.

//An example query string is ?message=hello which would be echoed as {"message": "hello"}. An empty string, ?message=, is valid and should be echoed normally.

//Respond with a 422 status and the JSON {"error": "'message' was not provided"} when no query parameter message exists.

//Respond with a 422 status and the JSON {"error": "'message' was not a string"} when the message was provided, but of a type other than a string.

//POST /
//This route will parse the request body as JSON and echo a response containing the value from the "message" key of the request. The JSON response is in the same format as the GET above: {"message": "some message"}. Set a 200 status on the response to indicate that the request was OK. An empty string ("message": "") is valid and should be echoed.

//Respond with a 422 status when no "message" key exists, or if the message type is other than a string. The JSON errors for these cases are identical to those used in GET.

//For either method, a request is still valid if additional parameters or keys are present in the query or JSON body. You can ignore them and echo message as normal.

//Notes
//Please use the variable name app to implement your server. Don't use app.listen() to start the Express server; the test suite will invoke the route handlers directly on the app object.

//Your solution file is automatically included with the test suite, so no export is necessary.

//Test input strings consist of alphanumeric characters and spaces.

//If you're not familiar with the Express concepts needed to complete this kata, feel free to reference the documentation and other resources as you build your solution.




solution
const app        = require("express")()
const bodyParser = require('body-parser')

const handleMessage = prop => (req, res) =>{
  const obj = req[prop]
  
  if(!obj || !obj.hasOwnProperty('message')){
    res.status(422).send({error: "'message' was not provided"})
  
  }else if(typeof(obj.message)!="string"){
    res.status(422).send({error: "'message' was not a string"})
    
  }else{
    res.status(200).send({message: obj.message})
  }   
}

app.use(bodyParser.json())

app.get( '/', handleMessage('query') )
app.post('/', handleMessage('body') )