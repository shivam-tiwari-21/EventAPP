import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    available_seats: "",
  });
  const [date, setDate] = useState(new Date());

  // Ensure only admin users can access this page
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("You must be logged in as admin to access this page");
      navigate("/");
    } else {
      const user = JSON.parse(storedUser);
      if (user.role !== "admin") {
        toast.error("Access denied. Admins only");
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the selected date to YYYY-MM-DD format
    const eventData = {
      ...formData,
      date: date.toISOString().slice(0, 10),
      available_seats: parseInt(formData.available_seats, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost/Backend/api/events.php",
        eventData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.message === "Event created successfully") {
        toast.success("Event created successfully");
        navigate("/");
      } else {
        toast.error(response.data.message || "Event creation failed");
      }
    } catch (error) {
      toast.error("Event creation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Available Seats</label>
            <input
              type="number"
              name="available_seats"
              value={formData.available_seats}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
