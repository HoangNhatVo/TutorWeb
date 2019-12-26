import React, { Component, Fragment } from "react";
import { LayoutUser } from "../../layouts";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUser, createContract } from "../../actions";
import moment from "moment";
import { PlaylistAdd } from "@material-ui/icons";
import { Avatar } from "../../components";

const isEmpty = rules => {
  for (let rule = 0; rule < rules.length; rule++) {
    if (!rules[rule].content || !rules[rule].actor) return true;
  }
  return false;
};

class ContractsEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      startTime: moment().format("YYYY-MM-DD"),
      rules: [{ content: "", actor: "" }],
      isCheckOn: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const { currentUser } = this.props;
    if (
      (currentUser && !currentUser.id) ||
      (currentUser && currentUser.id !== id)
    )
      this.props.getUser(id);
  }

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };

  changeRule = (field, index) => event => {
    const { rules } = this.state;
    rules[index][field] = event.target.value;

    this.setState({ rules });
  };

  submit = () => {
    const { name, startTime, rules } = this.state;
    this.setState({ isCheckOn: true });
    if (
      !name ||
      !startTime ||
      new Date(startTime) < new Date() ||
      isEmpty(rules)
    )
      return;
    else
      this.props.createContract(
        name,
        this.props.match.params.id,
        startTime,
        rules
      );
  };

  render() {
    const { name, startTime, rules, isCheckOn } = this.state;
    const { currentUser } = this.props;

    return (
      <LayoutUser>
        <Grid container spacing={2} className="mb2">
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Typography
              variant="h5"
              className="mt2 mb1"
              component="h5"
              style={{ fontWeight: 600 }}
            >
              Tạo mới hợp đồng
            </Typography>
            <Paper
              style={{
                borderRadius: 4,
                padding: "1rem"
              }}
              elevation={2}
            >
              <Typography
                style={{ fontWeight: 600, color: "gray" }}
                variant="body2"
                className="mb1"
              >
                Gia sư
              </Typography>
              <div className="df">
                <Avatar src={currentUser.avatar} alt="Ảnh đại diện" />
                <div className="ml1">
                  <Typography>{currentUser.hoten}</Typography>
                  <Typography>{currentUser.email}</Typography>
                </div>
              </div>
              <form>
                <Typography
                  style={{ fontWeight: 600, color: "gray" }}
                  variant="body2"
                  className="mb1 mt1"
                >
                  Thông tin hợp đồng
                </Typography>
                <TextField
                  fullWidth
                  label="Tên hợp đồng"
                  variant="outlined"
                  value={name}
                  required
                  error={!name && isCheckOn}
                  helperText={!name && isCheckOn && "Không được để trống"}
                  onChange={this.changeState("name")}
                />
                <TextField
                  fullWidth
                  label="Thời gian bắt đầu"
                  className="mt1"
                  variant="outlined"
                  error={
                    (new Date(startTime) < new Date() || !startTime) &&
                    isCheckOn
                  }
                  helperText={
                    (new Date(startTime) < new Date() &&
                      "Phải lớn hơn thời gian thực tế") ||
                    (!startTime && "Không được để trống")
                  }
                  type="date"
                  required
                  value={startTime}
                  onChange={this.changeState("startTime")}
                />
                <div className="df jcsb aic">
                  <Typography
                    style={{ fontWeight: 600, color: "gray" }}
                    variant="body2"
                    className="mb1 mt2"
                  >
                    Điều khoản
                  </Typography>
                  <PlaylistAdd
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      this.setState({
                        rules: rules.concat({ content: "", actor: "" })
                      })
                    }
                  />
                </div>
                <Grid container spacing={2}>
                  {rules.map((rule, index) => (
                    <Fragment key={index}>
                      <Grid item xs={9}>
                        <TextField
                          fullWidth
                          label="Nội dung"
                          variant="outlined"
                          error={!rule.content && isCheckOn}
                          helperText={
                            !rule.content && isCheckOn && "Không được để trống"
                          }
                          value={rule.content}
                          onChange={this.changeRule("content", index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          select
                          fullWidth
                          error={!rule.actor && isCheckOn}
                          helperText={
                            !rule.actor && isCheckOn && "Không được để trống"
                          }
                          label="Bên thực hiện"
                          variant="outlined"
                          value={rule.actor}
                          onChange={this.changeRule("actor", index)}
                        >
                          {[
                            { label: "Người học", value: "Người học" },
                            { label: "Người dạy", value: "Người dạy" }
                          ].map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt1"
                  style={{ padding: ".5rem 3rem" }}
                  onClick={this.submit}
                  disabled={this.props.creatingContract}
                >
                  Tạo
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </LayoutUser>
    );
  }
}

export default connect(
  ({ admin, contract }) => ({
    currentUser: admin.currentUser && admin.currentUser.userData,
    creatingContract: contract.contract.isCreating
  }),
  { getUser, createContract }
)(withRouter(ContractsEdit));
