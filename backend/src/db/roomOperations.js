import { connectToDatabase } from './connection.js';

/**
 * Create a new room document in the rooms collection
 * @param {Object} roomData - The room data to insert
 * @returns {Promise<Object>} - The inserted room with its ID
 */
export async function createRoom(roomData) {
  try {
    const { roomsCollection } = await connectToDatabase();

    // Generate a unique room ID (you can customize this)
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare the room document
    const roomDocument = {
      ...roomData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'room' // Useful for N1QL queries
    };

    // Insert the document into the rooms collection
    await roomsCollection.insert(roomId, roomDocument);

    console.log(`Room created successfully with ID: ${roomId}`);

    return {
      id: roomId,
      ...roomDocument
    };
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
}

/**
 * Get a room by ID
 * @param {string} roomId - The room ID
 * @returns {Promise<Object>} - The room document
 */
export async function getRoomById(roomId) {
  try {
    const { roomsCollection } = await connectToDatabase();

    const result = await roomsCollection.get(roomId);

    return {
      id: roomId,
      ...result.content
    };
  } catch (error) {
    if (error.message && error.message.includes('document not found')) {
      throw new Error(`Room with ID ${roomId} not found`);
    }
    console.error('Error getting room:', error);
    throw error;
  }
}

/**
 * Update a room document
 * @param {string} roomId - The room ID
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object>} - The updated room
 */
export async function updateRoom(roomId, updateData) {
  try {
    const { roomsCollection } = await connectToDatabase();

    // Get existing document first
    const existing = await roomsCollection.get(roomId);

    // Merge with new data
    const updatedDocument = {
      ...existing.content,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    // Replace the document
    await roomsCollection.replace(roomId, updatedDocument);

    console.log(`Room updated successfully with ID: ${roomId}`);

    return {
      id: roomId,
      ...updatedDocument
    };
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
}

/**
 * Delete a room by ID
 * @param {string} roomId - The room ID
 * @returns {Promise<void>}
 */
export async function deleteRoom(roomId) {
  try {
    const { roomsCollection } = await connectToDatabase();

    await roomsCollection.remove(roomId);

    console.log(`Room deleted successfully with ID: ${roomId}`);
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
}

/**
 * Get all rooms (using N1QL query)
 * @returns {Promise<Array>} - Array of room documents
 */
export async function getAllRooms() {
  try {
    const { cluster, bucket } = await connectToDatabase();

    const query = `
      SELECT META().id as id, rooms.*
      FROM \`${bucket.name}\`._default.rooms
      WHERE type = 'room'
      ORDER BY createdAt DESC
    `;

    const result = await cluster.query(query);

    return result.rows;
  } catch (error) {
    console.error('Error getting all rooms:', error);
    throw error;
  }
}
