import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import { DatePicker } from "@material-ui/pickers";
import { BreadCrums, Avatar } from "../../components";
import {
  getTopIncomeByDay,
  getTopIncomeByWeek,
  getTopIncomeByMonth,
  getTopIncomeByQuarter,
  getTopAll
} from "../../actions";
import { connect } from "react-redux";
import moment from "moment";
import {
  TextField,
  Tabs,
  Tab,
  Grid,
  Paper,
  Typography,
  Button,
  MenuItem
} from "@material-ui/core";

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      isCheckWeekOn: false,
      selectDay: new Date(),
      selectMonthYear: new Date(),
      selectYear: new Date(),
      selectQuarter: 1,
      selectWeek: ""
    };
  }

  componentDidMount() {
    this.props.getTopAll();
  }

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ currentTab: newValue });
  };

  render() {
    const { income } = this.props;
    const {
      currentTab,
      selectDay,
      selectMonthYear,
      selectYear,
      selectQuarter,
      isCheckWeekOn,
      selectWeek
    } = this.state;

    return (
      <LayoutAdmin>
        <BreadCrums navs={[{ text: "Thu nhập" }]} />

        <Tabs
          className="mb1"
          value={currentTab}
          onChange={this.handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Tổng" />
          <Tab label="Ngày" />
          <Tab label="Tuần" />
          <Tab label="Tháng" />
          <Tab label="Quý" />
        </Tabs>

        {currentTab === 0 && (
          <Grid container spacing={2}>
            {income &&
              income.topAll &&
              income.topAll.map((i, index) => (
                <Grid item key={index} xs={6}>
                  <Paper className="p1 df aic jcsb">
                    <Avatar className="mr1" src={i.avatar} />
                    <Typography className="f1">{i.hoten}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {i.Income}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}

        {currentTab === 1 && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Chọn ngày"
                  className="mt1 mb1"
                  variant="outlined"
                  type="date"
                  required
                  value={moment(selectDay).format("YYYY-MM-DD")}
                  onChange={this.changeState("selectDay")}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  style={{ padding: 16 }}
                  className="mt1 mb1"
                  variant="contained"
                  color="primary"
                  disabled={income && income.isGetTopIncomeByDay}
                  onClick={() => {
                    this.props.getTopIncomeByDay(selectDay);
                  }}
                >
                  Truy vấn
                </Button>
              </Grid>
              {income.topIncomeByDay && income.topIncomeByDay.length === 0 && (
                <Grid item xs={6}>
                  <Typography className="f1">Chưa có dữ liệu</Typography>
                </Grid>
              )}
              {income &&
                income.topIncomeByDay &&
                income.topIncomeByDay.map((i, index) => (
                  <Grid item key={index} xs={6}>
                    <Paper className="p1 df aic jcsb">
                      <Avatar className="mr1" src={i.avatar} />
                      <Typography className="f1">{i.hoten}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {i.Income}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </>
        )}

        {currentTab === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <DatePicker
                className="mt1 mb1"
                inputVariant="outlined"
                fullWidth
                views={["year"]}
                autoOk
                label="Năm"
                value={selectYear}
                onChange={value => this.setState({ selectYear: value })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Chọn tuần"
                className="mt1 mb1"
                variant="outlined"
                required
                type="number"
                helperText={
                  (isCheckWeekOn && !selectWeek && "Vui lòng chọn tuần.") ||
                  (isCheckWeekOn &&
                    (selectWeek > 52 || selectWeek < 1) &&
                    "Tuần trong khoản 1-52")
                }
                error={
                  (isCheckWeekOn && (selectWeek > 52 || selectWeek < 1)) ||
                  (isCheckWeekOn && !selectWeek)
                }
                value={selectWeek}
                onChange={this.changeState("selectWeek")}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                style={{ padding: 16 }}
                className="mt1 mb1"
                variant="contained"
                color="primary"
                disabled={income && income.isGetTopIncomeByWeek}
                onClick={() => {
                  this.setState({ isCheckWeekOn: true });
                  if (selectWeek > 52 || selectWeek < 1 || !selectWeek) return;
                  this.props.getTopIncomeByWeek(
                    selectWeek,
                    moment(selectYear).year()
                  );
                }}
              >
                Truy vấn
              </Button>
            </Grid>
            {income.topIncomeByWeek && income.topIncomeByWeek.length === 0 && (
              <Grid item xs={6}>
                <Typography className="f1">Chưa có dữ liệu</Typography>
              </Grid>
            )}
            {income &&
              income.topIncomeByWeek &&
              income.topIncomeByWeek.map((i, index) => (
                <Grid item key={index} xs={6}>
                  <Paper className="p1 df aic jcsb">
                    <Avatar className="mr1" src={i.avatar} />
                    <Typography className="f1">{i.hoten}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {i.Income}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}

        {currentTab === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker
                className="mt1 mb1"
                inputVariant="outlined"
                fullWidth
                views={["year", "month"]}
                label="Thời gian"
                value={selectMonthYear}
                onChange={value => this.setState({ selectMonthYear: value })}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                style={{ padding: 16 }}
                className="mt1 mb1"
                variant="contained"
                color="primary"
                disabled={income && income.isGetTopIncomeByMonth}
                onClick={() => {
                  this.props.getTopIncomeByMonth(
                    moment(selectMonthYear).month(),
                    moment(selectMonthYear).year()
                  );
                }}
              >
                Truy vấn
              </Button>
            </Grid>
            {income.topIncomeByMonth && income.topIncomeByMonth.length === 0 && (
              <Grid item xs={6}>
                <Typography className="f1">Chưa có dữ liệu</Typography>
              </Grid>
            )}
            {income &&
              income.topIncomeByMonth &&
              income.topIncomeByMonth.map((i, index) => (
                <Grid item key={index} xs={6}>
                  <Paper className="p1 df aic jcsb">
                    <Avatar className="mr1" src={i.avatar} />
                    <Typography className="f1">{i.hoten}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {i.Income}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}

        {currentTab === 4 && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <DatePicker
                className="mt1 mb1"
                inputVariant="outlined"
                fullWidth
                views={["year"]}
                label="Năm"
                value={selectYear}
                onChange={value => this.setState({ selectYear: value })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Quý"
                variant="outlined"
                value={selectQuarter}
                fullWidth
                select
                onChange={this.changeState("selectQuarter")}
                className="mt1"
              >
                {[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" }
                ].map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                style={{ padding: 16 }}
                className="mt1 mb1"
                variant="contained"
                color="primary"
                disabled={income && income.isGetTopIncomeByQuarter}
                onClick={() => {
                  this.props.getTopIncomeByQuarter(
                    selectQuarter,
                    moment(selectYear).year()
                  );
                }}
              >
                Truy vấn
              </Button>
            </Grid>
            {income.topIncomeByQuarter &&
              income.topIncomeByQuarter.length === 0 && (
                <Grid item xs={6}>
                  <Typography className="f1">Chưa có dữ liệu</Typography>
                </Grid>
              )}
            {income &&
              income.topIncomeByQuarter &&
              income.topIncomeByQuarter.map((i, index) => (
                <Grid item key={index} xs={6}>
                  <Paper className="p1 df aic jcsb">
                    <Avatar className="mr1" src={i.avatar} />
                    <Typography className="f1">{i.hoten}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {i.Income}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
      </LayoutAdmin>
    );
  }
}

export default connect(({ admin }) => ({ income: admin.income }), {
  getTopAll,
  getTopIncomeByDay,
  getTopIncomeByWeek,
  getTopIncomeByMonth,
  getTopIncomeByQuarter
})(Income);
