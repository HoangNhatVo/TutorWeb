import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import MaterialTable from "material-table";
import { BreadCrums, Avatar } from "../../components";
import { getContracts } from "../../actions";
import { connect } from "react-redux";
import history from "../../utils/history";

class Contracts extends Component {
  componentDidMount() {
    const { contracts } = this.props;
    if (contracts && !contracts.isOk) this.props.getContracts();
  }

  render() {
    const { contracts } = this.props;

    if (!contracts) return <div />;

    return (
      <LayoutAdmin>
        <BreadCrums navs={[{ text: "Hợp đồng" }]} />
        {contracts.isGetting ? (
          <div>Đang tải...</div>
        ) : (
          <MaterialTable
            title=""
            columns={[
              {
                title: "Tên hợp đồng",
                field: "NameContract"
              },
              { title: "Thời gian bắt đầu", field: "TimeAsigned" },
              {
                title: "Trạng thái",
                field: "StatusContract"
              },
              { title: "Giới tính", field: "gioitinh" },
              {
                title: "Avatar giáo viên",
                field: "AvatarTeacher",
                render: rowData => (
                  <Avatar
                    src={rowData.AvatarTeacher}
                    name={rowData.NameTeacher}
                    alt={rowData.NameTeacher}
                  />
                )
              },
              {
                title: "Avatar học sinh",
                field: "avatar",
                render: rowData => (
                  <Avatar
                    src={rowData.AvatarStudent}
                    name={rowData.NameStudent}
                    alt={rowData.NameStudent}
                  />
                )
              }
            ]}
            data={contracts.contracts}
            onRowClick={(event, selectedRow) =>
              history.push(`/profile/${selectedRow.id}`)
            }
          />
        )}
      </LayoutAdmin>
    );
  }
}

export default connect(
  ({ admin }) => ({
    contracts: admin.contracts
  }),
  { getContracts }
)(Contracts);
