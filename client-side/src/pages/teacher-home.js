import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography, Grid } from "@material-ui/core";
import "./style/teacher-home.css";
import { getCurrentContractList } from "../actions";
import { connect } from "react-redux";
import { ContractItem } from "../components";

class TeacherHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { myContracts } = this.props;
    if (myContracts && !myContracts.isOk) this.props.getCurrentContractList();
  }

  render() {
    const { myContracts } = this.props;

    if (!myContracts) return <div>Đang tải...</div>;
    const pendingList = myContracts.contracts.filter(
      contract => contract.StatusContract === "Chưa duyệt"
    );
    const doingList = myContracts.contracts.filter(
      contract => contract.StatusContract === "Đã duyệt"
    );
    const endedList = myContracts.contracts.filter(
      contract => contract.StatusContract === "Kết thúc"
    );

    return (
      <LayoutUser>
        {pendingList.length !== 0 && (
          <>
            <Typography
              variant="h5"
              className="mt2 mb1"
              component="h5"
              style={{ fontWeight: 600 }}
            >
              Hợp đồng mới
            </Typography>

            <Grid container spacing={2}>
              {pendingList.map(contract => (
                <ContractItem
                  pending
                  contract={contract}
                  key={contract.NameContract}
                />
              ))}
            </Grid>
          </>
        )}

        {doingList.length !== 0 && (
          <>
            <Typography
              variant="h5"
              className="mt2 mb1"
              component="h5"
              style={{ fontWeight: 600 }}
            >
              Hợp đồng đang diễn ra
            </Typography>
            <Grid container spacing={2}>
              {doingList.map(contract => (
                <ContractItem
                  doing
                  contract={contract}
                  key={contract.NameContract}
                />
              ))}
            </Grid>
          </>
        )}

        {endedList.length !== 0 && (
          <>
            <Typography
              variant="h5"
              className="mt2 mb1"
              component="h5"
              style={{ fontWeight: 600 }}
            >
              Hợp đồng đã thực hiện
            </Typography>
            <Grid container spacing={2} className="mb2">
              {endedList.map(contract => (
                <ContractItem
                  ended
                  contract={contract}
                  key={contract.NameContract}
                />
              ))}
            </Grid>
          </>
        )}
      </LayoutUser>
    );
  }
}

export default connect(
  ({ teacher }) => ({
    myContracts: teacher.myContracts
  }),
  {
    getCurrentContractList
  }
)(TeacherHome);
