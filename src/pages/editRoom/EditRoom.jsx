import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";

const EditRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const { data } = useFetch(`${process.env.REACT_APP_HOST}/api/v1/room/${id}`);
  const [dataRooms, setDataRooms] = useState({});

  const lowerCase = (string) => {
    return string.toLowerCase();
  };
  useEffect(() => {
    setDataRooms(data);
  }, [data]);

  const successAlert = () => {
    // window.alert("Invalid Credentials");
    toast("success updated !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const handleChange = (e) =>
    setDataRooms((prev) => ({
      ...prev,
      [e.target.id]: lowerCase(e.target.value),
    }));

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        ...dataRooms,
      };
      await axios.put(`/api/v1/room/${id}`, newData);
      // history.goBack();
      navigate("/room");
      successAlert();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <ToastContainer />
          <h1>Edit Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form action="">
              {roomInputs.map((item) => (
                <div className="formInput" key={item.id}>
                  <label>{item.id}</label>
                  <input
                    type={item.type}
                    id={item.id}
                    onChange={handleChange}
                    value={dataRooms[item.id] || ""}
                  />
                </div>
              ))}

              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
