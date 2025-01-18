To send req to api :

url  => http://127.0.0.1:{port number that your server}/register

send body json  => {
  "first_name": "",
  "last_name": "",
  "email": "",
  "password": ""
}

and send headers :
1 ) key  => x-user-name   value =>  Abdallah
2 ) key  => x-password  value =>  2612025

To download the API on your device

The first step: 
After downloading the file, we use the npm init command To enable npm in your project.

The second step:
Use npm install command Until all libraries used in the project are loaded.

The third step:
Create an .env file So that all your data can be added to it.

In this file you need to create four variables with the following names:

1 ) DATABASE_URI =>  To add contact information to the database
2 ) PORT => To determine the port number that your server is running on
3 ) ACCESS_TOKEN_SECRET => To create the code used to create accessToken
4 ) REFRESH_TOKEN_SECRET => To create the code used to create an access token update
