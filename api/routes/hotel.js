/* eslint-disable prettier/prettier */
// external import
const express = require("express");

// internal importe
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getOneHotel,
  getAllHotel,
  getHotelByCity,
  getHotelByType,
  getHotelRooms,
} = require("../controllers/hotelController");

const router = express.Router();

// create hotel
router.post("/hotel/create", createHotel);

// find hotel by id and update
router.put("/hotel/:id", updateHotel);

// find hotel by id and delete
router.delete("/hotels/:id", deleteHotel);

// find hotel by id
router.get("/hotel/:id", getOneHotel);

// find all hotels
router.get("/hotels", getAllHotel);

// get hotels by city names
router.get("/hotels/getHotelByCity", getHotelByCity);

// get hotels by hotel types
router.get("/hotels/getHotelByType", getHotelByType);

// find hotel rooms by hotelid and go for reservations
router.get("/hotel-rooms/:id", getHotelRooms);

// create Org
router.post("/orgs/create", createHotel);

// find Org by id and update
router.put("/orgs/:id", updateHotel);

// find Org by id and delete
router.delete("/orgs/:id", deleteHotel);

// find Org by id
router.get("/orgs/:id", getOneHotel);

// find all Orgs
router.get("/orgs", getAllHotel);

// get Orgs by city names
router.get("/orgs/getHotelByCity", getHotelByCity);

// get Orgs by hotel types
router.get("/orgs/getHotelByType", getHotelByType);

// find Org rooms by hotelid and go for reservations
router.get("/orgs-rooms/:id", getHotelRooms);

module.exports = router;
