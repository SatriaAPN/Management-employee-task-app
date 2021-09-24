## Pariwisata-daerah-API
Pariwisata-daerah-API is an API that let you fetch data about tourist destinations in a province or city in indonesia

## this project was made by :
- Satria Aluh Perwira Nusa (Backend)

## dotenv variables (the mark '//' are comment, so dont include it in your dotenv)
- NODE_ENV = production/development //pick one, if you are on development stage use development, if you are on production use production, do not empty this variable
- PORT = //put your server PORT here, ex: 3000 / 5000, you can empty this variable
- MONGO_URI_DEV = //put your mongoDB URI for development stage here, you can empty one of these URI, this or the prod bellow based on your NODE_ENV
- MONGO_URI_PROD = //put your mongoDB URI for production stage here

## How to Install the Pariwisata-daerah-API
- clone this repository first
- open the folder folder with your favorite IDE, i am using VSCode
- make sure nodejs already installed in your computer/device
- run 'npm install' on the terminal, make sure the terminal already open the app folder directory
- create an .env file in the app root
- fill the attributes of the .env file with dotenv variables on the top, and make sure you change the value of those variables
- now if you use the vscode and the app's folder already opened, write these command on the terminal
  * npm install
- after all of the command on the top has been done, you can use npm run start-dev to start the app
  * npm run start

## all the libraries or package or dependencies that we use in this project :
- express Js
- postgresql
- sequelize
- sequelize-cli
- ejs
- jsonwebtoken
- joi
- dotenv
- bcrypt
- cookie-parser
- nanoid
- multer
- pg-hstore

