import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  const [user, setDataUser] = useState([]);
  const [hotel, setDataHotel] = useState([]);
  const [room, setDataRoom] = useState([]);
  const [booking, setDataBooking] = useState([]);

  // const allData = ["user", "hotel", "user", "booking"];

  useEffect(() => {
    const allData = ["user", "hotel", "room", "booking"];
    allData.map((item) => {
      // console.log(item);
      const getData = async () => {
        try {
          const res = await axios.get(`/api/v1/${item}`);
          if (item === "user") {
            setDataUser(res.data);
          } else if (item === "hotel") {
            setDataHotel(res.data);
          } else if (item === "room") {
            setDataRoom(res.data);
          } else if (item === "booking") {
            setDataBooking(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      return getData();
    });
  }, []);

  let data;
  // console.log(user);
  //temporary

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        amount: user.length,
        link: "user",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotel":
      data = {
        title: "HOTELS",
        isMoney: false,
        amount: hotel.length,
        link: "hotel",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "room":
      data = {
        title: "ROOMS",
        isMoney: true,
        amount: room.length,
        link: "room",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "booking":
      data = {
        title: "BOOKINGS",
        isMoney: true,
        link: "booking",
        amount: booking.length,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <Link to={`/${data.link}`}>
          <span className="link">see all details</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
