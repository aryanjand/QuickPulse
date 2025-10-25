import { WordCloud } from "@isoterik/react-word-cloud";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../css/room.css";

export default function Room() {
  const { id } = useParams();
  const location = useLocation();

  const prompt = location.state?.prompt || "No prompt provided.";
  const words = [
    { text: "React", value: 500 },
    { text: "WordCloud", value: 300 },
    { text: "D3", value: 1000 },
    { text: "JavaScript", value: 400 },
    { text: "TypeScript", value: 600 },
    { text: "Word", value: 800 },
    { text: "Cloud", value: 200 },
  ];

  return (
    <Layout title="QuickPulse | Room">
      <div className="wrapper">
        <div className="container">
          <p className="room-id">Room ID: {id}</p>
          <h1 className="prompt">{prompt}</h1>
          <div className="word-cloud-container">
            <WordCloud words={words} width={300} height={200} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
