const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Orders');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#";
const axios = require('axios')

// User Registration API
router.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let setPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

// User Login API
router.post("/loginuser",
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Incorrect email or password" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect email or password" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Server error" });
        }
    });

// Get food data
router.post('/foodData', (req, res) => {
    try {
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

// Order Data API
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date }); // Add order date to data

    console.log("Email:", req.body.email);

    try {
        let eId = await Order.findOne({ email: req.body.email });
        console.log("Existing Order:", eId);

        if (eId === null) {
            // If email does not exist, create a new order
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // If email exists, update order data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

// Get My Order Data API
router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email);
        let arrayData = await Order.findOne({ email: req.body.email });
        res.json({ orderData: arrayData });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("Error: " + error.message);
    }
});


router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })

    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})


module.exports = router;
