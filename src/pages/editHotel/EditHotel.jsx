import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ToastContainer, toast } from "react-toastify";

const EditHotel = () => {
  const [files, setFiles] = useState("");
  const [dataHotel, setDataHotel] = useState({});
  const [dataRoom, setDataRoom] = useState([]);
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const { data } = useFetch(
    `${process.env.REACT_APP_HOST}/api/v1/hotel/find/${id}`
  );
  const lowerCase = (string) => {
    return string.toLowerCase();
  };

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

  useEffect(() => {
    setDataHotel(data);
  }, [data]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_HOST}/api/v1/room`
        );
        const room = res.data;
        setRooms(room);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleChange = (e) =>
    setDataHotel((prev) => ({
      ...prev,
      [e.target.id]: lowerCase(e.target.value),
    }));

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setDataRoom(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/websitemuid/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newData = {
        ...dataHotel,
        rooms: dataRoom,
        photo: list,
      };
      await axios.put(
        `${process.env.REACT_APP_HOST}/api/v1/hotel/${id}`,
        newData
      );
      // history.goBack();
      navigate("/hotel");
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
          <h1>Edit Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {hotelInputs.map((item, i) => (
                <div className="formInput" key={i}>
                  <label>{item.id}</label>
                  <input
                    type={item.type}
                    id={item.id}
                    onChange={handleChange}
                    value={dataHotel[item.id] || " "}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Featured</label>
                <select id="feature" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {rooms.map((room, i) => (
                    <option key={i} value={room._id}>
                      {room.title}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditHotel;
