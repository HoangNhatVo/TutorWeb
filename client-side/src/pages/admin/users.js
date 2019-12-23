import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import MaterialTable from "material-table";
import { BreadCrums, Avatar } from "../../components";
import {
  getAllUsers,
  changeStatusUser,
  changeStatusUserOk
} from "../../actions";
import { connect } from "react-redux";
import moment from "moment";
import history from "../../utils/history";
import { Switch } from "@material-ui/core";
import api from "../../utils/axios";

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
            options={{ actionsColumnIndex: -1 }}
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
              },
              {
                title: "Trạng thái",
                field: "tinhtrang",
                render: rowData => (
                  <Switch
                    checked={rowData.tinhtrang === "active"}
                    onChange={async () => {
                      const newstatus =
                        rowData.tinhtrang === "active" ? "block" : "active";
                      const id = rowData.id;

                      this.props.changeStatusUser(id);
                      const res = await api.post("/changestatusaccount", {
                        id,
                        newstatus
                      });

                      res.data === "Thành công" &&
                        this.props.changeStatusUserOk(id, newstatus);
                    }}
                    disabled={rowData.changingStatus}
                    color="primary"
                  />
                )
              }
            ]}
            data={users}
            actions={[
              {
                icon: "visibility",
                tooltip: "Xem chi tiết",
                onClick: (event, selectedRow) =>
                  history.push(`/profile/${selectedRow.id}`)
              }
            ]}
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
  { getAllUsers, changeStatusUser, changeStatusUserOk }
)(Users);
