import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/home.css";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleCreateRoom = () => {
    const roomId = crypto.randomUUID();
    navigate(`/room/${roomId}`, { state: { prompt } });
  };

  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <h1>QuickPulse</h1>
          <p>Connect people through ideas — one word at a time.</p>

          <div className="prompt-input-container">
            <input
              type="text"
              className="prompt-input"
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <button onClick={handleCreateRoom} className="create-room-btn">
            Create Room
          </button>
        </div>
      </div>
    </Layout>
  );
}
