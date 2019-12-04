import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import { TableAccount } from "../../components/admin/TableAccount";

class StudentHome extends Component {
  render() {
    return (
      <LayoutAdmin>
        <TableAccount />
      </LayoutAdmin>
    );
  }
}
export default StudentHome;
