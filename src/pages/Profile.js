import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:5001/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to get profile");
        }

        setUser(data);
      } catch (error) {
        setError(error.message);

        // Token might be expired/invalid
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    getProfile();
  }, [navigate]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        {console.log(user)}
     
      <h1>Hello,{user.name}</h1>
    </div>
  );
}

export default Profile;