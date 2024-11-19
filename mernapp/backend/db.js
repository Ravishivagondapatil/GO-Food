// const mongoose = require('mongoose');

// // MongoDB URI (replace this with your MongoDB URI)
// const mongoURI = 'mongodb://localhost:27017/gofoodmern';

// // Function to connect to MongoDB and retrieve data
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');

//     // Fetch data from 'food_items' collection
//     const fetchedData = await mongoose.connection.db.collection('food_items').find({}).toArray( async function (err, data) {
//       const foodCategory =await  mongoose.connection.db.collection('foodCategory').find({}).toArray(function(err, catData){

//         if (fetchedData.length > 0) ;
//           else{
//             global.food_items=data;
//             global.foodCategory=catData;
//           }

//       });

//     });

//     // if (fetchedData.length > 0) {
//     // //  console.log('Data from food_items:', fetchedData);
//     //  global.food_items = fetchedData;
//     //  console.log(global.food_items)
//     // } else {
//     //   console.log("No data found in the 'food_items' collection.");
//     // }

//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit with failure
//   }
// };

// // Export the connection function
// module.exports = connectToDatabase;


const mongoose = require('mongoose');

// MongoDB URI (replace this with your MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/gofoodmern';

// Function to connect to MongoDB and retrieve data
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Fetch data from 'food_items' and 'foodCategory' collections
    const foodItems = await mongoose.connection.db.collection('food_items').find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection('foodCategory').find({}).toArray();

    if (foodItems.length > 0 && foodCategory.length > 0) {
      global.food_items = foodItems;
      global.foodCategory = foodCategory;
      console.log('Data loaded into global variables.');
    } else {
      console.log("No data found in one or both collections.");
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

// Export the connection function
module.exports = connectToDatabase;
