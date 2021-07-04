# Test technique Les Bons Artisans
## How to run project

### Clone this repository with :
`https://github.com/MaximeLeBerre/les-bons-artisans-back.git`
### Open a new terminal in your code editor, make sure you are in the project folder and run :
`npm install` then
`nodemon`

#### If you have an error for nodemon, you can install it with
`npm install nodemon`

### Now, you run the app in the development mode.
Open [http://localhost:5000](http://localhost:5000) in postman.

### Attention 
You need to create an user to see content because routes are protected by auth

### Routes 

Create user : `http://localhost:5000/api/auth/signup` (email and password required)

Login : `http://localhost:5000/api/auth/login` return a token, keep it for do other request !

Get All Objects : `http://localhost:5000/api/object/` you need to specify token in headers

Get One Object : `http://localhost:5000/api/object/:id` you need to specify token in headers

Post One Object : `http://localhost:5000/api/object/` you need to specify token in headers

Update One Object : `http://localhost:5000/api/object/:id` you need to specify token in headers

Delete One Object : `http://localhost:5000/api/object/:id` you need to specify token in headers
