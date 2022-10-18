import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@mui/material";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  // console.log(path);
  const [list, setList] = useState([]);
  const [id, setId] = useState("");
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_HOST}/api/v1/${path}`
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `admin | ${path}`;
  });

  useEffect(() => {
    setList(data);
  }, [data]);

  const deleteAlert = () => {
    // window.alert("Invalid Credentials");
    toast("success delete !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_HOST}/api/v1/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      deleteAlert();
    } catch (err) {}
  };

  const handleClick = (params) => {
    setId(params.row._id);
    if (id.length > 0) {
      navigate(`/edit/${path}`, { state: { id } });
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
            {location.pathname !== "/booking" && (
              <button
                className="viewButton"
                onClick={() => {
                  handleClick(params);
                }}
              >
                Update
              </button>
            )}
            {/* </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <ToastContainer />
      <div className="datatableTitle">
        {/* {location.pathname !== "/booking" && (
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        )} */}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      ) : (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
          getRowId={(row) => row._id}
        />
      )}

      <div></div>
    </div>
  );
};

export default Datatable;
