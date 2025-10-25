import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = crypto.randomUUID();
    navigate(`/room/${roomId}`);
  };

  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <h1>QuickPulse</h1>
          <p>Connect people through ideas — one word at a time.</p>
          <button onClick={handleCreateRoom} className="create-room-btn">
            Create a Room
          </button>
        </div>
      </div>
    </Layout>
  );
}
