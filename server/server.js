const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const Booking = require('./model/bookingSchema');

mongoose.connect('mongodb+srv://adityac22f:Xvwx8sDJwzxbDDcT@bookingdata.5gqfpcr.mongodb.net/?retryWrites=true&w=majority&appName=bookingdata');

app.use(bodyParser.json());
app.use(cors());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB database"));

// app.post("/bookings", async (req, res) => {
//   const {  Date_of_Booking,
//   Date_of_Journey,
//   Journey_Location,
//   Booking_Id,
//   Booking_Status, // Set default value
//   Payment_Amount,
//   Payment_Mode,
//   Aadhar_Number,
//   Age,
//   name,
//   Gender,
//   email,
//   Phone_Number} = req.body;
//   try {
//     const newBooking = new Booking({
//       Date_of_Booking,
//       Date_of_Journey,
//       Journey_Location,
//       Booking_Id,
//       Booking_Status, // Set default value
//       Payment_Amount,
//       Payment_Mode,
//       Aadhar_Number,
//       Age,
//       name,
//       Gender,
//       email,
//       Phone_Number
//     });
//    const savedUser = await newBooking.save();
//    res.json({ message: "Data saved successfully!", data:savedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error saving  data!');
//   }
// });


app.post('/bookings', async (req, res) => {
  try {
    const newPassenger = new Booking(req.body);
    const savedPassenger = await newPassenger.save();
    res.status(201).json(savedPassenger);
  } catch (error) {
    console.error('Error saving passenger:', error);
    res.status(500).json({ error: 'Server error' });
  }
});






app.get('/bookings/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findOne({ Booking_Id: id });
    if (!booking) {
      return res.status(404).send();
    }
    res.send(booking);
  } catch (error) {
    console.log(error);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000'));



