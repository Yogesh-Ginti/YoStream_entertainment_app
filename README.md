# Entertainment App
  The Yo-Stream Entertainment App is a MERN full-stack application that allow  users to a huge collection of movies and TV shows and manage their bookmarks, leveraging the TMDB API for fetching content. It features user authentication, media exploration, and personal bookmarks.

## Features
  - User Authentication: Utilizes JWT for secure login and registration, ensuring user data protection.
  - Media Exploration: Allows users to discover trending movies and TV shows, with detailed views available for each media item.
  - Bookmarks: Enables users to bookmark their favorite media, creating a personalized list of favorites accessible at any time.
  - Detailed Media Information: Provides in-depth details about movies and TV shows, genres, ratings, and more.
  - Responsive Design: Optimized for various devices and screen sizes.

## Usage

### Browsing Movies and TV Shows
- Navigate to the movies or shows page to view popular, latest, and top-rated items.
- You can browse without being signed in.

### Managing Bookmarks
- Sign in to your account to access the bookmarks page.
- Use the bookmarks page to add or remove movies and TV shows from your bookmarks list.

## Technologies Used
  - Frontend: React, React-icon, RTK, Axios
  - Backend: Node.js, Express
  - Database: MongoDB
  - Authentication: JWT tokens, cookies, bcrypt
  - Styling: CSS,Tailwind

## Getting Started

  ### Prerequisites
  - Node.js (v14 or later)
  - npm (v6 or later)
  - MongoDB instance (local or remote)
  - TMDB API key for fetching media data

  ### Backend Setup
  1. Clone the Repository: Start by cloning the Entertainment App repository to your local machine.
    git clone https://github.com/Yogesh-Ginti/YoStream_entertainment_app.git

  2. Navigate to the server Directory: Move into the server directory of the project.
    cd YoStream_entertainment_app

  3. Install Dependencies: Install the necessary dependencies using npm.
    npm install

  4. Configure Environment Variables: Create a .env file based on the provided .env.example file. Provide your MongoDB URI and TMDB API key in the .env file.
    PORT='any port'
    MONGO_URI= "your mongodb url"
    NODE_ENV=devlopment(while on devlopment)
    SECRET_KEY= "your secret token for user authentication"
    

  5. Start the Server: Run the backend server.
    npm start

  6. Verify Backend Setup: Confirm that the backend server is running without any errors.

  ### Frontend Setup
    1. Navigate to the Frontend Directory: Move into the client directory of the project.
      ``` cd ../client ```

    2. Install Dependencies: Install the necessary dependencies using npm.
     ``` npm install```

    3. Configure Environment Variables: Create a .env file in the client directory and specify the URL of the backend server. For example:

      ``` REACT_APP_BACKEND_URL= "your live backend server"
      VITE_APP_TMDB_API_KEY= "your tmdb api key for image" ```

    4. Start the Application: Run the frontend application.
        ```npm run dev```

    5. Access the Application: Open your web browser and navigate to the specified URL (default: http://localhost:3000) to access the Entertainment App.

  By following these steps, you should have both the backend server and frontend application running locally, allowing you to explore the features of the Entertainment App.

## Project Structure
  ### Backend
  - Controllers: Contains logic for handling API requests, such as user signup & signin , getting bookmarks item details.
  - Models: Defines the schema for database collections, including Users and Bookmarks.
  - Routes: API routes for handling requests to different endpoints.
  - Middleware: Includes middleware for authentication.

  ### Frontend
  - Components: Reusable UI components like Header, cards, movies, tv
  - Pages: React components representing pages (Home.jsx, Login.jsx, SignUp.jsx, - Movies and Tv)
  - Redux : multiple slices for paritcular component
  - Utils: storing some constanat and slider setting
  ### Deployment
    - Frontend : https://yo-stream-entertainment-webapp.vercel.app
    - Backend : https://yo-stream-entertainment-webapi.vercel.app

  ### API Documentation
    - You can visit [API Documentation](https://docs.google.com/document/d/1tn4v_gTwqz2mTWUaoeKcxgcmpqfc4A3N0k5QJOilRAk/edit?usp=sharing) here.

  ### Database Design
    ### Database Design
    - You can visit [Database Design](https://docs.google.com/document/d/1N4f4X5XEqxi1XjrllHRGkIR45JexK35reaUiaqWJKIE/edit?usp=sharing) here.


## Contributing
- Fork the repository.
- Create a new branch (`git checkout -b feature-branch`).
- Make your changes.
- Commit your changes (`git commit -m 'Add new feature'`).
- Push to the branch (`git push origin feature-branch`).
- Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact yogeshginti@gmail.com