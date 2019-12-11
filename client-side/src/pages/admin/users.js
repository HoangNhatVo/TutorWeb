import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import MaterialTable from "material-table";
import { BreadCrums, Avatar } from "../../components";
import { getAllUsers } from "../../actions";
import { connect } from "react-redux";
import moment from "moment";

class Users extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users, isLoadingUsers } = this.props;

    return (
      <LayoutAdmin>
        <BreadCrums navs={[{ text: "Người dùng" }]} />

        {isLoadingUsers ? (
          <div>Đang tải...</div>
        ) : (
          <MaterialTable
            title=""
            columns={[
              {
                title: "Avatar",
                field: "avatar",
                render: rowData => (
                  <Avatar
                    src={rowData.avatar}
                    name={rowData.hoten}
                    alt={rowData.hoten}
                  />
                )
              },
              { title: "Tên", field: "hoten" },
              {
                title: "Năm sinh",
                field: "birthday",
                type: "numeric",
                render: rowData => moment(rowData.birthday).format("YYYY")
              },
              { title: "Giới tính", field: "gioitinh" },
              {
                title: "Vai trò",
                field: "vaitro",
                lookup: { 1: "Học sinh", 2: "Gia sư", 3: "Admin" }
              }
            ]}
            data={users}
            onRowClick={(event, selectedRow) => {}}
          />
        )}
      </LayoutAdmin>
    );
  }
}

export default connect(
  ({ admin }) => ({
    isLoadingUsers: admin.users.isOk,
    users: admin.users.users
  }),
  { getAllUsers }
)(Users);
