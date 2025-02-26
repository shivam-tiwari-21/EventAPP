import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Event = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchBookedEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost/Backend/api/events.php");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  // Assumes a GET endpoint to fetch bookings for a user exists.
  const fetchBookedEvents = async () => {
    try {
      const response = await axios.get("http://localhost/Backend/api/bookings.php", {
        params: { user_id: user.id },
      });
      // Assuming response.data is an array of booking objects with an "event_id" field.
      const bookedIds = response.data.map((booking) => booking.event_id);
      setBookedEvents(bookedIds);
    } catch (error) {
      console.error("Error fetching booked events", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost/Backend/api/events.php", { data: { id } });
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost/Backend/api/events.php", selectedEvent);
      toast.success("Event updated successfully");
      setModalOpen(false);
      fetchEvents();
    } catch (error) {
      toast.error("Failed to update event");
    }
  };

  const handleBooking = async (event) => {
    if (parseInt(event.available_seats, 10) === 0) {
      toast.error("Seats are full");
      toast.error("Booking Unsuccessful");
      return;
    }
    
    try {
      await axios.post("http://localhost/Backend/api/bookings.php", {
        user_id: user.id,
        event_id: event.id,
      });
      toast.success("Booking successful");
      setBookedEvents((prev) => [...prev, event.id]);
      fetchEvents();
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p>{event.description}</p>
          <p className="text-gray-500">Date: {event.date}</p>
          <p className="text-gray-500">Venue: {event.venue}</p>
          <p className="text-gray-500">Seats: {event.available_seats}</p>
          {bookedEvents.includes(event.id) ? (
            <button
              disabled
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
            >
              Booked
            </button>
          ) : (
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleBooking(event)}
            >
              Book Now
            </button>
          )}
          {user.role === "admin" && (
            <div className="mt-2">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
                onClick={() => {
                  setSelectedEvent(event);
                  setModalOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {modalOpen && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleEdit}>
              <input
                type="text"
                value={selectedEvent.title}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, title: e.target.value })
                }
                className="border p-2 w-full mb-2"
                placeholder="Title"
              />
              <input
                type="text"
                value={selectedEvent.description}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, description: e.target.value })
                }
                className="border p-2 w-full mb-2"
                placeholder="Description"
              />
              <input
                type="date"
                value={selectedEvent.date}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, date: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                value={selectedEvent.venue}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, venue: e.target.value })
                }
                className="border p-2 w-full mb-2"
                placeholder="Venue"
              />
              <input
                type="number"
                value={selectedEvent.available_seats}
                onChange={(e) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    available_seats: e.target.value,
                  })
                }
                className="border p-2 w-full mb-2"
                placeholder="Seats Available"
              />
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  Update
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
