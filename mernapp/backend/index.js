// const express = require('express');
// const connectToDatabase = require('./db');

// const app = express();
// const port = 5000;

// // Connect to MongoDB
// connectToDatabase();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// // Route to fetch data from MongoDB
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find(); // Retrieve all users
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).send('Error fetching users');
//   }
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const connectToDatabase = require('./db');

const app = express(); // Declare `app` before using it
const port = 5000;

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connect to MongoDB and fetch data
connectToDatabase();

app.get('/', (req, res) => {
  res.send('Hello World!----');
});

app.use(express.json());
// app.use('/api', require("./Routes/CreateUser"));
// app.use('/api', require("./Routes/DisplayData"));
// app.use('/api', require("./Routes/OrderData"));
app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
