import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Event from "../components/Events";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        {user ? (
          <Event user={user} />
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mb-4">Login to access events</h2>
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
