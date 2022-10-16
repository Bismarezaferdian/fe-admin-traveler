export const userColumns = [
  { field: "_id", headerName: "ID", width: 240 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.photo[0] || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              // params.row.photo[0]
            }
            alt="avatar"
          />
          {params.row.userName}
        </div>
      );
    },
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Desc",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
export const bookingColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "firstName",
    headerName: "Fist Name",
    width: 90,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 90,
  },
  {
    field: "email",
    headerName: "Email",
    width: 100,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 100,
  },
  {
    field: "bankFrom",
    headerName: "Bank From",
    width: 80,
  },
  {
    field: "bankAccountName",
    headerName: "Bank Account Name",
    width: 100,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 200,
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 200,
  },
];
