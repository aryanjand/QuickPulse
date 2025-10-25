import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/db/connection.js";
import roomsRouter from "./src/routes/rooms.js";
import fetch from "node-fetch";

const app = express();
const PORT = 8000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
let db;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API Routes
app.use("/api/rooms", roomsRouter);

// Test function to create a sample room
async function testCreateRoom() {
  try {
    const testRoomData = {
      type: "room",
      roomId: "bcd789",
      question: "test question",
      responses: ["reply2", "reply3", "reply4", "reply5"],
      createdAt: new Date().toISOString()
    };

    console.log("\nTesting room creation endpoint...");
    console.log("Test data:", JSON.stringify(testRoomData, null, 2));

    const response = await fetch(`http://localhost:${PORT}/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRoomData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Room created successfully!");
      console.log("Response:", JSON.stringify(result, null, 2));
    } else {
      console.log("Failed to create room");
      console.log("Error:", JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error("Error testing room creation:", error.message);
  }
}

// Initialize database connection and start server
async function startServer() {
  try {
    // Connect to database
    db = await connectToDatabase();
    console.log("Successfully connected to Couchbase database");

    app.listen(PORT, () => {
      console.log(`Backend server running at http://localhost:${PORT}`);

      // Test the room creation endpoint after server starts
      setTimeout(() => {
        testCreateRoom();
      }, 1000); // Wait 1 second for server to be fully ready
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

startServer();
