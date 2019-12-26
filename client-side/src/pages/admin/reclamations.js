import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import MaterialTable from "material-table";
import { BreadCrums, Avatar } from "../../components";
import { getAllReclamations } from "../../actions";
import { connect } from "react-redux";
import moment from "moment";
import history from "../../utils/history";

class Reclamations extends Component {
  componentDidMount() {
    const { allReclamations } = this.props;
    if (!allReclamations.isGetAllReclamationsOk)
      this.props.getAllReclamations();
  }

  render() {
    const { allReclamations } = this.props;

    return (
      <LayoutAdmin>
        <BreadCrums navs={[{ text: "Khiếu nại" }]} />

        {allReclamations.isGetAllReclamations ? (
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
                    src={rowData.AvatarNguoiKN}
                    name={rowData.TenNguoiKN}
                    alt={rowData.TenNguoiKN}
                  />
                )
              },
              { title: "Tên", field: "TenNguoiKN" },
              {
                title: "Nội dung",
                field: "NoiDungKN"
              },
              {
                title: "Thời gian",
                field: "ThoiGianKN",
                render: rowData => moment(rowData.ThoiGianKN).format("YYYY")
              }
            ]}
            data={allReclamations.allReclamations}
            onRowClick={(event, selectedRow) =>
              history.push(`/contract/${selectedRow.IDHD}`)
            }
          />
        )}
      </LayoutAdmin>
    );
  }
}

export default connect(
  ({ admin }) => ({
    allReclamations: admin.allReclamations
  }),
  { getAllReclamations }
)(Reclamations);
