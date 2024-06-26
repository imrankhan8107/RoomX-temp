/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Context } from "../../ContextApi/Context";
import style from "./reserve.module.scss";

function Reserve({ setOpen, hotelId, rooms }) {
  const [selectedRoom, setSelectedRoom] = useState([]);
  const { dates } = useContext(Context);

  const handleSlect = (e) => {
    const { checked } = e.target;
    const { value } = e.target;
    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom.filter((item) => item !== value)
    );
    console.log(value);
  };

  const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDateRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => {
      allDates.includes(new Date(date).getTime());
    });

    return !isFound;
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    console.log(hotelId);
    console.log(allDates);
    console.log(selectedRoom);
    // await axios
    //   .put(`http://localhost:4000/api/room/availability/${hotelId}`, {
    //     roomNumbers: selectedRoom,
    //     dates: allDates,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const response = await fetch(
      `http://localhost:4000/api/room/availability/${hotelId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          roomNumbers: selectedRoom,
          dates: allDates,
        }),
      }
    );
    // Awaiting response.json()
    const resData = await response.json();

    // Return response data
    setOpen(false);
    console.log(resData);
    return resData;
  };

  return (
    <div className={style.reserve_component}>
      <div className={style.reserve_modal}>
        <span>Select your rooms:</span>
        <FaTimes onClick={handleBlur} className={style.reserve_modal_close} />

        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div className={style.room_item} key={room._id}>
              <div className={style.room_item_info}>
                <p className={style.room_item_title}>{room.title}</p>
                <p>Max people: {room.maxPeople}</p>
                <span>${room.price}</span>
              </div>

              <div className={style.room_item_room}>
                {room.roomNumbers?.map((roomNumber) => (
                  <div className={style.room} key={roomNumber._id}>
                    <label htmlFor="">{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSlect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No room is available for this hotel.</p>
        )}

        <button type="button" className={style.button} onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
}

export default Reserve;
