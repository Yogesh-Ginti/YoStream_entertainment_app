const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./dbConnection')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

const userRouter = require('./routes/usersRoutes');
const bookmarksRouter = require('./routes/bookmarksRoutes')


// Load environment variables 
dotenv.config();

// Connection to MongoDB
connectDB()

//changes made here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())


app.use('/user',userRouter)
app.use('/bookmarks', bookmarksRouter)

app.get('/', (req,res)=>{
  res.status(200).json({
    sucess: true,
    name:"YoStream Api",
    routes:[
      {"/user/signup":"to signup the users"},
      {"/user/login":"to login the users"},
      {"/user/logout":"to logout the users"},
      {"/bookmarks" : "to fetch user all bookmarks"},
      {"/bookmarks/add" : "to add the items on user bookmarks"},
      {"/bookmarks/remove" : "to remove a items from user bookmarks"}
    ]
  })
})



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

