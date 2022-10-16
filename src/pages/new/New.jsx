import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [files, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  // console.log(file);

  const successAdd = () => {
    // window.alert("Invalid Credentials");
    toast("success add user !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    // e.preventDefault();
    // if (!file) {
    //   validationImage();
    // }
    // const data = new FormData();
    // data?.append("file", file);
    // data?.append("upload_preset", "upload");
    // try {
    //   const uploadRes = await axios.post(
    //     "https://api.cloudinary.com/v1_1/websitemuid/image/upload",
    //     data
    //   );

    //   const { url } = uploadRes.data;

    //   const newUser = {
    //     ...info,
    //     photo: url,
    //   };
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

      const newUser = {
        ...info,
        photo: list,
      };

      await axios.post("/api/v1/auth/register", newUser);
      navigate("/user");
      successAdd();
    } catch (err) {
      toast(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <ToastContainer />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files)
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  required
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    required
                  />
                </div>
              ))}
              <div className="formInput">
                <label>is admin</label>
                <select id="isAdmin" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
