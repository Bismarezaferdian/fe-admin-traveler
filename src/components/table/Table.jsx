import "./table.scss";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";

const Table = ({ columns }) => {
  const [list, setList] = useState([]);
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_HOST}/api/v1/booking`
  );

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="datatable">
      <div className="datatableTitle"></div>
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
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Table;
