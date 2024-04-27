import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import excel from "../assets/excel.png";
import img from "../assets/img.png";

const BookingData = () => {
  const [bookingId, setBookingId] = useState("");
  const [bookingData, setBookingData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/bookings/${bookingId}`
      );
      setBookingData(response.data);
      toast.success("Your details added succesfully");
    } catch (error) {
      toast.error("Something went wrong");
      setBookingData(null);
    }
  };

  return (
    <div className="overflow-hidden bg-slate-50">
      <div className="BookingInput w-full h-52 mt-28">
        <h1 className="text-center text-zinc-600 font-bold text-xl py-1">
          Verify Your Booking
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
            <input
              className="px-28 py-2 font-bold text-base text-center text-slate-700 rounded"
              type="text"
              name="Booking_Id"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Enter Booking Id"
            />
          </div>
          <div className="flex items-center justify-center my-7">
            <button
              className="text-zinc-700 font-semibold rounded  px-16 py-2  items-center bg-orange-400 shadow-lg shadow-orange-500/20"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
      <div className="img flex items-center justify-center cursor-pointer mb-6">
        <img src={excel} alt="" />
      </div>

      {bookingData ? (
        <>
          {bookingData && (
            <div className="flex flex-col items-center justify-center">
              <div className="mainCard w-96 h-auto bg-white rounded mx-4 pb-2">
                <h1 className="text-center font-medium border-b-2 mx-28 border-dashed  text-slate-700">
                  Booking Details
                </h1>
                <div className="text-slate-500 px-2 py-1 text-sm">
                  <p className="font-semibold">
                    <span className="px-1">Date of Booking : </span>
                    {new Date(bookingData.Date_of_Booking).toLocaleDateString()}
                  </p>
                  <p className="font-semibold">
                    <span className="px-1">Date of Journey :</span>
                    {new Date(bookingData.Date_of_Journey).toLocaleDateString()}
                  </p>
                  <p className="font-semibold">
                    <span className="px-1">Booking Id :</span>
                    {bookingData.Booking_Id}
                  </p>
                  <p className="font-semibold">
                    <span className="px-1">Journey Location :</span>
                    {bookingData.Journey_Location}
                  </p>
                  <p className="font-semibold">
                    <span className="px-1">Phone Number :</span>
                    {bookingData.Phone_Number}
                  </p>
                  <div className="w-full h-22 text-sm p-2 rounded-lg bg-orange-400 shadow-lg shadow-orange-500/20 text-slate-900 mt-2 mb-2">
                    <div className="flex gap-4">
                      <p className="font-semibold">
                        <span className="text-sm  px-1">Booking Status :</span>
                        {bookingData.Booking_Status}
                      </p>
                      <p className="font-semibold">
                        <span className="text-sm  px-1">Payment Mode: :</span>
                        {bookingData.Payment_Mode}
                      </p>
                    </div>
                    <p className="font-semibold">
                      <span className="text-sm  px-1">Payment Amount: :</span>
                      {bookingData.Payment_Amount}
                    </p>
                  </div>
                </div>
                <p className="px-2 text-sm text-center  text-slate-600 ">
                  {" "}
                  IR recovers only 57% of cost of travel on an average
                </p>
              </div>
              <div className="bg-white w-96 h-auto my-2 rounded-lg mx-2 pb-3 ">
                {bookingData.passengers.map((passenger, index) => (
                  <div key={index}>
                    <h1 className="text-center font-medium border-b-2 border-dashed text-slate-500">
                      Passenger Details - <span>{index + 1}</span>
                    </h1>
                    <div className="text-slate-600 px-2 py-1">
                      <div className="text-slate-500 flex items-center gap-6 justify-between">
                        <p className="font-semibold text-sm">
                          <span className="px-1">Name : </span>
                          {passenger.name}
                        </p>
                        <p className="font-semibold text-sm">
                          <span className="px-1">Age :</span>
                          {passenger.age}
                        </p>
                      </div>
                      <div className=" text-slate-500 flex items-center  gap-6 justify-between">
                        <p className="font-semibold text-sm">
                          <span className="px-1">Gender :</span>
                          {passenger.gender}
                        </p>
                        <p className="font-semibold text-sm">
                          <span className="px-1">Aadhar No. :</span>
                          {passenger.aadharNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center justify-center space-x-2"
        >
          <svg
            className="h-8 w-8 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="24"
            ></line>
          </svg>
          <span className="text-2xl font-medium text-gray-500">Loading...</span>
        </div>
      )}
      <div className="img flex items-center justify-center cursor-pointer mx-8 mb-6">
        <img src={img} alt="" />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default BookingData;
