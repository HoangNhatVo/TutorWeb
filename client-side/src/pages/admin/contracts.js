import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import MaterialTable from "material-table";
import { BreadCrums } from "../../components";
import { getContracts } from "../../actions";
import { connect } from "react-redux";
import history from "../../utils/history";
import moment from "moment";
import { Typography } from "@material-ui/core";

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
              {
                title: "Thời gian bắt đầu",
                field: "TimeAsigned",
                render: rowData =>
                  moment(rowData.TimeAsigned).format("DD/MM/YYYY")
              },
              {
                title: "Trạng thái",
                field: "StatusContract",
                render: rowData => {
                  let color = "orange";
                  if (rowData.StatusContract === "Đã duyệt") color = "green";
                  else if (rowData.StatusContract === "Đã từ chối")
                    color = "red";
                  else if (rowData.StatusContract === "Kết thúc")
                    color = "gray";

                  return (
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 600, color }}
                    >
                      {rowData.StatusContract}
                    </Typography>
                  );
                }
              },
              {
                title: "Người dạy",
                field: "NameTeacher"
              },
              {
                title: "Người học",
                field: "NameStudent"
              }
            ]}
            data={contracts.contracts}
            onRowClick={(event, selectedRow) =>
              history.push(`/contract/${selectedRow.IDContract}`)
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
