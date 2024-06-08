/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
// internal import
const RoomModel = require("../models/roomModel");
const HotelModel = require("../models/hotelModel");

/**
 * The function creates a new room and associates it with a hotel by updating the hotel's rooms array.
 */
const createRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  const newRoom = new RoomModel(req.body);
  try {
    const savedRoom = await newRoom.save();

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(500).json({
        error: "Can not update hotel!",
      });
    }

    res.status(200).json({
      message: savedRoom,
    });
  } catch (error) {
    res.status(500).json({
      error: "room not created!",
    });
  }
};

/**
 * The function `updateRoom` updates a room in a database using the provided request parameters and
 * body, and returns the updated room as a response.

 */
const updateRoom = async (req, res) => {
  try {
    const updroom = await RoomModel.findByIdAndUpdate(
      req.params.id,

      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      message: updroom,
    });
  } catch (error) {
    res.status(500).json({
      error: "room not updated!",
    });
  }
};

/**
 * The function updates the availability of a room by adding unavailable dates to the room's list of
 * unavailable dates.
 */
const updateRoomAvailability = async (req, res) => {
  console.log(req.params);
  // console.log(req.body.dates,req.params.id)

  // await RoomModel.findOneAndUpdate(
  //   try {

  //   { "roomNumbers._id": req.params.id },
  //   {
  //     $push: {
  //       "roomNumbers.$.unavailableDates": req.body.dates,
  //     },
  //   }
  // );

  // await RoomModel.updateOne(
  //   { 'roomNumbers._id': req.params.id },
  //   {
  //     $push: {
  //       'roomNumbers.$.unavailableDates': req.body.dates,
  //     },
  //   },
  // );

  //     res.status(200).json({
  //       message: "Room availability updated",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       error: "Room availability update failed!",
  //     });
  const roomId = req.params.id; // Assuming the id is passed as a URL parameter
  console.log(roomId);

  try {
    // Find the room by its ID
    const org = await HotelModel.findById(roomId);
    const room = org.rooms;
    // const room = await RoomModel.findById(roomId);

    // if (!room) {
    //   return res.status(404).json({ error: "Room not found" });
    // }
    console.log("room", room);
    const roomNumber = req.body.roomNumbers;
    console.log(roomNumber);
    const datesToAdd = req.body.dates;
    console.log(datesToAdd);

    // Find the subdocument with the specified room number
    // const subdocument = await room.roomNumbers.map((roomNum) =>
    //   roomNumber.includes(roomNum.roomNumber)
    // );
    let subdocument;
    for (let i = 0; i < room.roomNumbers.length; i++) {
      console.log(room.roomNumbers[i]);
      if (room.roomNumbers[i].number === parseInt(roomNumber)) {
        subdocument = room.roomNumbers[i];
        // console.log("sobd", subdocument);
        break;
      }
    }

    console.log(subdocument);

    if (!subdocument) {
      return res.status(404).json({ error: "Room number not found" });
    }

    // Add the dates to the unavailableDates array
    subdocument.unavailableDates.push(...datesToAdd);

    // Save the updated room
    await room.save();

    return res.status(200).json({ message: "Dates added successfully", room });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Room availability update failed!" });
  }
};

// find a room an delete
/**
 * The `deleteRoom` function deletes a room from a hotel and updates the hotel's rooms list
 * accordingly.
 */
const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelid;
  try {
    await RoomModel.findByIdAndDelete(req.params.id);

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      res.status(500).json({
        error: "Can not delete roomid on hotel!",
      });
    }

    res.status(200).json({
      message: "room deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "room not deleted!",
    });
  }
};

/**
 * The function `getOneRoom` retrieves a room from the database by its ID and sends it as a response,
 * or returns an error message if the room is not found.

 */
const getOneRoom = async (req, res) => {
  try {
    const room = await RoomModel.findById(req.params.id);

    res.status(200).json({
      message: room,
    });
  } catch (error) {
    res.status(500).json({
      error: "room not found!!",
    });
  }
};

/**
 * The function getAllRoom retrieves all rooms from the RoomModel and sends them as a response.
 e response, such as
 */
const getAllRoom = async (req, res) => {
  try {
    const rooms = await RoomModel.find();

    res.status(200).json({
      message: rooms,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getAllRoom,
  updateRoomAvailability,
};
