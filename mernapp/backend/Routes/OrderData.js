
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Orders');




// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data;
//     data.splice(0, 0, { Order_date: req.body.order_date });  // Add order date to data

//     console.log("Email:", req.body.email);

//     try {
//         // Check if email already exists in the database
//         let eId = await Order.findOne({ email: req.body.email });
//         console.log("Existing Order:", eId);

//         if (eId === null) {
//             // If email does not exist, create a new order
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             });
//             res.json({ success: true });
//         } else {
//             // If email exists, update order data
//             await Order.findOneAndUpdate(
//                 { email: req.body.email },
//                 { $push: { order_data: data } }
//             );
//             res.json({ success: true });
//         }
//     } catch (error) {
//         console.log("Error:", error.message);
//         res.status(500).send("Server Error: " + error.message); // Use res.status().send()
//     }
// });





// router.post('/myOrderData', async (req, res) => {
//     try {
//         console.log(req.body.email);
//         let arrayData = await Order.findOne({ email: req.body.email });
//         // Assuming `myData` is defined somewhere and holds the data you want to send
//         res.json({ orderData: arrayData });
//     } catch (error) {
//         console.log("Error:", error.message);
//         res.status(500).send("Error: " + error.message); // Corrected error handling
//     }
// });




// module.exports = router;
