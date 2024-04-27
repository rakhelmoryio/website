import React, { useState } from 'react';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./BookingForm.css"
// PassengerDetails component
const PassengerDetails = ({ passenger, onChange, onRemove }) => {
  return (
    <div className="w-full h-auto flex flex-col items-start gap-2 p-4 text-black">
      <label className='font-bold ' htmlFor="name">Name:</label>
      <input
        className="px-2 py-2 rounded-sm"
        type="text"
        id="name"
        placeholder="Name"
        value={passenger.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <label className='font-bold ' htmlFor="age">Age:</label>
      <input
      className="px-2 py-2 rounded-sm"
        type="text"
        id="age"
        placeholder="Age"
        value={passenger.age}
        onChange={(e) => onChange('age', e.target.value)}
      />
      <label className='font-bold ' htmlFor="gender">Gender:</label>
      <input
      className="px-2 py-2 rounded-sm"
        type="text"
        id="gender"
        placeholder="Gender"
        value={passenger.gender}
        onChange={(e) => onChange('gender', e.target.value)}
      />
      <label className='font-bold ' htmlFor="aadharNumber">Aadhar Numbe:</label>
      <input
      className="px-2 py-2 rounded-sm"
        type="text"
        id="aadharNumber"
        placeholder="Aadhar Number"
        value={passenger.aadharNumber}
        onChange={(e) => onChange('aadharNumber', e.target.value)}
      />
      <button className="btn px-12 font-semibold py-2 rounded-lg mt-6 bg-red-600"onClick={onRemove}>Remove</button>
    </div>
  );
};

// Parent component
const BookingForm = () => {
  const [formData, setFormData] = useState({
    Date_of_Booking: "",
    Date_of_Journey: "",
    Journey_Location: "",
    Booking_Id: "",
    Booking_Status: "", 
    Payment_Amount: "",
    Payment_Mode: "",
    email: "",
    Phone_Number: "",
  });

  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '', aadharNumber: '' }]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: '', aadharNumber: '' }]);
  };

  const handleChanges = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataToSave = { ...formData, passengers };
      const response = await axios.post("http://localhost:3000/bookings", dataToSave);
      toast.success("Your details added succesfully",response);
      
      setFormData({
        Date_of_Booking: "",
        Date_of_Journey: "",
        Journey_Location: "",
        Booking_Id: "",
        Booking_Status: "", 
        Payment_Amount: "",
        Payment_Mode: "",
        email: "",
        Phone_Number: "",
      });
      setPassengers([{ name: '', age: '', gender: '', aadharNumber: '' }]);
     
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
    }
    event.target.reset();
  };

  return (
    <>
      <div className="mainBox w-full py-24 flex flex-col items-center justify-center bg-black">
 
        <div className="MainBox1 w-[64vw] h-fit gap-3 flex flex-col bg-zinc-500 rounded-2xl text-center">
        <div className="flex flex-col items-center">
        <h1 className='text-center font-bold text-2xl py-2'>Add Passenger Details</h1>
        {passengers.map((passenger, index) => (
          <PassengerDetails
            key={index}
            passenger={passenger}
            onChange={(field, value) => handleChanges(index, field, value)}
            onRemove={() => handleRemovePassenger(index)}
          />
        ))}
        <button className="btn px-12 py-2 rounded-lg mt-6 font-semibold bg-blue-400 mb-5" onClick={handleAddPassenger}>Add Passenger</button>
      </div>
          <form
            className="MainBox2 gap-3 flex flex-col"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center font-bold text-3xl py-6">
              Booking data
            </h1>
            <div className="form-main-box flex gap-5  justify-evenly">
              <div className="gap-6 flex flex-col items-start">
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="name">
                    Date of Booking:
                  </label>
                  <input
                    className="bg-white p-1 text-black rounded-sm"
                    id="name"
                    type="date"
                    name="Date_of_Booking"
                    placeholder="Enter your Booking Id..."
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="name">
                    Date of Journey:
                  </label>
                  <input
                    className="bg-white p-1 text-black rounded-sm"
                    id="name"
                    type="date"
                    name="Date_of_Journey"
                    placeholder="Enter your Booking Id..."
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="name">
                    Journey Location:
                  </label>
                  <input
                    className="bg-white p-1 text-black rounded-sm"
                    id="name"
                    type="String"
                    name="Journey_Location"
                    placeholder="Enter your Location"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="name">
                    Booking Id:
                  </label>
                  <input
                    className="bg-white p-1 text-black rounded-sm"
                    id="name"
                    type="Number"
                    name="Booking_Id"
                    placeholder="Enter your Booking Id..."
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="Bookingname">
                    Booking Status:
                  </label>
                  <select
                    onChange={handleChange}
                    className="p-2 rounded-sm sele"
                    name="Booking_Status"
                    id="Bookingname"
                  >
                    <option value="N/A">N/A</option>
                    <option value="pending">Pending</option>
                    <option value="Comfirmed">Comfirmed</option>
                  </select>
                </div>
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="name">
                    Payment Amount:
                  </label>
                  <input
                    className="bg-white p-1 text-black rounded-sm"
                    id="amount"
                    name="Payment_Amount"
                    placeholder="Enter your Amount"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="name">
                    Payment Mode:
                  </label>
                  <select
                    onChange={handleChange}
                    className="p-2 rounded-sm sele"
                    name="Payment_Mode"
                    id=""
                  >
                    <option value="N/A">N/A</option>
                    <option value="upi">UPI</option>
                    <option value="card">CARD</option>
                  </select>
                </div>
              </div>
              <div className="gap-6 flex flex-col items-start">
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg">Email:</label>
                  <input
                    className="bg-white p-1 text-black rounded-sm"
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between px-8 font-bold respon ">
                  <label className="text-lg" htmlFor="Phone_Number">
                    Mobile No.
                  </label>
                  <input
                    className="bg-white p-1 text-black rounded-sm"
                    id="Phone_Number"
                    type="Number"
                    name="Phone_Number"
                    placeholder="Enter your  Mobile No..."
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="btn px-12 py-2 rounded-lg mt-6 font-semibold bg-blue-400 mb-5">
                Submit
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default BookingForm;

