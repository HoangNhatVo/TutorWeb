import React, { Component } from "react";
import MaterialTable from "material-table";

export class TableAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Tên", field: "name" },
        {
          title: "Họ",
          field: "surname",
          initialEditValue: "Lê"
        },
        { title: "Năm sinh", field: "birthYear", type: "numeric" },
        {
          title: "Nơi sinh",
          field: "birthCity",
          lookup: { 34: "Hồ Chí Minh", 63: "Hà Nội" }
        }
      ],
      data: [
        { name: "Lan", surname: "Lê", birthYear: 1987, birthCity: 63 },
        {
          name: "Anh",
          surname: "Nguyễn",
          birthYear: 2017,
          birthCity: 34
        }
      ]
    };
  }

  render() {
    return (
      <MaterialTable
        title="Danh sách tài khoản quản trị"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            });
          },
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            })
        }}
      />
    );
  }
}
