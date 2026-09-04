import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Board from "../components/Board";
import Toolbar from "../components/Toolbar";
import Toolbox from "../components/toolbox";
import BoardProvider from "../Store/BoardProvider";
import ToolboxProvider from "../Store/ToolboxProvider";

function CanvasPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [canvas, setCanvas] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCanvas = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5001/canvas/load/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("LOADED CANVAS:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load canvas"
          );
        }

        setCanvas(data);

      } catch (error) {
        console.log("LOAD CANVAS ERROR:", error);
        setError(error.message);
      }
    };

    loadCanvas();
  }, [id, navigate]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!canvas) {
    return <p>Loading canvas...</p>;
  }

  return (
    <BoardProvider>
      <ToolboxProvider>
        <Board />
        <Toolbar />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default CanvasPage;