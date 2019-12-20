import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
// import MaterialTable from "material-table";
import { BreadCrums } from "../../components";
import { getContracts } from "../../actions";
import { connect } from "react-redux";
// import moment from "moment";
// import history from "../../utils/history";

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
        <BreadCrums navs={[{ text: "Người dùng" }]} />
        {console.log(contracts)}
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
