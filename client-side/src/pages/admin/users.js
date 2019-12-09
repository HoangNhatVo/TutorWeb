import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import MaterialTable from "material-table";
import { BreadCrums } from "../../components";

const data = [
  {
    avatar:
      "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/p60x60/76726992_990240608011361_2342947373417758720_o.jpg?_nc_cat=107&_nc_ohc=y12eVPSVq2kAQk3cwZdMAWjxsSOykxSTmSgkC3N57eFoLoym6jeSBxTLg&_nc_ht=scontent.fsgn3-1.fna&oh=74ff8fec35918b30c3d18480febaa72f&oe=5E8CD24F",
    name: "Tu",
    surname: "Le",
    birth_year: 1998,
    birth_city: 34
  },
  {
    avatar:
      "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/p60x60/76726992_990240608011361_2342947373417758720_o.jpg?_nc_cat=107&_nc_ohc=y12eVPSVq2kAQk3cwZdMAWjxsSOykxSTmSgkC3N57eFoLoym6jeSBxTLg&_nc_ht=scontent.fsgn3-1.fna&oh=74ff8fec35918b30c3d18480febaa72f&oe=5E8CD24F",
    name: "Tu",
    surname: "Le",
    birth_year: 1998,
    birth_city: 34
  },
  {
    avatar:
      "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/p60x60/76726992_990240608011361_2342947373417758720_o.jpg?_nc_cat=107&_nc_ohc=y12eVPSVq2kAQk3cwZdMAWjxsSOykxSTmSgkC3N57eFoLoym6jeSBxTLg&_nc_ht=scontent.fsgn3-1.fna&oh=74ff8fec35918b30c3d18480febaa72f&oe=5E8CD24F",
    name: "Tu",
    surname: "Le",
    birth_year: 1998,
    birth_city: 34
  }
];

class Users extends Component {
  render() {
    return (
      <LayoutAdmin>
        <BreadCrums navs={[{ text: "Người dùng" }]} />

        <MaterialTable
          title=""
          columns={[
            {
              title: "Avatar",
              field: "avatar",
              render: rowData => (
                <img
                  src={rowData.avatar}
                  alt={rowData.name}
                  style={{ width: 40, borderRadius: "50%" }}
                />
              )
            },
            { title: "Tên", field: "name" },
            { title: "Họ", field: "surname" },
            { title: "Năm sinh", field: "birth_year", type: "numeric" },
            {
              title: "Nơi sinh",
              field: "birth_city",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
            }
          ]}
          data={data}
          onRowClick={(event, selectedRow) => {}}
        />
      </LayoutAdmin>
    );
  }
}
export default Users;
