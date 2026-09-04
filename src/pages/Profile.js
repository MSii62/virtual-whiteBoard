import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [error, setError] = useState("");
  const [canvasError, setCanvasError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileAndCanvases = async () => {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      if (!token) {
        navigate("/");
        return;
      }

      try {
        // ==================================
        // GET USER PROFILE
        // ==================================

        const profileResponse = await fetch(
          "http://localhost:5001/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = await profileResponse.json();

        console.log("PROFILE RESPONSE:", profileData);

        if (!profileResponse.ok) {
          throw new Error(
            profileData.message || "Failed to get profile"
          );
        }

        setUser(profileData);


        // ==================================
        // GET ALL CANVASES
        // ==================================

        const canvasResponse = await fetch(
          "http://localhost:5001/canvas",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const canvasData = await canvasResponse.json();

        console.log("CANVAS RESPONSE:", canvasData);

        if (!canvasResponse.ok) {
          throw new Error(
            canvasData.message || "Failed to get canvases"
          );
        }

        setCanvases(canvasData);

      } catch (error) {
        console.log("PROFILE ERROR:", error);

        setError(error.message);

        // Don't remove token yet.
        // We want to see the actual error.
      }
    };

    getProfileAndCanvases();
  }, [navigate]);


  // ==================================
  // CREATE CANVAS
  // ==================================

  const createCanvas = async () => {
    const name = prompt("Enter canvas name:");

    if (name === null) {
      return;
    }

    if (name.trim() === "") {
      alert("Canvas name cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/canvas",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: name,
          }),
        }
      );

     const text = await response.text();

console.log("STATUS:", response.status);
console.log("CREATE CANVAS RESPONSE:", text);

if (!response.ok) {
  throw new Error(text || "Failed to create canvas");
}

      // Add newly created canvas
      // to the existing list
      setCanvases((prevCanvases) => [
        ...prevCanvases,
        text,
      ]);

    } catch (error) {
      console.log("CREATE CANVAS ERROR:", error);
      alert(error.message);
    }
  };


  // ==================================
  // LOGOUT
  // ==================================

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  // ==================================
  // LOADING
  // ==================================

  if (!user && !error) {
    return <p>Loading...</p>;
  }


  // ==================================
  // ERROR
  // ==================================

  if (error && !user) {
    return (
      <div className="profile-page">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button
          className="logout-button"
          onClick={logout}
        >
          Back to Login
        </button>
      </div>
    );
  }


  // ==================================
  // PROFILE PAGE
  // ==================================

  return (
    <div className="profile-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="profile-header">

        <div>
          <h1>
            Hello, {user.name}
          </h1>

          <p>
            Your canvases
          </p>
        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>

      </div>


      {/* =========================
          CANVAS SECTION
      ========================= */}

      <div className="canvas-section">

        <div className="canvas-section-header">

          <h2>
            My Canvases
          </h2>

          <button
            className="new-canvas-button"
            onClick={createCanvas}
          >
            + New Canvas
          </button>

        </div>


        {/* Canvas API error */}

        {canvasError && (
          <p className="error">
            {canvasError}
          </p>
        )}


        {/* =========================
            NO CANVASES
        ========================= */}

        {canvases.length === 0 ? (

          <div className="empty-state">

            <h3>
              No canvases yet
            </h3>

            <p>
              Create your first canvas to get started.
            </p>

          </div>

        ) : (

          /* =========================
             CANVAS GRID
          ========================= */

          <div className="canvas-grid">

            {canvases.map((canvas) => (

              <div
                className="canvas-card"
                key={canvas._id}
              >

                <div className="canvas-preview">
                  <span>✦</span>
                </div>

                <div className="canvas-info">

                  <h3>
                    {canvas.name}
                  </h3>

                  <p>
                    Created{" "}
                    {canvas.createdAt
                      ? new Date(
                          canvas.createdAt
                        ).toLocaleDateString()
                      : ""}
                  </p>

                </div>

                <button
                  className="open-canvas-button"
                  onClick={() => navigate(`/load/${canvas._id}`)}
                >
                  Open
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Profile;