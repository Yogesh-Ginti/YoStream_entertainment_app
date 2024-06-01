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


// Middleware
// Enable CORS for development (remove for production)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())


app.use('/user',userRouter)
app.use('/bookmarks', bookmarksRouter)

app.get('/', (req,res)=>{
  res.send(`server is running`)
})



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

