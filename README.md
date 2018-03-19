## Getting started

* Clone the repository ```git clone https://github.com/harut-g/messages.git```
* Install packages
  ```npm install```
* Run the server ``` npm run dev ```
* Run the integration tests ``` npm test ```

## Endpoints:
* **/api/v1/message** - (GET) get all messages
* **/api/v1/message/:id** - (GET) get body of message
* **/api/v1/message** - (POST) save a new message (body and header fields are required)
* **/api/v1/message/:id** - (PUT) update a message
* **/api/v1/message/:id** - (DELETE) delete a message

## Heroku
**https://floating-cove-92912.herokuapp.com/api/v1/message/**
