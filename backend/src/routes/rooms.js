import express from 'express';
import {
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAllRooms
} from '../db/roomOperations.js';

const router = express.Router();

/**
 * POST /api/rooms
 * Create a new room
 */
router.post('/', async (req, res) => {
  try {
    const roomData = req.body;

    // Validate required fields
    if (!roomData.roomId) {
      return res.status(400).json({
        success: false,
        error: 'Room ID is required'
      });
    }

    if (!roomData.question) {
      return res.status(400).json({
        success: false,
        error: 'Question is required'
      });
    }

    const newRoom = await createRoom(roomData);

    res.status(201).json({
      success: true,
      data: newRoom
    });
  } catch (error) {
    console.error('Error in POST /api/rooms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create room',
      message: error.message
    });
  }
});

/**
 * GET /api/rooms
 * Get all rooms
 */
router.get('/', async (req, res) => {
  try {
    const rooms = await getAllRooms();

    res.status(200).json({
      success: true,
      data: rooms,
      count: rooms.length
    });
  } catch (error) {
    console.error('Error in GET /api/rooms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch rooms',
      message: error.message
    });
  }
});

/**
 * GET /api/rooms/:id
 * Get a specific room by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const room = await getRoomById(id);

    res.status(200).json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error in GET /api/rooms/:id:', error);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: 'Failed to fetch room',
      message: error.message
    });
  }
});

/**
 * PUT /api/rooms/:id
 * Update a room
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRoom = await updateRoom(id, updateData);

    res.status(200).json({
      success: true,
      data: updatedRoom
    });
  } catch (error) {
    console.error('Error in PUT /api/rooms/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update room',
      message: error.message
    });
  }
});

/**
 * DELETE /api/rooms/:id
 * Delete a room
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await deleteRoom(id);

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/rooms/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete room',
      message: error.message
    });
  }
});

export default router;
